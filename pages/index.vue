<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { usePageStore } from "@/store/page";
import ReusableMySlider from "@/components/reusable/mySlider.vue";
import PagesHomeSurprisingOffer from "@/components/pages/home/surprisingOffer.vue";
import PagesHomeCategories from "@/components/pages/home/categories.vue";
import PagesHomeFourBanners from "@/components/pages/home/fourBanners.vue";
import PagesHomeProductListCarousel from "@/components/pages/home/productListCarousel.vue";
import PagesHomeTwoBanners from "@/components/pages/home/twoBanners.vue";
import PagesHomeBrands from "@/components/pages/home/brands.vue";

// * composables
const { t } = useI18n();
const pageStore = usePageStore();
const { getDefaultPageData } = usePageData();

// * store data
const { page, pageLoading: loading } = storeToRefs(pageStore);

// * data
const topSellerTitle = ref(t("pages.home.bestSelling"));
const newProductsTitle = ref(t("pages.home.newProducts"));

// const loading = ref(true)
// * hooks
getDefaultPageData();
</script>

<template>
  <div class="home-page-container">
    <ReusableMySlider
      :autoPlay="3000"
      :loading="loading"
      url="url"
      alt="image_alt"
      width="400px"
      height="180px"
      sizes="400px sm:500px md:770px lg:950px xl:1200px xxl:1500px"
      url_field="image_url"
      :slides="page?.slides"
      class="home-page-carousel-wrapper"
      preloadAllowed
      pagination
      navigation
    />
    <PagesHomeSurprisingOffer
      :loading="loading"
      :specialOfferProducts="page?.specialOfferProducts"
    />
    <PagesHomeCategories :categories="page?.rootProductCategories" :loading="loading" />
    <PagesHomeFourBanners :banners="page?.banners?.slice(0, 4)" :loading="loading" />
    <PagesHomeProductListCarousel
      :products="page?.topSellerProducts"
      :title="topSellerTitle"
      :loading="loading"
    />
    <PagesHomeTwoBanners :banners="page?.banners?.slice(4)" :loading="loading" />
    <PagesHomeProductListCarousel
      :products="page?.newestProducts"
      :title="newProductsTitle"
      :loading="loading"
    />
    <PagesHomeBrands :loading="loading" :selectedBrands="page?.selectedBrands" />
  </div>
</template>

<style lang="scss">
.home-page-carousel-wrapper {
  height: 180px;
  @include sm {
    height: 227px;
  }
  @include md {
    height: 350px;
  }
  @include lg {
    height: 400px;
  }
  // @include xl {
  //   height: 545px;
  // }
  // @include xxl {
  //   height: 681px;
  // }
}
</style>
