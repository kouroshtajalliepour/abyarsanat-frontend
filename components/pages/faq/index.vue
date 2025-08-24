<script lang="ts" setup>
// * imports
import ReusableMyPageTitle from "@/components/reusable/myPageTitle.vue";
import ReusableMyInfoBox from "@/components/reusable/myInfoBox.vue";
import PagesFaqAccordion from "@/components/pages/faq/accordion.vue";
</script>

<template>
  <section>
    <ReusableMyPageTitle title="pages.faq.title" />
    <ReusableMyInfoBox info="pages.faq.informationText" />
    <PagesFaqAccordion />
  </section>
</template>

<style lang="scss">
.test {
  display: block;
}
</style>
