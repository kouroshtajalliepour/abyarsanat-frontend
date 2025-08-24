export default function makeValidatePassword(mustInclude?:string[]) : (args: string) => string {
    return function validatePassword(password) {
        
    
        if (!password || typeof password !== "string") {
            throw new Error ("entities.errors.general.password.required");
        }
        
        if (password.length < 12) {
            throw new Error ("entities.errors.general.password.lessThan12");
        }
        
        if (password.length > 32) {
            throw new Error ("entities.errors.general.password.moreThan32");
        }

        if (mustInclude?.includes('lowercase')) {
            if (!hasLowerCase(password)) {
                throw new Error ("entities.errors.general.password.lowerCaseNotIncluded");
            }
        }
        if (mustInclude?.includes('uppercase')) {
            if (!hasUpperCase(password)) {
                throw new Error ("entities.errors.general.password.upperCaseNotIncluded");
            }
        }
        if (mustInclude?.includes('number')) {
            if (!hasNumber(password)) {
                throw new Error ("entities.errors.general.password.numberNotIncluded");
            }
        }
        if (mustInclude?.includes('symbol')) {
            if (!hasSymbols(password)) {
                throw new Error ("entities.errors.general.password.symbolNotIncluded");
            }
        }
        
        
        
        // return statment
        return password
        
        // functions
        
        function hasLowerCase(str: string) {
            return str.toUpperCase() != str;
        }
        
        function hasUpperCase(str: string) {
            return str.toLowerCase() != str;
        }
        
        function hasSymbols(str: string) {
            const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return regex.test(str);
        }
        
        function hasNumber(str: string) {
            return /\d/.test(str)
        }
    }
}


