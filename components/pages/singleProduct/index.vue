<script lang="ts" setup>
// * imports
import { useCartStore } from "@/store/user/cart";
import PagesSingleProductModulesLayout from "./modules/layout.vue";
import PagesSingleProductModulesInformation from "./modules/information.vue";
import PagesSingleProductModulesTabs from "./modules/tabs.vue";
import ReusableWidgets from "@/components/reusable/widgets.vue";
import PagesHomeProductListCarousel from "@/components/pages/home/productListCarousel.vue";

// * composables
const { t } = useI18n();
const localePath = useLocalePath();

const cartStore = useCartStore();

// * props
const props = defineProps<{
  product: any;
  categoryName: string;
  loading: boolean;
}>();

// * data
const singleProductLayout = ref(null) as any;
const selectedModel = ref(getSelectedModel());

// * watchers
watch(
  () => props.product,
  () => {
    selectedModel.value = getSelectedModel();
  }
);

// * data

function getSelectedModel() {
  if (props.product.models && props.product.models.length) {
    const availableModel = props.product.models.filter((model: any) => {
      return (
        Number(model.available_amount) - Number(model.frozen_amount_in_warehouse) > 0
      );
    })[0];

    if (availableModel) {
      return availableModel;
    }
    return props.product.models[0];
  } else {
    return {};
  }
}
function changeModel(e: any) {
  if (props.product.models && props.product.models.length) {
    selectedModel.value = e;
  }
}

// * hooks
onMounted(() => {
  cartStore.handleProductView({
    item_id: props.product.id,
    item_name: props.product.name,
    item_category: props.categoryName,
  });
});
</script>

<template>
  <PagesSingleProductModulesLayout
    ref="singleProductLayout"
    :product="product"
    :selectedModel="selectedModel"
    :categoryName="categoryName"
    :loading="loading"
  >
    <PagesSingleProductModulesInformation
      :product="product"
      :loading="loading"
      :selectedModel="selectedModel"
      @openImagesModal="singleProductLayout.openImageModal($event)"
      @changeModel="changeModel($event)"
    />
    <PagesSingleProductModulesTabs :product="product" />

    <ReusableWidgets />
    <section class="single-product-related-product">
      <PagesHomeProductListCarousel
        v-if="product.related_products?.length"
        :products="product.related_products"
        :title="t('pages.product.relatedProducts')"
      />
    </section>
  </PagesSingleProductModulesLayout>
</template>

<style lang="scss">
.single-product-related-product {
  border-top: 1px solid $primary;
  width: 100%;
}
</style>
