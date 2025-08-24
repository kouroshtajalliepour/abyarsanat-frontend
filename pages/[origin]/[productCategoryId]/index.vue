<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";
import ReusableMyPageNav from "@/components/reusable/myPageNav.vue";
import PagesProducts from "@/components/pages/products/index.vue";

// * composables
const { t } = useI18n();
const productStore = useProductStore();
const localePath = useLocalePath();
const route = useRoute();

// * route validation

const validOrigins = ["search", "brand", "category", "selection"];
const { getProductListPage } = usePageData();

if (!validOrigins.includes(route.params.origin?.toString())) {
  navigateTo("/404");
}

// * store data
const { multiData: products, dataPages: productPages, loading, origin } = storeToRefs(
  productStore
);

// * computed data
const links = computed(() => {
  switch (route.params.origin.toString()) {
    case "category":
      return;
      break;
    case "brand":
      return [
        {
          name: t("pages.products.brand_product_page", {
            brand: origin.value?.name,
          }),
          slug: route.path.toString(),
        },
      ];
      break;
    case "search":
      return [
        {
          name: t("pages.products.searchPageResult", {
            searchResult: route.params.productCategoryId,
          }),
          slug: route.path.toString(),
        },
      ];
      break;
    case "selection":
      return [
        {
          name: t("pages.links.surprisingOffer"),
          slug: route.path.toString(),
        },
      ];
      break;

    default:
      break;
  }
});
const reversedLinks = ref([]);

// * watchers
watch(
  () => route.fullPath,
  async () => {
    // * default
    loadData();
  }
);

// * functions
function linkAddressSanitizer(str: string) {
  return localePath(`/category/${str}`);
}
function linkAreaLabelSanitizer(str: string) {
  return t("pages.links.single_category", { name: str });
}
// * hooks

function loadData() {
  try {
    if (route.path.includes("/category")) {
      getProductListPage("product_category");
      return;
    }
    if (route.path.includes("/brand")) {
      getProductListPage("product_brand");
      return;
    }
    if (route.path.includes("/search")) {
      getProductListPage("search");
      return;
    }
    if (route.path.includes("/selection/special-offer")) {
      getProductListPage("selection_special_offer");
      return;
    }
  } catch (error) {}
}

// * load data function
loadData();
onBeforeMount(() => {
  reversedLinks.value = origin.value?.inheritance?.reverse();
});
onUpdated(() => {
  reversedLinks.value = origin.value?.inheritance?.reverse();
});
</script>

<template>
  <section>
    <ReusableMyPageNav
      :linkAddressSanitizer="
        route.params.origin === 'category' ? linkAddressSanitizer : undefined
      "
      :linkAreaLabelSanitizer="
        route.params.origin === 'category' ? linkAreaLabelSanitizer : undefined
      "
      :links="route.params.origin.toString() === 'category' ? reversedLinks : links"
      linkName="name"
      linkAddress="slug"
    />
    <PagesProducts
      :loading="loading"
      :products="products"
      :indexNumberOrder="route.params.origin === 'selection' ? true : false"
      :maxPrice="
        route.path.includes('/category')
          ? origin?.product_models?.max_price
          : origin?.max_price
      "
      :productCategory="origin"
      :productPages="productPages"
    />
  </section>
</template>

<style lang="scss"></style>
