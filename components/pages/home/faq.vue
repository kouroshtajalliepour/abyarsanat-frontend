<script lang="ts" setup>
// * imports
import PagesFaqAccordion from "@/components/pages/faq/accordion.vue";
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";

// * composables
const { t } = useI18n();
</script>

<template>
  <div class="homepage-faqs-wrapper">
    <ReusableMyPageSmallTitle :title="t('pages.faq.title')" />
    <PagesFaqAccordion :faqsToShow="3" />
  </div>
</template>

<style lang="scss">
.homepage-faqs-wrapper {
  width: 100%;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 30px;
  position: relative;
  @include lg {
    padding: 0 30px;
    padding-top: 20px;
  }
}
</style>
