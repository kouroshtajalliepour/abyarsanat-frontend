<script setup lang="ts">
// * imports
import PagesAbout from "@/components/pages/about/index.vue";
const { getDefaultPageData } = usePageData();
getDefaultPageData();
</script>

<template>
  <PagesAbout />
</template>
