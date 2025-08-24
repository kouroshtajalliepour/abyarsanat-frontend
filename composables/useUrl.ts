
export function useUrl (){

    const {
        public: {
            file_urls: {
                bucketUrl,
                bucketDomainUrl,
            },
            env
        }
    }= useRuntimeConfig()


    function getUrl(url:string){
        if (env.toLowerCase() == 'production' && bucketUrl && bucketDomainUrl) {
            if (url.includes(bucketUrl)) {
                return url.replace(bucketUrl, bucketDomainUrl)
            }
        }
        return url
    }

    return {
        getUrl
    }


}