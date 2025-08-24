<script setup lang="ts">
// * imports
import PagesProductsModulesCategoriesList from "./categoriesList.vue";
import PagesProductsModulesProductFilters from "./productFilters.vue";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import ReusableMyModalFooterSubmitButton from "@/components/reusable/myModal/footer/submitButton.vue";
import ReusableMyInputsOptionGroup from "@/components/reusable/myInputs/optionGroup.vue";
import SvgFilter from "@/components/Svg/filter.vue";
import SvgCategories from "@/components/Svg/categories.vue";
import SvgSort from "@/components/Svg/sort.vue";
import SvgXMark from "@/components/Svg/xMark.vue";
import ReusableMyInputsSelect from "@/components/reusable/myInputs/select.vue";
// * props and emits
const props = defineProps<{
  filterValues: any;
  filters: any;
  maxPrice: any;
  subCategories: any;
  brands: any;
  indexNumberOrder?: boolean;
}>();
const emit = defineEmits(["changeModelValue"]);

// * composables
const { t } = useI18n();
const route = useRoute();

// * data
const productSortsSelect = ref(null) as any;
const productFilterModalIsOpen = ref(false);
const productCategoryModalIsOpen = ref(false);
const productSortModalIsOpen = ref(false);
const filtersAreApplied = ref(false);
const selectedSort = ref(
  route.query.orderBy
    ? route.query.orderBy.toString()
    : props.indexNumberOrder
    ? "product_is_special_offer_product asc"
    : "created_at desc"
);

const options = ref([
  "created_at desc",
  "discounted_price asc",
  "soled_amount desc",
  "discounted_price desc",
]);

// * hooks

onMounted(() => {
  if (props.indexNumberOrder) {
    options.value.unshift("product_is_special_offer_product asc");
  }

  filtersAreApplied.value = getFiltersAreApplied();
});

onUpdated(() => {
  filtersAreApplied.value = getFiltersAreApplied();
});

// * watchers

watch(
  () => selectedSort.value,
  () => {
    navigateTo({ query: { ...route.query, orderBy: selectedSort.value } });
  }
);

watch(
  () => route.query,
  () => {
    productCategoryModalIsOpen.value = false;
    productSortModalIsOpen.value = false;
  }
);

// * functions
function format(text: string) {
  return t(`entities.values.product_sorts.${text}`);
}

function clearFilters() {
  navigateTo({
    query: {
      orderBy: route.query.orderBy ? route.query.orderBy : undefined,
      pageNumber: route.query.pageNumber ? route.query.pageNumber : undefined,
    },
  });
}
function getFiltersAreApplied() {
  const minPrice =
    route.query.price && route.query.price.toString().split(",")[0]
      ? Number(route.query.price.toString().split(",")[0])
      : 0;
  const maxPrice =
    route.query.price && route.query.price.toString().split(",")[1]
      ? Number(route.query.price.toString().split(",")[1])
      : 0;
  if (
    !!(minPrice && minPrice != 0) ||
    !!(maxPrice && maxPrice != Number(props.maxPrice)) ||
    route.query.available ||
    route.query.brands ||
    Object.keys(route.query).some((str) => str.includes("filters") && route.query[str])
  ) {
    return true;
  }

  return false;
}
</script>

