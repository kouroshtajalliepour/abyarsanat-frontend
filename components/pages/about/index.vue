<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { usePageStore } from "@/store/page";
import ReusableMyPageTitle from "@/components/reusable/myPageTitle.vue";
import PagesAboutImages from "./images.vue";
import ReusableMyHtmlSanitizer from "@/components/reusable/myHtmlSanitizer.vue";

// * composables
const pageStore = usePageStore();

// * store data
const { info } = storeToRefs(pageStore);
</script>

<template>
  <section class="about-us-page-wrapper">
    <ReusableMyPageTitle title="pages.about.title" />

    <PagesAboutImages
      :images="[info?.about_primary_image_url, info?.about_secondary_image_url]"
    />
    <ReusableMyHtmlSanitizer :contents="info?.about_content" />
  </section>
</template>
<style lang="scss">
.about-us-page-wrapper {
  display: block;
}
</style>
