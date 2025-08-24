<script setup lang="ts">
// * imports
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/store/notification";
import ReusableMyNotification from "@/components/reusable/myNotification.vue";

// * composables
const notificationStore = useNotificationStore();
const { locale } = useI18n();

// * store data
const { notifyClass, notifyTitle } = storeToRefs(notificationStore);

// * functions
function handleOffline() {
  notifyClass.value = "error";
  notifyTitle.value = "pages.general.disconnected";
}
function handleOnline() {
  notifyClass.value = "success";
  notifyTitle.value = "pages.general.backOnline";
}

// * hooks
useHead({
  htmlAttrs: {
    lang: locale.value,
    class: "custom-scroll-y",
  },
});
</script>

<template>
  <NuxtLayout>
    <ReusableMyNotification />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.main-page-content {
  min-height: calc(100vh - 125px);
}
</style>
