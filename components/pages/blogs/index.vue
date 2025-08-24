<script setup lang="ts">
// * imports
import { storeToRefs } from "pinia";
import { useBlogStore } from "@/store/blog";
import PagesBlogsModulesLayout from "./modules/layout.vue";
import PagesBlogsModulesBlogsList from "./modules/blogsList.vue";
import ReusableMyPagination from "@/components/reusable/myPagination.vue";

// * props
const props = defineProps<{
  blogCategories: any;
  blogCategoryLoading: boolean;
  blogCategoryPageNumber: number | string;
  blogCategoryTotalCount: number | string;
  modelValue: string | null;
}>();

const emit = defineEmits(["update:modelValue", "loadMoreBlogCategories"]);

// * composables
const route = useRoute();
const blogStore = useBlogStore();

// * store data
const { multiData: blogs, dataPages: blogPages, loading: blogLoading } = storeToRefs(
  blogStore
);

// * data
const pageNumber = ref(route.query.pageNumber ? Number(route.query.pageNumber) : 1);

// * watchers
watch(
  () => props.modelValue,
  () => {
    (pageNumber.value = 1), window.scrollTo(0, 0);
    navigateTo({
      query: {
        ...route.query,
        selectedBlogCategory: props.modelValue ? props.modelValue : undefined,
      },
    });
  }
);
watch(
  () => pageNumber.value,
  () => {
    window.scrollTo(0, 0);
    navigateTo({ query: { ...route.query, pageNumber: pageNumber.value.toString() } });
  }
);
</script>

<template>
  <PagesBlogsModulesLayout
    :blogCategoryPageNumber="blogCategoryPageNumber"
    :blogCategoryTotalCount="blogCategoryTotalCount"
    :blogCategoryLoading="blogCategoryLoading"
    :blogCategories="blogCategories"
    :scroll="!(blogCategoryPageNumber == 1 && blogCategoryLoading)"
    :value="modelValue"
    @changeModelValue="emit('update:modelValue', $event)"
  >
    <PagesBlogsModulesBlogsList :blogLoading="blogLoading" :blogs="blogs" />
    <ReusableMyPagination
      v-if="blogPages && blogPages.length"
      v-model="pageNumber"
      :pages="blogPages"
    />
  </PagesBlogsModulesLayout>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
