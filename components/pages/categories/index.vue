<script lang="ts" setup>
// * imports
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import LayoutsHeaderModulesMenu from "@/components/layouts/headerModules/Menu.vue";

// * composables
const { t } = useI18n();
const pageStore = usePageStore();

// * store data
const { info } = storeToRefs(pageStore);
</script>

<template>
  <section
    :class="['categories-page-wrapper', info.main_banner_url ? 'main-banner-exits' : '']"
  >
    <LayoutsHeaderModulesMenu />
  </section>
</template>

<style lang="scss">
.categories-page-wrapper {
  width: 100%;
  // padding: 20px 10px;
  height: $full-window-xs;
  &.main-banner-exits {
    height: $full-window-xs-with-main-banner;
  }
  &.position-static {
    position: static;
  }
}
.text-base {
  color: $gray-title !important;
}
.categories-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
}
</style>
