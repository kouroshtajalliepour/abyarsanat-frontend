
export default function validatePercentage(percentage:number | string):string {


    if (typeof percentage !== "number" && isNaN(Number(percentage))) {
        throw new Error ("entities.errors.general.percentage.invalidFormat");
    }
    
    if (typeof percentage === "number" ? percentage : Number(percentage) < 0) {
        throw new Error ("entities.errors.general.price.negative");
    }
    if (typeof percentage === "number" ? percentage : Number(percentage) > 100) {
        throw new Error ("entities.errors.general.percentage.moreThan100");
    }

    return typeof percentage === "number" ? percentage.toString() : percentage
}