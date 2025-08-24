<script lang="ts" setup>
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";
// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
// * props
const props = defineProps<{
  categories: any;
  loading?: boolean;
}>();
const { getUrl } = useUrl();
</script>

<template>
  <div class="categories-section-wrapper">
    <ReusableMyPageSmallTitle :title="t('pages.home.categories')" />
    <div v-if="loading" class="categories-section-container">
      <div v-for="i in 4" class="main-category-container">
        <span class="main-category-wrapper">
          <div class="skeleton-loader image-placeholder"></div>
          <p class="skeleton-loader text-placeholder"></p>
        </span>
      </div>
    </div>
    <div v-else class="categories-section-container">
      <div
        v-for="category in categories"
        :key="category.id"
        class="main-category-container"
      >
        <NuxtLink
          :to="localePath(`/category/${category.slug}`)"
          :aria-label="t('pages.links.single_category', { name: category.name })"
          class="main-category-wrapper"
        >
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            width="80px"
            sizes="80px"
            height="80px"
            :src="getUrl(category.icon_url)"
            alt="product-category-icon"
            name="product-category-icon"
          />
          <p>{{ category.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.categories-section-wrapper {
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
.categories-title {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 60px;
  background-color: white;
  h2 {
    font-size: 1.2em;
    color: $gray-icon;
    @include lg {
      font-size: 1.2em;
    }
  }
  @include lg {
    margin-bottom: 30px;
    position: relative;
    top: 0;
  }
}
.categories-section-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  // padding: 0 20px;
}
.category-section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid $border-color;
}
.main-category-container {
  width: 100px;
  margin-top: 5px;
  @include md {
    width: 130px;
  }
  @include lg {
    width: 174px;
    margin-top: 10px;
  }
}
.main-category-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 10px;
  img,
  .image-placeholder {
    width: 80px;
    height: 80px;
  }
  p,
  .text-placeholder {
    font-size: 13px;
    height: 23px;
    color: $gray-title;
  }
  .text-placeholder {
    width: 100%;
  }
  @include lg {
    p,
    .text-placeholder {
      font-size: 15px;
      height: 26px;
    }
    img,
    .image-placeholder {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
