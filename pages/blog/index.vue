<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useBlogCategoryStore } from "@/store/blog-category";
import PagesBlogs from "@/components/pages/blogs/index.vue";

// * composables
const blogCategoryStore = useBlogCategoryStore();
const route = useRoute();
const { locale } = useI18n();
const { getBlogsPageData } = usePageData();

const {
  multiData: blogCategories,
  recordsFound: blogCategoryTotalCount,
  loading: blogCategoryLoading,
} = storeToRefs(blogCategoryStore);

// * data

const blogCategoryPageNumber = ref(1);
const selectedBlogCategory = ref(
  route.query.selectedBlogCategory ? route.query.selectedBlogCategory : null
) as any;

// * hooks
getBlogsPageData();
await useAsyncData(
  "blog-categories",
  () => {
    return blogCategoryStore.getMultiData({
      lang: locale.value,
      dataResult: "result",
      dataCountResult: "totalCount",
      preDefined: {},
      url: "/public/blog/blog-category",
      pageNumber: blogCategoryPageNumber.value,
      query: {
        pageNumber: blogCategoryPageNumber.value,
      },
      pageSize: 20,
      keepOldData: blogCategoryPageNumber.value == 1 ? false : true,
    });
  },
  {
    watch: [blogCategoryPageNumber],
  }
);

// * functions
function loadMoreBlogCategories() {
  blogCategoryPageNumber.value = blogCategoryPageNumber.value + 1;
}
</script>

<template>
  <section>
    <PagesBlogs
      :blogCategories="blogCategories"
      v-model="selectedBlogCategory"
      :blogCategoryLoading="blogCategoryLoading"
      :blogCategoryPageNumber="blogCategoryPageNumber"
      :blogCategoryTotalCount="blogCategoryTotalCount"
      @loadMoreBlogCategories="loadMoreBlogCategories"
    />
  </section>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
