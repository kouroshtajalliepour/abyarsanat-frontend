<script setup lang="ts">
// * imports
import SvgArrowDown from "@/components/Svg/arrowDown.vue";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import PagesBlogsModulesBlogCategories from "./blogCategories.vue";

// * props and emits
const props = defineProps<{
  value: any;
  blogCategoryPageNumber: any;
  blogCategoryTotalCount: any;
  blogCategoryLoading: any;
  blogCategories: any;
  scroll?: boolean;
}>();
const emit = defineEmits(["changeModelValue"]);

// * composables
const { t } = useI18n();

// * data
const blogCategorySelectionIsOpen = ref(false);

// * watchers
watch(
  () => props.value,
  () => {
    blogCategorySelectionIsOpen.value = false;
  }
);
</script>

<template>
  <section class="blogs-page-wrapper">
    <header class="blogs-page-header">
      <button
        class="blog-category-modal-trigger-button"
        :name="t('pages.blogs.categoryTitle')"
        type="button"
        @click="blogCategorySelectionIsOpen = true"
      >
        <span>{{ t("pages.blogs.categoryTitle") }}</span>

        <SvgArrowDown class="arrow-icon" />
      </button>
    </header>
    <ReusableMyModal
      v-model="blogCategorySelectionIsOpen"
      class="app-default-modal-wrapper info-modal"
    >
      <ReusableMyModalHeaderDefault
        :title="t('pages.blogs.categoryTitle')"
        @close="blogCategorySelectionIsOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <PagesBlogsModulesBlogCategories
          :blogCategoryPageNumber="blogCategoryPageNumber"
          :blogCategoryTotalCount="blogCategoryTotalCount"
          :blogCategoryLoading="blogCategoryLoading"
          :blogCategories="blogCategories"
          :scroll="scroll"
          :value="value"
          @changeModelValue="emit('changeModelValue', $event)"
          @close="blogCategorySelectionIsOpen = false"
        />
      </ReusableMyModalBodyDefault>
    </ReusableMyModal>
    <nav class="blogs-page-side-bar">
      <div class="blog-sidebar-header">
        <p>{{ t("pages.blogs.categoryTitle") }}</p>
      </div>
      <PagesBlogsModulesBlogCategories
        :blogCategoryPageNumber="blogCategoryPageNumber"
        :blogCategoryTotalCount="blogCategoryTotalCount"
        :blogCategoryLoading="blogCategoryLoading"
        :blogCategories="blogCategories"
        :scroll="!(blogCategoryPageNumber == 1 && blogCategoryLoading)"
        :value="value"
        @changeModelValue="emit('changeModelValue', $event)"
      />
    </nav>
    <div class="blogs-page-section">
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
.blogs-page-wrapper {
  .blogs-page-header {
    margin-top: 20px;
    padding: 10px 20px;
    position: sticky;
    top: calc($top-of-the-window-xs + 5px);
    z-index: 4;
    .blog-category-modal-trigger-button {
      background-color: white;
      border: 1px solid $border-color;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      font-size: 0.9em;
      .arrow-icon {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
  .blogs-page-side-bar {
    margin: 20px;
    margin-left: 0;
    border-radius: 10px;
    border: 1px solid $border-color;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-basis: 280px;
    position: sticky;
    top: calc($top-of-the-window-lg + 5px);
    height: fit-content;
    height: 500px;
    box-shadow: -1px -1px 2px 0px #00000030, 1px 1px 2px 0px #00000030;
    svg {
      fill: #a1a3a8;
      cursor: pointer;
    }
    > div:last-child {
      border: none;
    }
    .blog-sidebar-header {
      background-color: $primary;
      border-radius: 8px 8px 0 0;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 30px 0;
      p {
        color: white;
        font-size: 19px;
        font-weight: 700;
      }
    }
  }
  .blogs-page-section {
    flex-basis: calc(100% - 280px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  }

  @include lg {
    display: flex;
    flex-direction: row;
    .blogs-page-header {
      display: none;
    }
    .blogs-page-side-bar {
      display: flex;
    }
    .blogs-page-section {
      padding-right: 20px;
      margin: 0;
    }
  }
}
</style>
