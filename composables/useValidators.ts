import makeValidateHTML from "../validators/makeValidateHTML";
import makeValidateString from "../validators/makeValidateString";
import makeValidateUrl from "../validators/makeValidateUrl";
import validateDescription from "../validators/validateDescription";
import validateEmail from "../validators/validateEmail";
import validateIranianPhoneNumber from "../validators/validateIranianPhoneNumber";
import validatePercentage from "../validators/validatePercentage";
import validateSlug from "../validators/validateSlug";
import validateNumber from "../validators/validateNumber";
import validateNegativeNumber from "../validators/validateNegativeNumber";
import validateV4UUID from "../validators/validateV4UUID";
import makeValidatePassword from "../validators/makeValidatePassword";

function makeUniqueValidator ({locale,key, validator, url, token}:{locale:string,token:string, key:string, validator: any, url:string}){

    return async function uniqueValidator(value:string){

        try {
          const validatedValue = await validator(value)
          const {public:{baseURL}} = useRuntimeConfig()

          const headers = {
            authorization: `Bearer ${token}`,
        }
      
          const res:any = await $fetch(`/${locale? locale : 'en'}${url}/check/${key}/${validatedValue}`, {
            method: 'get',
            baseURL,
            headers
          })
          
      
          if(!res.isAvailableToUse){
            throw new Error("useCases.errors.general.fieldNotUnique")
          }
        } catch (error:any) {
          throw error
        }
    }
  
}

export function useValidators (){
  return {
    makeValidateHTML,
    makeValidateString,
    makeValidateUrl,
    makeValidatePassword,
    makeUniqueValidator,
    validateNumber,
    validateNegativeNumber,
    validateDescription,
    validateEmail,
    validateIranianPhoneNumber,
    validatePercentage,
    validateSlug,
    validateV4UUID,
  }
}