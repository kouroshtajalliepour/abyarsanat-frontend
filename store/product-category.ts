import { defineStore } from 'pinia'

export const useProductCategoryStore = defineStore('productCategoryStore', () => {

    const {public: {baseURL}} = useRuntimeConfig()
    const multiData:any = ref([]) as any
    const data: any = ref({}) as any
    const dataPages:any = ref([]) as any

    const loading = ref (false);
    const barProgress = ref(0) as any
    const imagePreview = ref(null) as any
    const contentPreview = ref(null) as any
    const recordsFound = ref(0) as any
    const loadedAt = ref (null) as any
    const links:any = ref([
        {
            name: 'پروتئین ها',
            id: '8732sdfkj',
            sub_links: [
                {
                    name: 'پروتئین ایزوله',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'پروتئین بار',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'کربو پروتئین',
                    to: '/about',
                    use_as_divider: true
                },
                {
                    name: 'دکستروز',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'کربوهیدرات',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'مس گینر',
                    to: '/about',
                    use_as_divider: false
                }
            ]
            
        },
        {
            name: 'آمینو اسید ها',
            id: '2093kdjfk',
            sub_links: [
                {
                    name: 'BCAA بی سی ای ای',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'EAA ایی ای ای',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'HMB اچ ام بی',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'آمینو',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'لوسین',
                    to: '/about',
                    use_as_divider: false
                }
            ]
            
        },
        {
            name: 'کراتین ها ',
            id: 'sdkfjl989',
            sub_links: [
                {
                    name: 'کراتین ترکیبی',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'کراتین مونوهیدرات',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'کراتین HCL',
                    to: '/about',
                    use_as_divider: false
                },
            ]
            
        },
        {
            name: 'پاراهورمان ها',
            id: 'sdfjk398',
            sub_links: [
                {
                    name: 'DAA',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'Test',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'آشوگاندا',
                    to: '/about',
                    use_as_divider: false
                },
                {
                    name: 'تیریبولوس',
                    to: '/about',
                    use_as_divider: false
                },
            ]
            
        }
    ]) as any

    
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
          
            let URL = `/${lang}${url}${query}`

            const res:any = await $fetch(URL, {
                method: 'get',
                baseURL,
            })
            
            
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
    async function getLocales({  url, lang, dataResult }: any) {
        try {
          
            let URL = `/${lang}${url}/locales`

            const res:any = await $fetch(URL, {
                method: 'get',
                baseURL,
            })
            
            
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
            closeLoading()
        }
    }
      
    return { 
        multiData,
        data,
        dataPages,
        getData,
        getMultiData,
        getLocales,
        loading,
        openLoading,
        closeLoading,
        barProgress,
        imagePreview,
        contentPreview,
        recordsFound,
        loadedAt,
        links
    }
});