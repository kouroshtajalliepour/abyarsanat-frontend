
export default function validateDescription(description:string):string {

    if (!description || typeof description !== 'string') {
        throw new Error("entities.errors.general.description.required")
    }
    if (description.length > 1000) {
        throw new Error("entities.errors.general.description.tooLong")
    }
    
    return description

}