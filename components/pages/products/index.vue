<script setup lang="ts">
// * imports
import PagesProductsModulesCategoriesList from "./modules/categoriesList.vue";
import PagesProductsModulesLayout from "./modules/layout.vue";
import PagesProductsModulesProductList from "./modules/productList.vue";
import ReusableMyPagination from "@/components/reusable/myPagination.vue";
import ReusableMyHtmlSanitizer from "@/components/reusable/myHtmlSanitizer.vue";

// * composables
const route = useRoute();

// * props

const props = defineProps<{
  products: any;
  productCategory?: any;
  indexNumberOrder?: any;
  loading: boolean;
  maxPrice?: string;
  priceFilterDisabled?: boolean | null;
  topLinkName?: string | null;
  productPages?: any;
  //maxPrice: number
}>();

// * data
const pageNumber = ref(route.query.pageNumber ? Number(route.query.pageNumber) : 1);

// * watchers
watch(
  () => pageNumber.value,
  () => {
    window.scrollTo(0, 0);
    navigateTo({
      query: {
        ...route.query,
        pageNumber: pageNumber.value.toString(),
      },
    });
  }
);
</script>

<template>
  <section class="desktop-sub-categories-list">
    <PagesProductsModulesCategoriesList
      v-if="productCategory?.sub_categories && productCategory?.sub_categories.length"
      :subCategories="productCategory.sub_categories"
    />
  </section>
  <PagesProductsModulesLayout
    :subCategories="productCategory?.sub_categories"
    :brands="productCategory?.product_brands"
    :filterValues="productCategory?.filter_values"
    :indexNumberOrder="indexNumberOrder"
    :filters="productCategory?.filters"
    :maxPrice="maxPrice"
  >
    <PagesProductsModulesProductList :loading="loading" :products="products" />
    <ReusableMyPagination
      v-if="productPages && productPages.length"
      v-model="pageNumber"
      :pages="productPages"
    />
  </PagesProductsModulesLayout>
  <ReusableMyHtmlSanitizer :contents="productCategory?.content" height="125" />
</template>

<style lang="scss">
.desktop-sub-categories-list {
  display: none;
  @include lg {
    display: block;
    padding: 0 20px;
  }
}
</style>
