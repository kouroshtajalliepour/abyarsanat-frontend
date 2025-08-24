<script lang="ts" setup>
// * imports
import ReusableMySlider from "@/components/reusable/mySlider.vue";
import ChangeableIconsSpecialOfferTag from "@/components/changeableIcons/specialOfferTag.vue";
import PagesSingleProductModulesProperties from "./properties.vue";
import PagesSingleProductModulesModelManagement from "./modelManagement.vue";
import PagesSingleProductModulesSidebarInfo from "./sidebarInfo.vue";

// * props and emits
const props = defineProps<{
  product: any;
  selectedModel: any;
  loading: boolean;
}>();
const emit = defineEmits(["changeModel", "update:selectedModel", "openImagesModal"]);

// * composables
const { t } = useI18n();

// * data
const SelectedModel = ref(props.selectedModel);

// * watchers
watch(
  () => SelectedModel.value,
  () => {
    emit("update:selectedModel", SelectedModel.value);
  }
);
watch(
  () => props.selectedModel,
  () => {
    SelectedModel.value = props.selectedModel;
  }
);

// * computed data
const selectedProperties = computed(() => {
  if (props.product && props.product.properties) {
    return props.product.properties.filter((property: any) => property.selected == true);
  }
  return [];
});
</script>

<template>
  <div class="single-product-information-wrapper">
    <div :class="['product-image-slider-wrapper', loading ? 'skeleton-loader' : '']">
      <ReusableMySlider
        class="slider-wrapper"
        :alt="product.image_alt"
        staticAlt
        url_field="image_url"
        width="220px"
        height="220px"
        sizes="220px"
        v-if="!loading && product.images && product.images.length"
        :slides="product.images"
        :pagination="!!product.images.length"
        preloadAllowed
        @clickOnImage="emit('openImagesModal', $event)"
      />
      <ChangeableIconsSpecialOfferTag v-if="product.product_is_special_offer_product" />
    </div>
    <div class="single-product-information-content-wrapper">
      <h1 :class="['product-content-name', loading ? 'skeleton-loader' : '']">
        <span class="context">
          {{ product.name }}
        </span>
      </h1>
      <div class="product-content-original-name-wrapper">
        <small class="product-content-original-name">
          <span class="context" v-if="!loading">
            {{ product.original_name }}
          </span>
        </small>
      </div>

      <div
        class="selected-properties-wrapper"
        v-if="selectedProperties && selectedProperties.length"
      >
        <h5 class="selected-properties-title">
          <span class="context">
            {{ t("entities.fields.product_properties") }}
          </span>
        </h5>
        <PagesSingleProductModulesProperties :properties="selectedProperties" />
        <PagesSingleProductModulesModelManagement
          :hasMultipleTypes="product.has_multiple_types"
          :priceBasedOn="product.price_based_on"
          :selectedModel="SelectedModel"
          :showModelsAsRadio="product.show_models_as_radio"
          :models="product.models"
          @changeModel="emit('changeModel', $event)"
        />
      </div>
      <PagesSingleProductModulesSidebarInfo
        :loading="loading"
        :weight="product.weight"
        :selectedModel="selectedModel"
        :class="['mobile-sidebar-info', loading ? 'loading' : '']"
      />
    </div>
  </div>
</template>

<style lang="scss">
.single-product-information-wrapper {
  display: flex;
  flex-direction: column;
  z-index: 3;
  .product-image-slider-wrapper {
    width: 100vw;
    height: 100vw;
    max-height: 400px;
    align-self: center;
    position: relative;
    overflow: hidden;
    align-self: flex-start;
    display: flex;
    justify-content: center;

    cursor: pointer;
    .slider-wrapper {
      height: 400px;
      width: 400px;
      .slider-link-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .slider-image {
        height: 220px;
        width: 220px;
      }
    }
  }
  .single-product-information-content-wrapper {
    padding: 20px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    .mobile-sidebar-info {
      margin: 20px 0;
      padding: 20px;
      padding-bottom: 0;
      border-radius: 10px;
      border: 1px solid $primary;
      width: 300px;
      // height: 180px;
      transition: height 0.3 ease-out;
      align-self: center;
      &.loading {
        height: 180px;
      }
    }
    .product-content-name {
      font-size: 1.3em;
      margin-bottom: 10px;
      color: black;
      &.skeleton-loader {
        height: 31px;
      }
    }
    .product-content-original-name-wrapper {
      font-size: 0.7em;
      position: relative;
      display: block;
      background-color: white;
      margin-bottom: 10px;
      &::before {
        content: "";
        width: 100%;
        height: 1px;
        position: absolute;
        top: 50%;
        background-color: $primary;
      }
      .product-content-original-name {
        height: 16px;
        display: inline-block;
        padding-left: 10px;
        position: relative;
        z-index: 2;
        background-color: white;
      }
    }
    .selected-properties-wrapper {
      .selected-properties-title {
        font-size: 1.1em;
        margin-bottom: 10px;
        height: 31px;
        color: black;
        position: relative;
        .context {
          background-color: white;
          display: inline-block;
          position: relative;
          padding-left: 15px;
          z-index: 2;
        }
      }
    }
    .skeleton-loader {
      .context {
        display: none;
      }
    }
  }
  @include md {
    flex-direction: row;
    .product-image-slider-wrapper {
      width: 400px;
      height: unset;
      position: sticky;
      top: $top-of-the-window-xs;
      .slider-wrapper {
        height: 400px;
      }
    }
    .single-product-information-content-wrapper {
      width: calc(100% - 400px);
      padding: 20px;
      .mobile-sidebar-info {
        align-self: flex-start;
      }
    }
  }
  @include lg {
    .product-image-slider-wrapper {
      top: $top-of-the-window-lg;
    }
    .single-product-information-content-wrapper {
      .mobile-sidebar-info {
        display: none;
      }
    }
  }
}
</style>
