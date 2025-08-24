export default function makeValidateUrl(canBeRelativePath?:boolean) : (args: {url:string}) => string {
    return function validateUrl(url) {
        
    
        if (!url || typeof url !== "string") {
            throw new Error ("entities.errors.general.url.required");
        }

        const Length = url as any

        if (Length.length > 200) {
            throw new Error ("entities.errors.general.url.tooLong");
        }

        if (!canBeRelativePath || url[0] !== '/') {
            if (!isValidUrl(url)) {
                throw new Error("entities.errors.general.url.invalidFormat");
            }
        
        }
        
        return url
    
        // functions
    
        function isValidUrl(str:string) {
            const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
            return matchpattern.test(str);
        }
    }
}