<script lang="ts" setup>
// * imports
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import LayoutsDefault from "@/components/layouts/default/index.vue";

// * composables
const pageStore = usePageStore();
const { info } = storeToRefs(pageStore);
</script>

<template>
  <div>
    <LayoutsDefault
      :mainBanner="{
        to: info?.main_banner_url,
        image_url: info?.main_banner_image_url,
      }"
      :whatsAppUrl="info?.whats_app"
      :contactNumber="info?.contact_number"
      :supportNumber="info?.support_number"
      :salesNumber="info?.sale_number"
      :instagramUrl="info?.instagram"
    >
      <slot />
    </LayoutsDefault>
  </div>
</template>

<style lang="scss"></style>
