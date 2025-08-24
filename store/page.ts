import { defineStore } from 'pinia'
import {useCartStore} from "./user/cart"

export const usePageStore = defineStore('pageStore', () => {

    const cartStore = useCartStore()
    
    const {public: {baseURL}} = useRuntimeConfig()
    const multiData:any = ref([]) as any
    const page: any = ref({}) as any
    const info: any = ref({}) as any
    const menu: any = ref([]) as any
    const dataPages:any = ref([]) as any
    const loading = ref (false);
    const pageLoading = ref(false)
    const barProgress = ref(0) as any
    const imagePreview = ref(null) as any
    const contentPreview = ref(null) as any
    const recordsFound = ref(0) as any
    const loadedAt = ref (null) as any
    const cartItems = ref([]) as any
    
    // * utils
    function openLoading(autoLoad:boolean) {
        loading.value = true
    }
    function closeLoading(){
        loading.value = false
    }
    function setDataPages(totalCount: any, pageSize:number, )  {
        return new Promise<number[]>((resolve, reject) => {
            try {
                const pages: number[] = []
                const totalPages = Math.ceil(totalCount / pageSize)
                for (let i = 0; i < totalPages; i++) {
                    pages.push(i + 1)
                }
                dataPages.value = pages
                resolve(pages)
            } catch (error: any) {
                reject(error)
            }
        })
    }
    
    // * actions
    async function getData({  url, lang, dataResult }: any) {
        pageLoading.value = true
        try {
            let URL = `/${lang}/public/newPage/${url}?${ !info.value.id || !menu.value.length ? 'fetchInfo=1' : ''}`

            if (
                ![
                    'home',
                    'about',
                    'blogs',
                    'faq',
                    'cart',
                    'contact'
                ].includes(url) &&
                info.value.id &&
                menu.value.length
            ) {
                return page.value
            }

            const res:any = await $fetch(URL, {
                method: 'get',
                baseURL,
                withCredentials: true,
                credentials: 'include',
            })

            
            if (!info.value.id || !menu.value.length) {
                info.value = res.info
                menu.value = res.info.menu
            }

            if (res.cartItems && res.cartItems.length) {
                cartStore.setCartItems(res.cartItems)
            }
            
            page.value = res.page ? res.page : {}
            return res.page ? res.page : {}
            
        } catch (error:any) {
            if(!error.response){
                throw ("useCases.errors.general.unExpected")
            }
            switch (error.response?.status) {
                case 404:
                    throw new Error("404");
                    
                    break;
                case 500:
                    throw new Error("500");
                    
                    break;
                case 403:
                    throw new Error("403");
                    
                    break;
                case 429:
                    throw new Error("429");
                    
                    break;
            
                default:
                    break;
            }
            throw error
          
        }finally{
            pageLoading.value = false
        }
    }
    
    async function getMultiData(
        {
          
        
          lang,
          keepOldData,
          dataResult,
          dataCountResult,
          url,
          preDefined,
          pageSize,
          pageNumber,
          query,
        }: any
    ) {

        openLoading(false)
        try {
            dataPages.value = []
            recordsFound.value = 0

            const PreDefined = preDefined ? preDefined : {}
            const PageNumber = pageNumber  ? {
                pageNumber
            } : {}

            const Query = {
                ...query,
                ...PreDefined,
                ...PageNumber,
                pageSize
            }

            const res:any = await $fetch(`${lang}${url}`, {
                method: 'get',
                query: Query,
                baseURL,
            });

            recordsFound.value = res[dataCountResult];
        
            if (pageNumber) {
                await setDataPages(res[dataCountResult], pageSize)
            }else{
                dataPages.value = [1]
            }
            if(keepOldData){
                multiData.value.push(...res[dataResult])
            }else{
                if (res[dataResult].length) {
                    loadedAt.value = new Date()
                    multiData.value = res[dataResult]
                }else {
                    multiData.value = null
                }

            }
            
            return {
                multiData:multiData.value,
                pages: dataPages.value,
                
            }
        } catch (error:any) {
            if(!error.response){
                throw ("useCases.errors.general.unExpected")
            }
            switch (error.response?.status) {
                case 404:
                    throw new Error("404");
                    
                    break;
                case 500:
                    throw new Error("500");
                    
                    break;
                case 403:
                    throw new Error("403");
                    
                    break;
                case 429:
                    throw new Error("429");
                    
                    break;
            
                default:
                    break;
            }
            throw error
        }finally{
            closeLoading();
        }
    }
      
    return { 
        multiData,
        cartItems,
        menu,
        info,
        page,
        dataPages,
        getData,
        getMultiData,
        loading,
        pageLoading,
        openLoading,
        closeLoading,
        barProgress,
        imagePreview,
        contentPreview,
        recordsFound,
        loadedAt
    }
});