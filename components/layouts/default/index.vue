<script lang="ts" setup>
// * imports
import LayoutsDefaultAppHeader from "@/components/layouts/default/appHeader.vue";
import LayoutsDefaultAppFooter from "@/components/layouts/default/appFooter.vue";
import LayoutsDefaultBottomNav from "@/components/layouts/default/bottomNav.vue";
import LayoutsDefaultFixedContent from "@/components/layouts/default/fixedContent.vue";
// * props
defineProps<{
  mainBanner: {
    image_url?: string;
    to?: string;
  };
  contactNumber?: string;
  salesNumber?: string;
  supportNumber?: string;
  whatsAppUrl?: string;
  instagramUrl?: string;
}>();

// * data
const loading = ref(true);

// * composables
const route = useRoute();

// * hooks
onMounted(() => {
  loading.value = false;
});
</script>
<template>
  <LayoutsDefaultAppHeader
    :to="mainBanner.to"
    :image_url="mainBanner.image_url"
    :loading="loading"
    v-if="route.path !== '/user/login' && route.path !== '/payment/call-back'"
  />
  <main class="default-layout-main-content">
    <slot />
  </main>
  <LayoutsDefaultAppFooter
    :contactNumber="contactNumber"
    :instagramUrl="instagramUrl"
    :whatsAppUrl="whatsAppUrl"
    :salesNumber="salesNumber"
    :supportNumber="supportNumber"
    :loading="loading"
    :hideFooterInMobile="
      ['/categories', '/cart'].includes(route.path) ||
      route.path.includes('user') ||
      route.path.includes('/product')
    "
    v-if="route.path !== '/user/login' && route.path !== '/payment/call-back'"
  />
  <LayoutsDefaultBottomNav
    v-if="
      route.path !== '/user/login' &&
      route.path !== '/payment/call-back' &&
      !route.path.includes('/product')
    "
    :loading="loading"
  />
  <LayoutsDefaultFixedContent
    :whatsAppUrl="whatsAppUrl"
    :loading="loading"
    v-if="route.path !== '/user/login' && route.path !== '/payment/call-back'"
  />
</template>

<style lang="scss">
.default-layout-main-content {
  max-width: 1500px;
  margin: auto;
}
</style>
