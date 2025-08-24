<template>
  <LayoutsDefault
    :mainBanner="{
      to: info?.main_banner_url,
      image_url: info?.main_banner_image_url,
    }"
    :whatsAppUrl="info?.whats_app"
    :contactNumber="info?.contact_number"
    :instagramUrl="info?.instagram"
  >
    <div class="error-page-wrapper">
      <p class="error-status">{{ error.statusCode }}</p>
      <p class="mt-7 text-4xl error-message">
        {{ error.statusCode != "404" ? error.message : t("pages.error.status") }}
      </p>
      <button
        :name="t('pages.error.redirect')"
        class="btn my-9 redirect-btn"
        @click="handleError"
      >
        {{ t("pages.error.redirect") }}
      </button>
    </div>
  </LayoutsDefault>
</template>

<script lang="ts" setup>
import { usePageStore } from "./store/page";
import { storeToRefs } from "pinia";
const pageStore = usePageStore();

const { info } = storeToRefs(pageStore);
const { t, locales, locale } = useI18n();
useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});
const localePath = useLocalePath();
const handleError = () => clearError({ redirect: localePath("/") });
const error = useError() as any;
</script>
<style lang="scss">
.error-page-wrapper {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.error-status {
  font-size: 4.9rem;
  font-weight: 700;
  color: black;
}
.error-message {
  text-align: center;
}
.redirect-btn {
  background-color: $primary;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
}
</style>