<template>
  <section class="products-page-layout-wrapper">
    <ReusableMyModal
      v-model="productFilterModalIsOpen"
      class="app-default-modal-wrapper product-filters-modal"
    >
      <ReusableMyModalHeaderDefault
        :title="t('pages.products.filters')"
        @close="productFilterModalIsOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <PagesProductsModulesProductFilters
          :filterValues="filterValues"
          :filters="filters"
          :brands="brands"
          :maxPrice="maxPrice"
        />
      </ReusableMyModalBodyDefault>
      <ReusableMyModalFooterSubmitButton
        :title="t('buttons.submit')"
        @submit="productFilterModalIsOpen = false"
      />
    </ReusableMyModal>
    <ReusableMyModal
      v-model="productCategoryModalIsOpen"
      class="app-default-modal-wrapper info-modal"
    >
      <ReusableMyModalHeaderDefault
        :title="t('pages.products.categories')"
        @close="productCategoryModalIsOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <PagesProductsModulesCategoriesList
          @click="productCategoryModalIsOpen = false"
          :subCategories="subCategories"
        />
      </ReusableMyModalBodyDefault>
    </ReusableMyModal>
    <ReusableMyModal
      v-model="productSortModalIsOpen"
      class="app-default-modal-wrapper info-modal"
    >
      <ReusableMyModalHeaderDefault
        :title="t('pages.products.orderBy')"
        @close="productSortModalIsOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <ReusableMyInputsOptionGroup
          id="1"
          v-model="selectedSort"
          :format="format"
          :options="options"
        />
      </ReusableMyModalBodyDefault>
    </ReusableMyModal>
    <header class="products-page-mobile-header">
      <div class="products-page-header-buttons-wrapper">
        <button
          @click="productFilterModalIsOpen = true"
          class="product-page-header-button"
          :name="t('pages.products.filters')"
          type="button"
        >
          <SvgFilter class="product-page-header-button-icon" />
          {{ t("pages.products.filters") }}
        </button>
        <button
          @click="productCategoryModalIsOpen = true"
          class="product-page-header-button"
          :name="t('pages.products.categories')"
          v-if="subCategories && subCategories.length"
          type="button"
        >
          <SvgCategories class="product-page-header-button-icon" />
          {{ t("pages.products.categories") }}
        </button>
        <button
          @click="productSortModalIsOpen = true"
          class="product-page-header-button"
          :name="t(`entities.values.product_sorts.${selectedSort}`)"
          type="button"
        >
          <SvgSort class="product-page-header-button-icon" />
          {{ t(`entities.values.product_sorts.${selectedSort}`) }}
        </button>
        <button
          v-if="filtersAreApplied"
          @click="clearFilters"
          class="delete-filters-button"
          :name="t('pages.products.deleteFilters')"
          type="button"
        >
          <SvgXMark class="x-mark" />
          {{ t("pages.products.deleteFilters") }}
        </button>
      </div>
    </header>

    <div class="products-page-side-bar">
      <h5 class="products-page-side-bar-title">{{ t("pages.products.filters") }}</h5>
      <button
        v-if="filtersAreApplied"
        @click="clearFilters"
        :name="t('pages.products.deleteFilters')"
        type="button"
        class="delete-filters-button"
      >
        <SvgXMark class="x-mark" />
        {{ t("pages.products.deleteFilters") }}
      </button>
      <PagesProductsModulesProductFilters
        :filterValues="filterValues"
        :filters="filters"
        :brands="brands"
        :maxPrice="maxPrice"
      />
    </div>
    <div class="products-page-section">
      <header
        class="user-layout-wrapper-header products-desktop-header"
        @click.self="productSortsSelect.close()"
      >
        <h5 @click="productSortsSelect.close()" class="user-layout-wrapper-header-title">
          {{ t("pages.products.orderBy") }}
        </h5>
        <div class="orders-sort-wrapper">
          <ReusableMyInputsSelect
            ref="productSortsSelect"
            v-model="selectedSort"
            :format="format"
            :options="options"
          />
        </div>
      </header>

      <slot @click="productSortsSelect.close()" />
    </div>
  </section>
</template>

<style lang="scss">
.product-filters-modal {
  .modal-body {
    height: calc(100% - 62px - 62px);
  }
}
.products-page-layout-wrapper {
  .delete-filters-button {
    font-size: 13px;
    background-color: $red;
    display: flex;
    align-items: center;
    color: white;
    padding: 1px 3px;
    border-radius: 5px;
    position: absolute;
    height: 25px;
    top: -15px;
    right: 0;
    font-size: 0.6em;
    .x-mark {
      width: 14px;
      height: 14px;
    }
  }
  .products-page-mobile-header {
    padding: 0 20px;
    position: sticky;
    top: $top-of-the-window-xs;
    background-color: $optional-bg;
    z-index: 3;
    .products-page-header-buttons-wrapper {
      display: flex;
      padding: 10px 0;
      position: relative;
      justify-content: space-between;
      border-bottom: 1px solid $primary;
      .product-page-header-button {
        display: flex;
        align-items: center;
        font-size: 0.8em;
        .product-page-header-button-icon {
          width: 20px;
          margin-left: 5px;
          height: 20px;
        }
      }
    }
  }
  .products-page-side-bar {
    margin: 20px;
    margin-left: 0;
    border-radius: 10px;
    border: 1px solid $primary;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: auto;
    background-color: $optional-bg;
    flex-basis: 300px;
    padding: 20px;
    position: sticky;
    top: calc($top-of-the-window-lg + 5px);
    height: fit-content;
    min-height: 500px;
    max-height: calc(100vh - 110px);
    .products-page-side-bar-title {
      padding-bottom: 20px;
      font-size: 1.2em;
    }
    .product-sidebar-header {
      background-color: $primary;
      border-radius: 8px 8px 0 0;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 30px 0;
      p {
        color: white;
        font-size: 19px;
        font-weight: 700;
      }
    }
  }
  .products-page-section {
    flex-basis: calc(100% - 300px);
    padding: 0 20px;
    margin-top: 10px;
    .orders-sort-wrapper {
      .input-select-title,
      .input-select-options-wrapper,
      .input-select-option {
        border-color: $primary;
      }
    }
    .products-desktop-header {
      display: none;
      margin: 0;
      margin-bottom: 20px;
      justify-content: flex-start;
      gap: 10px;
    }
  }

  @include md {
    .products-page-section {
      padding: 20px;
    }
  }

  @include lg {
    display: flex;
    flex-direction: row;
    .delete-filters-button {
      top: 20px;
      right: unset;
      left: 20px;
      font-size: 0.7em;
      padding: 15px 8px;
      .x-mark {
        font-size: 24px;
        margin-left: 5px;
        font-size: 24px;
      }
    }
    .products-page-mobile-header {
      display: none;
    }
    .products-page-side-bar {
      display: flex;
    }
    .products-page-section {
      margin: 0;
      .products-desktop-header {
        display: flex;
      }
    }
  }
}
</style>
