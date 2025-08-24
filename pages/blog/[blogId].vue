<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useBlogStore } from "@/store/blog";
import PagesSingleBlog from "@/components/pages/singleBlog/index.vue";
import ReusableMyPageNav from "@/components/reusable/myPageNav.vue";

// * composables
const blogStore = useBlogStore();
const { data: blog, loading } = storeToRefs(blogStore);
const localePath = useLocalePath();
const { t } = useI18n();
const { getSingleBlogPageData } = usePageData();
// * functions
function linkAddressSanitizer(str: string) {
  if (!str) {
    return localePath(`/blog`);
  }
  return localePath(`/blog/${str}`);
}
// * hooks
getSingleBlogPageData();
</script>

<template>
  <main>
    <ReusableMyPageNav
      class="single-product-nav"
      :linkAddressSanitizer="linkAddressSanitizer"
      :links="[
        {
          name: t('pages.blogs.title'),
          slug: '',
        },
        {
          name: blog.title,
          slug: blog.slug,
        },
      ]"
      linkName="name"
      linkAddress="slug"
    />
    <article>
      <PagesSingleBlog :blog="blog" :loading="loading" />
    </article>
  </main>
</template>

<style lang="scss"></style>
