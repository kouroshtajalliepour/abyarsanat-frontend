<script setup lang="ts">
// * imports
import PagesHomeProductListCarousel from "@/components/pages/home/productListCarousel.vue";
import PagesSingleBlogModulesRelatedBlogs from "./relatedBlogs.vue";
import ReusableMyNotFound from "@/components/reusable/myNotFound.vue";
// * props & emits
const props = defineProps<{
  blog: any;
  loading: boolean;
}>();
const emit = defineEmits([]);

// * composables
const { t } = useI18n();
</script>

<template>
  <!-- layout -->
  <section class="single-blog-page-wrapper">
    <div class="single-blog-page-section">
      <div>
        <slot />
        <PagesHomeProductListCarousel
          v-if="blog?.suggested_products?.length"
          :products="blog.suggested_products"
          class="mobile-product-suggestions"
          :title="t('pages.blogs.suggestions')"
          :loading="loading"
        />
        <PagesSingleBlogModulesRelatedBlogs
          v-if="blog?.related_blogs?.length"
          :title="t('pages.blogs.relatedBlogs')"
          :blogs="blog.related_blogs"
          :loading="loading"
        />
      </div>
    </div>
    <aside class="single-blog-page-side-bar">
      <PagesHomeProductListCarousel
        v-if="blog?.suggested_products?.length"
        :products="blog.suggested_products"
        :title="t('pages.blogs.suggestions')"
        :loading="loading"
      />
      <ReusableMyNotFound title="pages.notFound.product" v-else />
    </aside>
  </section>
</template>

<style lang="scss">
// * page
.single-blog-page-wrapper {
  .single-blog-page-side-bar {
    margin: 20px;
    margin-right: 0;
    border-radius: 10px;
    border: 1px solid $primary;
    background-color: white;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 340px;
    position: sticky;
    top: calc($top-of-the-window-lg + 5px);
    height: fit-content;
    height: 470px;
    padding: 20px;
    .product-list-carousel-wrapper {
      padding: 0;
    }
  }
  .single-blog-page-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @include md {
    .single-blog-page-section {
      padding: 20px;
    }
  }

  @include lg {
    display: flex;
    flex-direction: row;
    .single-blog-page-side-bar {
      display: flex;
    }
    .single-blog-page-section {
      width: calc(100% - 360px);
      padding-right: 20px;
      margin: 0;
      .mobile-product-suggestions {
        display: none;
        // @include md {
        // }
      }
    }
  }
}
</style>
