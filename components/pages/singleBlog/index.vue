<script lang="ts" setup>
// * imports
import PagesSingleBlogModulesLayout from "./modules/layout.vue";
import PagesSingleBlogModulesBlogCart from "./modules/blogCart.vue";

// * props
const props = defineProps<{
  blog: any;
  loading: any;
}>();
</script>

<template>
  <PagesSingleBlogModulesLayout :blog="blog" :loading="loading">
    <PagesSingleBlogModulesBlogCart :blog="blog" :loading="loading" />
  </PagesSingleBlogModulesLayout>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
