import { usePageStore } from "@/store/page";


export default  defineNuxtRouteMiddleware(async(to:any, from,) => {
  try {
    if (process.server) return
    const pageStore = usePageStore();

    const nuxt = useNuxtApp()

    await pageStore.getData({
        url: 'cart',
        query: "",
        lang: 'fa',
        dataResult: "",
    });


} catch (e: any) {
    // if (to.path != '/user/login') {
    //   return nuxt.$localePath('/user/login')
    // }
}
})

// export default async function ({ store, $axios, $router, error }: any) {
//   }
  