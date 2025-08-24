
export default function validateSlug(slug:string):string {

    if (!slug || typeof slug !== "string") {
        throw new Error ("entities.errors.general.slug.required");
    }

    if(slug.includes(' ')){
        throw new Error("entities.errors.general.slug.spaceIncluded");
    }

    if(slugIncludesSymbols(slug)){
        throw new Error("entities.errors.general.slug.symbolsIncluded");
    }
    if(slugIsNotInEnglish(slug)){
        throw new Error("entities.errors.general.slug.notInEnglish");
    }

    if (slug.length > 100) {
        throw new Error ("entities.errors.general.slug.tooLong");
    }

    
    return slug

}

function slugIncludesSymbols(slug:string){
    return /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(slug)
}
function slugIsNotInEnglish(slug:string){
    return !/[A-Za-z0-9]+/i.test(slug)
}