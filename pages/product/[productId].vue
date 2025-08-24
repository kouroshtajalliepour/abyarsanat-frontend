<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";
import ReusableMyPageNav from "@/components/reusable/myPageNav.vue";
import PagesSingleProduct from "@/components/pages/singleProduct/index.vue";

// * composables
const productStore = useProductStore();
const { t } = useI18n();
const localePath = useLocalePath();
const { getSingleProductPage } = usePageData();

// * store data
const { data: product, loading } = storeToRefs(productStore) as any;
// * page data
const reversedLinks = ref([]);

// * functions
function linkAddressSanitizer(str: string) {
  return localePath(`/category/${str}`);
}
function linkAreaLabelSanitizer(str: string) {
  return t("pages.links.single_category", { name: str });
}
// * hooks
getSingleProductPage();
onMounted(() => {
  reversedLinks.value = product.value.inheritance?.slice(1).reverse();
});
</script>

<template>
  <main>
    <ReusableMyPageNav
      class="single-product-nav"
      :linkAddressSanitizer="linkAddressSanitizer"
      :linkAreaLabelSanitizer="linkAreaLabelSanitizer"
      :links="reversedLinks"
      linkName="name"
      linkAddress="slug"
    />
    <article>
      <PagesSingleProduct
        :categoryName="
          product.inheritance && product.inheritance[1].name
            ? product.inheritance[1].name
            : ''
        "
        :product="product"
        :loading="loading"
      />
    </article>
  </main>
</template>

<style lang="scss">
.single-product-nav {
  display: none;
  @include md {
    display: block;
  }
}
</style>
