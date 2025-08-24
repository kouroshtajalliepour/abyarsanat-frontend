
import { useUserAuthStore } from "@/store/user/auth";
import { usePageStore } from "@/store/page";


export default  defineNuxtRouteMiddleware(async(to:any, from,) => {
  const nuxt = useNuxtApp()
  try {
    if (process.server) return
    const userStore = useUserAuthStore() as any;
    await userStore.triggerCheckAuthStatus()

    if (userStore.authToken) {
      if ((!userStore.user?.first_name || !userStore.user?.last_name)) {
        if (to.path != '/user/login') {
          return nuxt.$localePath('/user/login')
        }
      }else {
        if (to.path == '/user/login') {
          return nuxt.$localePath('/user/info')
        }
      }
    }


  } catch (e: any) {

    if (to.path.includes('user') && to.path != '/user/login') {
      return nuxt.$localePath('/user/login')
    }
  } finally{
    if (to.path == '/cart') {
      const pageStore = usePageStore();
      await pageStore.getData({
        url: 'cart',
        query: "",
        lang: 'fa',
        dataResult: "",
      });
    }
  }
})

// export default async function ({ store, $axios, $router, error }: any) {
//   }
  