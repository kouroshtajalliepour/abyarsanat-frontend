<script setup lang="ts">
import PagesFaq from "@/components/pages/faq/index.vue";
const { getDefaultPageData } = usePageData();
// * hooks
getDefaultPageData();
</script>
<template>
  <PagesFaq />
</template>
