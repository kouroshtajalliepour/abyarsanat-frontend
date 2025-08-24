import {useGtm as useVueGtm} from "@gtm-support/vue-gtm"


export function useGtm () {
    const gtm = useVueGtm()
    const { gtagId } = useRuntimeConfig().public;
    if (gtagId) return gtm
}