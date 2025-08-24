import { defineStore } from 'pinia'
import { useUserAuthStore } from './auth';

export const useUserAddressStore = defineStore('userAddressStore', () => {

    const userAuthStore = useUserAuthStore()
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
        dataPages.value = []
        recordsFound.value = 0
        openLoading(false)
        try {
            const PreDefined = preDefined ? preDefined : {}
            const PageNumber = pageNumber  ? {
                pageNumber
            } : {}

            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }

            const Query = {
                ...query,
                ...PreDefined,
                ...PageNumber,
                pageSize
            }

            const res:any = await $fetch(`${lang}${url}`, {
                method: 'get',
                headers,
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
            throw error
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


    async function createData({
        name,
        province_name,
        city_name,
        province_id,
        city_id,
        full_address,
        building_number,
        building_unit,
        recipient_phone_number,
        recipient_first_name,
        recipient_last_name,
        postal_code,
    }:any, lang:string) {

        try {
            const url = "/user/address"

            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }

            const body = {
                name,
                province_name,
                city_name,
                province_id,
                city_id,
                full_address,
                building_number,
                building_unit,
                recipient_phone_number,
                recipient_first_name,
                recipient_last_name,
                postal_code,
            } as any

            const res:any = await $fetch(`${lang}${url}`, {
                method: 'post',
                headers,
                body,
                baseURL,
            });
            body.id = res.id
            if (multiData.value) {
                multiData.value.unshift(body)
            }else {
                multiData.value = [body]
            }
        } catch (error:any) {
            throw error
            
        }
    }
    async function updateData({
        id,
        name,
        province_name,
        city_name,
        province_id,
        city_id,
        full_address,
        building_number,
        building_unit,
        recipient_phone_number,
        recipient_first_name,
        recipient_last_name,
        postal_code,
    }:any, lang:string) {

        try {
            const url = `/user/address/${id}`

            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }

            const body = {
                name,
                province_name,
                city_name,
                province_id,
                city_id,
                full_address,
                building_number,
                building_unit,
                recipient_phone_number,
                recipient_first_name,
                recipient_last_name,
                postal_code,
            }

            const res:any = await $fetch(`${lang}${url}`, {
                method: 'put',
                headers,
                body,
                baseURL,
            });
            
            const addressIndex = multiData.value.findIndex((item:any) => {
                return item.id === id
            })

            multiData.value[addressIndex] = {...body, id}

        } catch (error:any) {
            throw error
            
        }
    }
    async function deleteData({
        id,
    }:any, lang:string) {

        try {
            const url = `/user/address/${id}`

            const headers = {
                authorization: `Bearer ${userAuthStore.authToken}`
            }

            const res:any = await $fetch(`${lang}${url}`, {
                method: 'delete',
                headers,
                baseURL,
            });
            
            const addressIndex = multiData.value.findIndex((item:any) => {
                return item.id === id
            })

            if (addressIndex) {
                multiData.value.splice(addressIndex, addressIndex)
            }else {
                multiData.value.shift()
            }

        } catch (error:any) {
            throw error
            
        }
    }

      
    return { 
        multiData,
        data,
        dataPages,
        createData,
        updateData,
        getData,
        getMultiData,
        deleteData,
        getLocales,
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