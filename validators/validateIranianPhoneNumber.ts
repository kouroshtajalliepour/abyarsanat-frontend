
export default function validateIranianPhoneNumber(phone_number:string):string {

    if (!phone_number || typeof phone_number !== "string") {
        throw new Error("entities.errors.general.phone_number.required");
    }
    
    if (!phoneNumberIsValid(phone_number)) {
        throw new Error("entities.errors.general.phone_number.invalidFormat");
        
    }
    
    let validatedPhoneNumber : string
    switch (phone_number[0]) {
        case "0":
            validatedPhoneNumber = `+98${phone_number.substring(1)}`
            break;
        case "+":
            validatedPhoneNumber = phone_number
            break;
    
        default:
            validatedPhoneNumber = `+98${phone_number}`
            break;
    }
    
    return validatedPhoneNumber

    function phoneNumberIsValid(phoneNumber:string){
        var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
        return regex.test(phoneNumber);
    }
}

