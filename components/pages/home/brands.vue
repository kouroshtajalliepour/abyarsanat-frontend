<script lang="ts" setup>
// * imports
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";
import ReusableMyCarousel from "@/components/reusable/myCarousel.vue";
// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
// * props
const props = defineProps<{
  selectedBrands: any;
  loading?: boolean;
}>();
const { getUrl } = useUrl();
</script>

<template>
  <div class="brand-carousel-wrapper">
    <ReusableMyPageSmallTitle :title="t('pages.home.selectedBrands')" />
    <div v-if="loading" class="brand-carousel">
      <ReusableMyCarousel
        :loading="true"
        class="brand-carousel-items"
        :scrollAmount="200"
        :gap="5"
      >
        <div class="brand-carousel-item-wrapper" v-for="i in 15">
          <NuxtLink class="brand-carousel-item">
            <div class="brand-carousel-item-image loading skeleton-loader"></div>
          </NuxtLink>
        </div>
      </ReusableMyCarousel>
    </div>
    <div v-else-if="selectedBrands && selectedBrands.length" class="brand-carousel">
      <ReusableMyCarousel class="brand-carousel-items" :scrollAmount="200" :gap="5">
        <figure
          class="brand-carousel-item-wrapper"
          v-for="brand in selectedBrands"
          :key="brand.id"
        >
          <NuxtLink
            class="brand-carousel-item"
            :to="localePath(`/brand/${brand.slug}`)"
            :aria-label="t('pages.links.brand', { name: brand.name })"
          >
            <NuxtPicture
              format="avif,webp"
              densities="x1 x2"
              quality="80"
              width="150px"
              sizes="150px md:200px"
              height="75px"
              :src="getUrl(brand.icon_url)"
              :alt="brand.name"
              :name="brand.name"
              :imgAttrs="{ class: 'brand-carousel-item-image' }"
            />
          </NuxtLink>
        </figure>
      </ReusableMyCarousel>
    </div>
  </div>
</template>

<style lang="scss">
.brand-carousel-wrapper {
  .brand-carousel-title {
    margin: 0 10px;
    margin-top: 10px;
  }
  .brand-carousel {
    // display: flex;
    // padding-top: 20px;
    // padding-bottom: 20px;
    // justify-content: space-between;
    // flex-wrap: wrap;
    // align-items: center;
    // gap: 20px;
    .brand-carousel-items {
      .brand-carousel-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 75px;
        box-shadow: 0 1px 1px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 10%);
        margin: 10px 0px;
        .brand-carousel-item-image {
          width: 100%;
          height: 100%;
          &.loading {
            width: 50%;
            height: 50%;
          }
        }
      }
      > :first-child {
        .brand-carousel-item {
          margin-right: 10px;
        }
      }
      > :last-child {
        .brand-carousel-item {
          margin-left: 10px;
        }
      }
    }
  }

  @include lg {
    .brand-carousel-title {
      margin: 0 30px;
      margin-top: 30px;
    }
    .brand-carousel {
      padding: 20px 30px 10px;
      gap: 0;
      .brand-carousel-items {
        .brand-carousel-item {
          width: 200px;
          height: 100px;
          .brand-carousel-item-image {
            display: block;
          }
        }
      }
    }
  }
}
</style>
