import { defineStore } from 'pinia'
import { useUserAuthStore } from "./auth"

export const useCartStore = defineStore('cartStore', () => {

    const {public: {baseURL,free_shipment_wight_limiter}} = useRuntimeConfig()
    const userAuthStore = useUserAuthStore() 
    const gtm = useGtm();
    // 
    // * data

    const cartItems = useCookie(
        'cartItems',
        {
        //   default: () => ([]),
        //   watch: false,
          sameSite: "lax",
        //   todo: make sure works with .env
          secure: true,
        }
    ) as any
    

    // const cartItems = ref([]) as any
    const successPayment = ref({})
    const fetchedCartItems = ref([]) as any;
    const cartData = ref({
        total_raw_price: 0,
        total_profit_price: 0,
        total: 0,
        cartIncludesDynamicPrice: false,
    }) as any;

    const appliedPromotion = ref(null) as any;

    const promotionSlug = ref ('')

    function setCartData (){

        const result = {
            total_raw_price: 0,
            total_profit_price: 0,
            total_price: 0,
            cartIncludesDynamicPrice: false,
            total_weight: 0
        } as any
        
        if (fetchedCartItems.value && fetchedCartItems.value.length) {
            for (let i = 0; i < fetchedCartItems.value.length; i++) {
                const cartItem = fetchedCartItems.value[i];
        
                if (cartItem && !cartItem.price_is_dynamic) {
                result.total_raw_price += Number(cartItem.price) * cartItem.qty;
                result.total_price += Number(cartItem.discounted_price) * cartItem.qty;
                result.total_weight += Number(cartItem.weight) * cartItem.qty;
                if (Number(cartItem.weight) <= Number(free_shipment_wight_limiter)) {
                    result.shipment_is_not_free = true;
                }
                result.total_profit_price +=
                    Number(cartItem.price - cartItem.discounted_price) * cartItem.qty;
                } else {
                result.cartIncludesDynamicPrice = true;
                }
            }
        }
        
        
        if (appliedPromotion.value && cartData.value.total_price) {
            let total_promoted_price = Number(cartData.value.total_price);
            
            const { discount_percentage, discount_price } = appliedPromotion.value;
            
            if (discount_percentage && discount_percentage > 0) {
                total_promoted_price -= Math.floor((total_promoted_price * Number(discount_percentage)) / 100);
            }
            
            if (discount_price && discount_price > 0) {
                total_promoted_price -= Number(discount_price);
            }
            
            result.total_promoted_price = total_promoted_price
            
        }

        cartData.value = result
        
    
    }

    function setCartItems (CartItems:any){

        const finalItems = [] as any

        for (let i = 0; i < cartItems.value.length; i++) {
            const {id, qty} = cartItems.value[i];
            const item = CartItems.filter((item:any) => {
                return item.model_id === id
            })[0]
            item.qty = qty
            finalItems.push(item)
        }

        fetchedCartItems.value = finalItems
        setCartData()
    }

    async function handleProductView(ga:any){
        if (gtm) {
            gtm.trackEvent({
                event: 'view_item',
                ecommerce: {
                    currency: 'USD',
                    items: [ga]
                },
            });
        }
    }
    // * promotions

    async function applyPromotion({locale, promotionSlug:PromotionSlug}:any) {
        try {
          let URL = `/${locale}/public/promotion/${PromotionSlug.toLowerCase()}`;
      
          const res: any = await $fetch(URL, {
            method: "get",
            baseURL,
          });
      
          if (
            Number(res.max_use) <= Number(res.times_used) ||
            Number(res.max_applicable_price) < Number(cartData.value.total_price) ||
            Number(res.min_applicable_price) > Number(cartData.value.total_price)
          ) {
            throw "error";
          }
          appliedPromotion.value = res;
          promotionSlug.value = PromotionSlug
          setCartData()
        } catch (e: any) {
          throw e
        }
    }

    async function fetchShipmentInfo ({locale, provinceId, cityId} :any){
        try {
            console.log(cartData.value)
            let URL = `/${locale}/user/checkout/shipment-info?provinceId=${provinceId}&weight=${cartData.value?.total_weight}&cityId=${cityId}&totalPrice=${cartData.value?.total_price}`;
            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }
            const res: any = await $fetch(URL, {
                method: "get",
                baseURL,
                headers
            });
            cartData.value.shipmentInfo = res.shipmentInfo
          
        } catch (e: any) {
          throw e
        }
    }

    function revertPromotion() {
        appliedPromotion.value = null;
        setCartData()
    }
    


    // * cart functions


    function addProductToCart(product:any){
        try {
            if (!cartItems.value) {
                cartItems.value = []
            }
            console.log(cartItems.value)
            
            if (gtm) {
                gtm.trackEvent({
                    event: 'add_to_cart',
                    ecommerce: {
                        currency: 'USD',
                        items: [product.ga]
                    },
                });
            }
    
            cartItems.value.push({id: product.id, qty: product.qty})
            console.log(cartItems.value)
        } catch (error:any) {
            console.log("🚀 ~ addProductToCart ~ error:", error)
            
        }
    }
    function getProductFromCart({model_id}:any){
        
        if (!cartItems.value) {
            return null
        }
        const productsFound = cartItems.value.filter((item:any) => {
            return item.id === model_id
        })

        if (productsFound.length) {
            return productsFound[0]
        }else {
            return null
        }
    }
    function findProductIndex(id:string){
        if (cartItems.value) {
            return cartItems.value.findIndex((item:any) => {
                return item.id === id
            })
        }
    }
    function removeItemFromCart (id:string){
        try {     
            const productIndex = findProductIndex(id)
            if (productIndex) {
                cartItems.value.splice(productIndex, productIndex)
                if (fetchedCartItems.value && fetchedCartItems.value.length) {
                    fetchedCartItems.value.splice(productIndex, productIndex)
                    setCartData()
                }
            }else {
                cartItems.value.shift()
                if (fetchedCartItems.value && fetchedCartItems.value.length) {
                    fetchedCartItems.value.shift()
                    setCartData()
                }
            }
        } catch (error:any) {
            console.log("🚀 ~ removeItemFromCart ~ error:", error)
            
        }
    }
    function decayItemQuantityFromCart (id:string){
        const productIndex = findProductIndex(id)
        const product = cartItems.value[productIndex]
        if (product.qty == 1) {
            removeItemFromCart(id)
        }else {
            product.qty --
            if (fetchedCartItems.value && fetchedCartItems.value.length) {
                fetchedCartItems.value[productIndex].qty --
                setCartData()
            }
        }
    }
    function updateQuantity ({model_id, quantityToUpdate}:any){
        const productIndex = findProductIndex(model_id)
        const product = cartItems.value[productIndex]
        if (!quantityToUpdate) {
            removeItemFromCart(model_id)
        }else {
            product.qty = quantityToUpdate
            if (fetchedCartItems.value && fetchedCartItems.value.length) {
                fetchedCartItems.value[productIndex].qty --
                setCartData()
            }
        }
    }
    function increaseItemQuantityFromCart (id:string){
        const productIndex = findProductIndex(id)
        const product = cartItems.value[productIndex]
        // if (product.qty == product.selectedModel.max_amount_purchaseable || product.qty == Number(product.selectedModel.available_amount) - Number(product.selectedModel.frozen_amount_in_warehouse)) {
        //     return
        // }else {
        // }
        product.qty ++
        if (fetchedCartItems.value && fetchedCartItems.value.length) {
            fetchedCartItems.value[productIndex].qty ++
            setCartData()
        }
    }


    // * checkout & verification
    async function checkout (config?:any){
        
        try {
            
            const localePath = useLocalePath()

            if (!userAuthStore.authToken) {
                navigateTo(localePath("/user/login?callBack=/cart"))
            }

            const url = 'user/checkout'
            const body = config

            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }

            const GAItems = fetchedCartItems.value?.map((item:any) => {
                return {
                    item_id: item.product_id,
                    item_variant: item.has_multiple_types ? item.model_name : undefined,
                    item_name: item.name,
                    item_category: item.category_name,
                    price: item.discounted_price,
                    last_price: item.price,
                    quantity: item.qty,
                }
            })
            
            if (gtm) {
                gtm.trackEvent({
                    event: 'begin_checkout',
                    ecommerce: {
                        currency: 'USD',
                        items: GAItems
                    },
                });
            }
            const {url:paymentUrl} = await $fetch(`/fa/${url}`, {
                method: 'post',
                headers,
                body,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            }) as any;
            navigateTo(paymentUrl, {
                external: true
            })

        } catch (error:any) {
            if (error.statusCode == 409) {
                location.reload()
            }
            if (!error.response?._data) {
                throw new Error("useCases.errors.payment.unExpected");
            }
            throw new Error(error.response._data.message)
        }
    }
    async function verifyPayment (authority:string){
        try {

            const url = `user/verify-payment/${authority}`
            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }
            
            const res = await $fetch(`/fa/${url}`, {
                method: 'put',
                headers,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            }) as any;

            if(res.firstTime && gtm){
                const ga = {
                    transaction_id: res.payment_id,
                    value: res.total_promoted_amount,
                    currency: 'USD',
                    items: res.items.map((item:any) => {
                        return {
                            item_id: item.id,
                            item_variant: item.has_multiple_types ? item.selectedModel.name : undefined,
                            item_name: item.name,
                            price: item.selectedModel.discounted_price,
                            last_price: item.selectedModel.price,
                            quantity: item.quantity,
                        }
                    })
                }
                gtm.trackEvent({
                    event: 'purchase',
                    ecommerce: ga
                });
            }

            successPayment.value = res

        } catch (error:any) {
            
            throw new Error("useCases.errors.payment.unExpected");
        }

    }

    return {
        successPayment,
        cartItems,
        fetchedCartItems,
        appliedPromotion,
        promotionSlug,
        updateQuantity,
        applyPromotion,
        revertPromotion,
        fetchShipmentInfo,
        setCartItems,
        addProductToCart,
        handleProductView,
        getProductFromCart,
        verifyPayment,
        removeItemFromCart,
        checkout,
        decayItemQuantityFromCart,
        increaseItemQuantityFromCart,
        cartData
    }

})
  