export default function makeValidateHTML(HTMLValidator:any){
    return function validateContent(content:any):string {

        if (!Array.isArray(content) || !content.length) {
            throw new Error("entities.errors.general.content.invalidFormat");
        }
    
        for (let i = 0; i < content.length; i++) {
            const Content = content[i];
            
            if (typeof Content !== 'object' || Array.isArray(Content) || Content === null) {
                throw new Error("entities.errors.general.content.invalidFormat");
            }
    
            if (!Content.type || !Content.context || Object.keys(Content).length > 2) {
                throw new Error("entities.errors.general.content.invalidFormat");
            }
    
            switch (Content.type) {
                case 'image':
    
                    if (!Content.context.alt || !Content.context.url || Object.keys(Content.context).length > 2) {
                        throw new Error("entities.errors.general.content.invalidFormat");
                    }
    
                    if (
                        !Content.context.url || 
                        typeof Content.context.url !== "string" || 
                        Content.context.url.length > 200 || 
                        !isValidUrl(Content.context.url)
                    ) {
                        throw new Error("entities.errors.general.content.invalidFormat");
                    }
    
                    if (
                        !Content.context.alt || 
                        typeof Content.context.alt !== 'string' || 
                        !Content.context.alt || 
                        Content.context.alt.length > 100
                    ) {
                        throw new Error("entities.errors.general.content.invalidFormat");
                    }
    
                    break;
                case 'html': case 'html-text':
                    
                    if (
                        !Content.context || 
                        typeof Content.context !== 'string' || 
                        !Content.context || 
                        Content.context.length > 10000
                    ) {
                        throw new Error("entities.errors.general.content.invalidFormat");
                    }
    
                    const errors = HTMLValidator(Content.context)
                    if(errors.length > 0){
                        
                        throw new Error("entities.errors.general.content.invalidFormat");
                    }
    
                    break;
            
                default:
                    throw new Error("entities.errors.general.content.invalidFormat");
                    break;
            }
    
            
        }
        
        return JSON.stringify(content)
    }
    
    function isValidUrl(str:string) {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(str);
    }
}