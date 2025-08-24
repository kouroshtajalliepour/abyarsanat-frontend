
export default function validateV4UUID(id:string):string {

    if (!id || !uuidIsValid(id)) {
        throw new Error("entities.errors.general.id.invalidFormat")
    }

    return id
}



function uuidIsValid (id:string) {
    return String(id)
      .match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
}