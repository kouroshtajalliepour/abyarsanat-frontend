<script lang="ts" setup>
// * imports
import ReusableMyPageTitle from "@/components/reusable/myPageTitle.vue";
import ReusableMyInfoBox from "@/components/reusable/myInfoBox.vue";

// * composables
const { t } = useI18n();
const localePath = useLocalePath();

// * data
const terms = ref([
  {
    content: "pages.terms.content1",
  },
  {
    content: "pages.terms.content2",
  },
  {
    content: "pages.terms.content3",
  },
  {
    content: "pages.terms.content4",
  },
  {
    content: "pages.terms.content5",
  },
  {
    content: "pages.terms.content6",
  },
]) as any;
</script>

<template>
  <div>
    <ReusableMyPageTitle title="pages.terms.title" />
    <ReusableMyInfoBox info="pages.terms.description" as="html" />
    <div class="terms-container-wrapper">
      <div class="terms-container">
        <div class="term-wrapper" v-for="term in terms">
          <h5 v-if="term.label">{{ t(term.label) }}</h5>
          <p v-if="term.content" v-html="t(term.content)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.terms-container-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  .terms-container {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    .term-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-top: 1px solid $border-color;
      padding: 30px 0;
    }
    & .term-wrapper:first-child {
      border: none;
    }
  }
  @include lg {
    .terms-container {
      width: 60%;
    }
  }
}
</style>
