type uploadOptions ={
    headers: any,
    body: any, 
    url: string
}

export function useUpload (){

    function mock(file:any) {
        return `http://my-domain.com/test-image-${Math.floor(Math.random() * 100)}`        
    }

    function uploadUsingSignedUrl(res:any, file:any){
        
        return new Promise(async (resolve, reject) =>{

            try {
                const formData = new FormData()
                formData.append('key', res.upload.key)
                formData.append(
                  'X-Amz-Algorithm',
                  res.upload['X-Amz-Algorithm']
                )
                formData.append(
                  'X-Amz-Credential',
                  res.upload['X-Amz-Credential']
                )
                formData.append('X-Amz-Date', res.upload['X-Amz-Date'])
                formData.append('acl', 'public-read')
                formData.append('policy', res.upload.Policy)
                formData.append(
                  'X-Amz-Signature',
                  res.upload['X-Amz-Signature']
                )
                formData.append('file', file)
                await $fetch(res.url, {
                    method: 'POST',
                    body: formData
                });
          
                resolve(
                  `https://${res.upload.bucket}.s3.ir-thr-at1.arvanstorage.com/${res.upload.key}`
                )
            } catch (error: any) {
                reject(error)
            }
        })
    }


    return {
        mock,
        uploadUsingSignedUrl
    }
}