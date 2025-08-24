
function formatPrice(number:number) {
    const str = number.toString()
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function useProduct (){
    const {t} = useI18n()

    function sanitizePrice(price:string | number){
        return formatPrice(Math.floor(Number(price) / 10))
    }
    function sanitizeQuantity(quantity:string | number){
        return Number(quantity)
    }
    function getAmountLeft(product:any){

        return  Number(product.available_amount) - Number(product.frozen_amount_in_warehouse);
    }
    function sanitizePercentage(price: number|string, discountPrice: number|string) {
        return (Math.ceil((Number(discountPrice) / Number(price)) * 100) - 100) * -1 + '%'
    }
    function sanitizeTotalPrice (price: number|string, quantity: number|string){
        return formatPrice(Math.floor((Number(price) * Number(quantity)) / 10))
    }
    function updateProductQuantity(
        availableAmount:number | string, 
        frozenAmountInWarehouse:number | string,
        maxAmountPurchaseable: number | string,
        quantity?:number | string,
    ){
        const Quantity = quantity ? Number(quantity) : 1
        const AvailableAmount = Number(availableAmount)
        const FrozenAmountInWarehouse = Number(frozenAmountInWarehouse)
        const MaxAmountPurchaseable = Number(maxAmountPurchaseable)
        const available = AvailableAmount - FrozenAmountInWarehouse

        const result = (MaxAmountPurchaseable && available >= MaxAmountPurchaseable) ? MaxAmountPurchaseable : available 

        if (Quantity > result) {
            return result
        }else {
            return false
        }

    }
    function productIsAllowedToIncrease(
        availableAmount:number | string, 
        frozenAmountInWarehouse:number | string,
        quantity:number | string,
        maxAmountPurchaseable: number | string
    ){
        const Quantity = Number(quantity)
        const AvailableAmount = frozenAmountInWarehouse ? Number(availableAmount) : 0
        const FrozenAmountInWarehouse =frozenAmountInWarehouse ?  Number(frozenAmountInWarehouse) : 0
        const MaxAmountPurchaseable = maxAmountPurchaseable ? Number(maxAmountPurchaseable) : 0

        return !(
            MaxAmountPurchaseable == Quantity ||
            Quantity == (AvailableAmount - FrozenAmountInWarehouse)
        )
    }

    return {
        sanitizePrice,
        sanitizeQuantity,
        updateProductQuantity,
        getAmountLeft,
        sanitizePercentage,
        sanitizeTotalPrice,
        productIsAllowedToIncrease
    }
}