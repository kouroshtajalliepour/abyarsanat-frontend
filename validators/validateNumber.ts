
export default async function validateNumber(price:number | string):Promise<string> {
    if (typeof price !== "number" && isNaN(Number(price))) {
        throw new Error ("entities.errors.general.price.invalidFormat");
    }
    
    if (typeof price === "number" ? price : Number(price) < 0) {
        throw new Error ("entities.errors.general.price.negative");
    }

    return typeof price === "number" ? price.toString() : price
}