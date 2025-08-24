<script lang="ts" setup>
import PagesTerms from "@/components/pages/terms/index.vue";
const { getDefaultPageData } = usePageData();
// * hooks
getDefaultPageData();
</script>

<template>
  <PagesTerms />
</template>
