<script setup lang="ts">
import PagesCategories from "@/components/pages/categories/index.vue";
const { getDefaultPageData } = usePageData();
// * hooks
getDefaultPageData();
</script>

<template>
  <PagesCategories />
</template>
