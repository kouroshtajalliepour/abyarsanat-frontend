<script lang="ts" setup>
const localePath = useLocalePath();
const { t } = useI18n();
const { getUrl } = useUrl();

const props = defineProps<{
  subCategories: any;
}>();
</script>

<template>
  <div class="product-categories-wrapper" v-if="subCategories && subCategories.length">
    <h5 class="product-categories-title">{{ t("pages.products.categories") }}</h5>
    <div class="categories-container">
      <div class="category-container" v-for="category in subCategories">
        <NuxtLink
          :to="localePath(`/category/${category.slug}`)"
          :aria-label="t('pages.links.single_category', { name: category.name })"
        >
          <div class="category-image">
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
          </div>
          <div class="category-title">
            <p>{{ category.name }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product-categories-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .product-categories-title {
    display: none;
  }
  .categories-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    .category-container {
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $optional-bg;
      border-radius: 10px;
      padding: 15px;
      width: 160px;
      justify-content: center;
      border: 1px solid $primary;
      // height: 40vw;
      a {
        display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100%;
      }
    }
    .category-image {
      img {
        display: flex;
        width: 50px;
        height: 50px;
        mix-blend-mode: darken;
      }
    }
    .category-title {
      font-size: 0.9em;
    }
    .show-more {
      font-size: 14px;
      color: $gray-icon;
    }
  }
  @include md {
    .categories-container {
      .category-container {
        flex-basis: calc(50% - 10px);
        // height: 30vw;
      }
    }
  }
  @include lg {
    padding: 20px 0;
    border-bottom: 1px solid $border-color;
    .product-categories-title {
      display: block;
    }
    .categories-container {
      .category-container {
        flex-basis: unset;
        padding: 10px;
        width: 200px;
        // height: 143px;
      }
    }
  }
}
</style>
