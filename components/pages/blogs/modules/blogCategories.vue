<script lang="ts" setup>
// * imports
import ChangeableIconsAllArticles from "@/components/changeableIcons/allArticles.vue";
import ChangeableIconsBlogCategoryLoad from "@/components/changeableIcons/blogCategoryLoad.vue";
import ReusableMyNotFound from "@/components/reusable/myNotFound.vue";

// * props & emits
defineProps<{
  value: any;
  blogCategoryPageNumber: any;
  blogCategoryTotalCount: any;
  blogCategoryLoading: any;
  blogCategories: any;
  scroll?: boolean;
}>();
const emit = defineEmits(["loadMoreBlogCategories", "changeModelValue"]);

// * composables
const { t } = useI18n();
const { getUrl } = useUrl();
</script>

<template>
  <div
    :class="
      scroll
        ? 'blog-categories-wrapper custom-scroll-y'
        : 'blog-categories-wrapper no-scroll'
    "
  >
    <div v-if="blogCategoryPageNumber == 1 && blogCategoryLoading">
      <div v-for="item in 20" :key="item" class="blog-category-link">
        <span class="blog-category-link-context">
          <div class="blog-category-image loading skeleton-loader"></div>
          <div class="blog-category-title loading skeleton-loader"></div>
        </span>
      </div>
    </div>
    <div v-else-if="blogCategories && blogCategories.length">
      <div
        @click="emit('changeModelValue', null)"
        :class="['blog-category-link', value == null ? 'active' : '']"
      >
        <span class="blog-category-link-context">
          <ChangeableIconsAllArticles class="all-articles-icon" />
          <p class="blog-category-title">{{ t("pages.blogs.all") }}</p>
        </span>
      </div>
      <div
        @click="emit('changeModelValue', category.id)"
        v-for="category in blogCategories"
        :key="category.id"
        :class="['blog-category-link', value == category.id ? 'active' : '']"
      >
        <span class="blog-category-link-context" to="/user">
          <NuxtImg
            class="blog-category-image"
            :src="getUrl(category.icon_url)"
            alt="blog-category-icon"
            name="blog-category-icon"
            width="22"
            height="22"
            quality="90"
            format="avif,webp"
          />
          <p class="blog-category-title">{{ category.name }}</p>
        </span>
      </div>
      <div
        v-if="blogCategories.length < blogCategoryTotalCount"
        class="blog-category-link"
      >
        <span v-if="blogCategoryLoading" class="blog-category-link-context loading-icon">
          <ChangeableIconsBlogCategoryLoad class="all-articles-icon" />
        </span>
        <span
          v-else
          @click="emit('loadMoreBlogCategories')"
          class="blog-category-link-context"
        >
          <p class="blog-category-title">{{ t("buttons.loadMore") }}</p>
        </span>
      </div>
    </div>

    <ReusableMyNotFound title="pages.notFound.category" v-else />
  </div>
</template>

<style lang="scss">
.blog-categories-wrapper {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  &.no-scroll {
    overflow-y: hidden;
  }
  .blog-category-link {
    border-bottom: 1px solid $gray-bg;
    padding: 12px 10px;
    width: 100%;
    cursor: pointer;

    &:hover,
    &.active {
      background-color: #f1f2f4;
      box-shadow: 0px 0px 3px #00000040;
    }
    .blog-category-link-context {
      display: flex;
      gap: 15px;
      height: 100%;
      align-items: center;
      text-align: center;
      .all-articles-icon {
        width: 22px;
        height: 22px;
        fill: $gray-icon;
      }
      .blog-category-image {
        width: 22px;
        height: 22px;
        overflow: hidden;
        object-fit: contain;
      }
      .blog-category-title {
        height: 22px;
        font-size: 1em;
        .loading {
          width: 100%;
        }
      }
    }
  }
}
</style>
