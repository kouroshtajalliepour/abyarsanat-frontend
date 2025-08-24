import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', () => {

    const {public: {baseURL}} = useRuntimeConfig()
    const searchResults = ref([]) as any
    
    async function get({
        lang,
        searchQuery
    }:any) {

        try {
            
            let URL = `/${lang}/public/search`
            const res:any = await $fetch(URL, {
                query: {
                    searchQuery
                },
                method: 'get',
                baseURL,
            })
            searchResults.value = res.result
        } catch (error) {
        }
    }
    



      
    return { 
        searchResults,
        get,
    }
});