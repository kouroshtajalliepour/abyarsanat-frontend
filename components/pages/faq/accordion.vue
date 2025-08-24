<script setup lang="ts">
// * imports
import ReusableMyAccordion from "@/components/reusable/myAccordion.vue";

// * composables
const { t } = useI18n();

// * props
const props = defineProps<{
  faqsToShow?: number;
}>();

// * computed data
const faqs = computed(() => {
  const data = [
    {
      label: "pages.faq.question1",
      content: "pages.faq.answer1",
    },
    {
      label: "pages.faq.question2",
      content: "pages.faq.answer2",
    },
    {
      label: "pages.faq.question3",
      content: "pages.faq.answer3",
    },
    {
      label: "pages.faq.question4",
      content: "pages.faq.answer4",
    },
  ];

  if (!props.faqsToShow) {
    return data;
  }
  return data.splice(0, props.faqsToShow);
});
</script>

<template>
  <div class="faq-accordions-wrapper">
    <ReusableMyAccordion class="faq-accordion" v-for="faq in faqs" :title="t(faq.label)">
      <p class="faq-accordion-description">{{ t(faq.content) }}</p>
    </ReusableMyAccordion>
  </div>
</template>
<style lang="scss">
.faq-accordions-wrapper {
  margin: 15px;
  .faq-accordion {
    background: $optional-bg;
    border-color: $primary;
    .accordion-title {
      padding: 10px;
    }
    .arrow-down-icon {
      color: $primary;
    }
  }
  .faq-accordion-description {
    font-size: 0.9em;
    margin: 10px;
  }
  @include lg {
    margin: 50px;
    max-width: 800px;
    margin: auto;
    .faq-accordion {
      .accordion-title {
        padding: 10px 20px;
      }
    }
  }
}
</style>
