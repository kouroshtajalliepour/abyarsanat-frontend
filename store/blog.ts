import { defineStore, storeToRefs } from 'pinia'
import { usePageStore } from './page';
import { useBlogCategoryStore } from './blog-category';

export const useBlogStore = defineStore('blogStore', () => {

    const {public: {baseURL}} = useRuntimeConfig()
    const pageStore = usePageStore()
    const blogCategoryStore = useBlogCategoryStore()
    const {info, page,menu} = storeToRefs(pageStore) 
    const {multiData:blogCategories} = storeToRefs(blogCategoryStore) 

    const multiData:any = ref([]) as any
    const data: any = ref({}) as any
    const dataPages:any = ref([]) as any
    const gotData = ref(false)

    const loading = ref (false);
    const barProgress = ref(0) as any
    const imagePreview = ref(null) as any
    const contentPreview = ref(null) as any
    const recordsFound = ref(0) as any
    const loadedAt = ref (null) as any
    
    // * utils
    function loadBar() {
        const yo = setInterval(() => {
          if (!loading.value) {
            clearInterval(yo);
          }
          if (barProgress.value !== 100) {
            barProgress.value += 1;
          } else {
            barProgress.value = 0;
          }
        }, 5);
    }
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
    async function getData({  url, query, lang, dataResult }: any) {
        try {

            let Query = ''

            let PreDefined = ''

            PreDefined = info.value && menu.value?.length ? '' : "fetchAdditionalData=1"

            if (PreDefined) {
                Query = !query ? `?${PreDefined}` : `&${PreDefined}`
            }
            
            let URL = `/${lang}${url}${Query}`

            const res:any = await $fetch(URL, {
                method: 'get',
                baseURL,
            })

            if (!info.value.id || !menu.value.length) {
                info.value = res.additionalData.info
                menu.value = res.additionalData.menu
            }
            
            if(dataResult){

                data.value = res[dataResult]
                return res[dataResult]
            }else{
                data.value = res
                return res
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

        dataPages.value = []
        recordsFound.value = 0
        openLoading(false)
        try {
            const PreDefined = preDefined ? preDefined : {}
            const PageNumber = pageNumber  ? {
                pageNumber
            } : {}
            PreDefined.fetchAdditionalData = gotData.value ? undefined : "1"

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

            if (res.additionalData) {
                info.value = res.additionalData.info
                page.value = res.additionalData.page
                menu.value = res.additionalData.menu
                blogCategoryStore.setDataPages( Number(res.additionalData.categoriesCount.result), pageSize)
                blogCategoryStore.recordsFound = Number(res.additionalData.categoriesCount.result)
                blogCategories.value = res.additionalData.categories
            }

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
            
            gotData.value = true

            return {
                multiData:multiData.value,
                pages: dataPages.value,
                page: res.additionalData ? res.additionalData.page : {}
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
            closeLoading()
        }
    }



      
    return { 
        multiData,
        data,
        dataPages,
        getData,
        getMultiData,
        loading,
        openLoading,
        closeLoading,
        barProgress,
        imagePreview,
        contentPreview,
        recordsFound,
        loadedAt
    }
});