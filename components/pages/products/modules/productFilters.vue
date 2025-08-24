<script lang="ts" setup>
// * imports
import ReusableMyInputsSwitch from "@/components/reusable/myInputs/switch.vue";
import ReusableMyAccordion from "@/components/reusable/myAccordion.vue";
import ReusableMyInputsOptionGroup from "@/components/reusable/myInputs/optionGroup.vue";
import ReusableMyInputsText from "@/components/reusable/myInputs/text.vue";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";

// * composables
const { t } = useI18n();
const route = useRoute();
// * props and emits
const props = defineProps<{
  filters: any;
  brands: any;
  filterValues: any;
  maxPrice: any;
}>();

const appliedFilters = ref(getAppliedFilters()) as any;
const appliedBrands = ref(getAppliedBrands()) as any;
const onlyAvailableProducts = ref(route.query.available == "1" ? true : false);
const inputMinPrice = ref(
  route.query.price?.toString().split(",")[0]
    ? Math.floor(Number(route.query.price.toString().split(",")[0]) / 10)
    : ""
);
const inputMaxPrice = ref(
  route.query.price?.toString().split(",")[1]
    ? Math.floor(Number(route.query.price?.toString().split(",")[1]) / 10)
    : ""
);

// * watchers

watch(
  () => appliedFilters.value,
  () => {
    navigateTo({
      query: {
        pageNumber: route.query.pageNumber,
        orderBy: route.query.orderBy,
        available: route.query.available,
        price: route.query.price,
        brands: route.query.brands,
        ...sanitizeAppliedFilters(),
      },
    });
  },
  { deep: true }
);
watch(
  () => appliedBrands.value,
  () => {
    navigateTo({
      query: {
        ...route.query,
        brands: appliedBrands.value?.length ? appliedBrands.value.toString() : undefined,
      },
    });
  },
  { deep: true }
);

watch(
  () => onlyAvailableProducts.value,
  () => {
    navigateTo({
      query: {
        ...route.query,
        available: onlyAvailableProducts.value ? "1" : undefined,
      },
    });
  }
);

watch(
  () => route.query,
  () => {
    window.scrollTo(0, 0);
    const filtersAreCleared = !Object.keys(route.query).some(
      (item) => !["pageNumber", "orderBy"].includes(item)
    );
    if (filtersAreCleared) {
      appliedFilters.value = {};
      onlyAvailableProducts.value = false;
      inputMinPrice.value = "";
      inputMaxPrice.value = "";
    }
  }
);

watch(
  () => [inputMinPrice.value, inputMaxPrice.value],
  () => {
    navigateTo({
      query: {
        ...route.query,
        price: [
          inputMinPrice.value ? Number(inputMinPrice.value) * 10 : "0",
          inputMaxPrice.value ? Number(inputMaxPrice.value) * 10 : props.maxPrice,
        ].toString(),
      },
    });
  }
);

// * functions
function getProductCategoryFilterValues(filterId: string) {
  return props.filterValues.filter((values: any) => {
    return values.product_category_filter_id === filterId;
  });
}
function getAppliedFilters() {
  const Filters = {} as any;
  for (let i = 0; i < Object.keys(route.query).length; i++) {
    const q = Object.keys(route.query)[i];
    const qv = Object.values(route.query)[i] as any;

    if (q.includes("filters")) {
      const filterId = q.split("[f-")[1].split("]")[0];
      Filters[filterId] = qv.split(",").map((item: string | number) => {
        return Number(item);
      });
    }
  }
  return Filters;
}
function getAppliedBrands() {
  let brands = [] as any;

  if (route.query.brands) {
    brands = route.query.brands
      .toString()
      .split(",")
      .map((item: string | number) => {
        return Number(item);
      });
  }

  return brands;
}
function sanitizeAppliedFilters() {
  const query = {} as any;
  if (appliedFilters.value && Object.keys(appliedFilters.value).length) {
    for (let i = 0; i < Object.keys(appliedFilters.value).length; i++) {
      const filter = Object.keys(appliedFilters.value)[i];
      const filterValue = Object.values(appliedFilters.value)[i] as any;

      if (filterValue && filterValue.length) {
        query[`filters[f-${filter}]`] = filterValue.toString();
      }
    }
  } else {
    query.filters = undefined;
  }
  return query;
}

onUpdated(() => {
  appliedBrands.value = getAppliedBrands();
});
</script>

<template>
  <div class="products-filters-wrapper">
    <ReusableMyInputsSwitch
      v-model="onlyAvailableProducts"
      class="products-switch-input-wrapper"
      id="1"
      :title="t('pages.products.justAvailableProducts')"
    />
    <ReusableMyAccordion
      v-if="brands && brands.length"
      :title="t('pages.products.brands')"
    >
      <div class="products-filters-checkbox-inputs-wrapper">
        <ReusableMyInputsOptionGroup
          id="99"
          v-model="appliedBrands"
          :options="brands"
          multiple
          :optionsAsObject="{
            key: 'serial_id',
            value: 'name',
          }"
        />
      </div>
    </ReusableMyAccordion>
    <ReusableMyAccordion v-for="(filter, index) in filters" :title="filter.name">
      <div class="products-filters-checkbox-inputs-wrapper">
        <ReusableMyInputsOptionGroup
          :id="index"
          v-model="appliedFilters[filter.serial_id]"
          :options="getProductCategoryFilterValues(filter.id)"
          multiple
          :optionsAsObject="{
            key: 'serial_id',
            value: 'name',
          }"
        />
      </div>
    </ReusableMyAccordion>
    <ReusableMyAccordion :title="t('pages.products.priceRange')">
      <div class="product-price-input-wrapper">
        <p>{{ t("pages.products.from") }}</p>
        <ReusableMyInputsText
          :delay="1000"
          type="number"
          placeholder="0"
          dir="ltr"
          inputmode="numeric"
          autocomplete="off"
          v-model="inputMinPrice"
        />
        <ReusableMyCurrency />
      </div>
      <div class="product-price-input-wrapper">
        <p>{{ t("pages.products.to") }}</p>
        <ReusableMyInputsText
          :placeholder="maxPrice"
          :delay="1000"
          type="number"
          autocomplete="off"
          dir="ltr"
          inputmode="numeric"
          v-model="inputMaxPrice"
        />
        <ReusableMyCurrency class="currency-wrapper" />
      </div>
    </ReusableMyAccordion>
  </div>
</template>

<style lang="scss">
.products-filters-wrapper {
  width: 100%;
  .accordion-wrapper {
    border-color: $primary;
    .arrow-down-icon {
      color: $primary;
    }
  }
  .products-filters-checkbox-inputs-wrapper {
    margin-bottom: 10px;
  }
  .products-switch-input-wrapper {
    border: 1px solid $primary;
    border-radius: 10px;
    height: 50px;
    margin-bottom: 10px;
    padding: 12px 10px;
  }
  .product-price-input-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 5px;
  }
}
</style>
