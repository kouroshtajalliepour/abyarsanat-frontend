export default function makeValidateString(acceptedValues?: string[]){
    return function validateString(string:string):string {

        if (!string || typeof string !== 'string') {
            throw new Error("entities.errors.general.string.required")
        }
        if (string.length > 300) {
            throw new Error("entities.errors.general.string.tooLong")
        }

        if (acceptedValues && acceptedValues.length && !acceptedValues.includes(string)) {
            throw new Error("entities.errors.general.string.invalidField")
        }
        
        return string
    
    }
}