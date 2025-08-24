import {createGtm } from "@gtm-support/vue-gtm"
export default defineNuxtPlugin((nuxtApp) => {

  const { gtagId } = useRuntimeConfig().public;

  if (!window || !gtagId) return;

  nuxtApp.vueApp.use(
    createGtm({
      id: gtagId,
      defer: false,
      compatibility: false,
      enabled: true,
      debug: true,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: true
    })
  )







    // * shit code
    
    // function gtag() {
    //   window.dataLayer.push(arguments);
    // }
    
    // window.dataLayer = window.dataLayer || [];
    
    // gtag("js", new Date());
    // gtag("config", gtagId);
    
    // useHead({
    //   script: [
    //     {
    //       src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
    //       async: true,
    //     },
    //   ],
    // });
  });