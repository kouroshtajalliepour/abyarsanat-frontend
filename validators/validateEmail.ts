
export default function validateEmail(email:string):string {

    if (!email) {
        throw new Error ("entities.errors.general.email.required")
    }

    if (typeof email !== "string" || !emailIsValid(email)) {
        throw new Error ("entities.errors.general.email.invalidFormat");
    }

    if (email.length > 200) {
        throw new Error ("entities.errors.general.email.tooLong");
    }

    // return statement

    return email.toLowerCase()


    // functions

    function emailIsValid (email: string)  {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
}
