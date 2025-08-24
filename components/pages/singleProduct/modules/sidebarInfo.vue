<script lang="ts" setup>
// * imports
import SvgGuarantee from "@/components/Svg/guarantee.vue";
import ReusableMyProductAvailable from "@/components/reusable/myProduct/available.vue";
import ReusableMyProductShipmentStatus from "@/components/reusable/myProduct/shipmentStatus.vue";
// * props
const props = defineProps<{
  loading?: boolean;
  selectedModel?: any;
  weight?: string;
}>();
// * composables
const { t } = useI18n();
const { getAmountLeft } = useProduct();
</script>

<template>
  <div class="single-product-page-sidebar-info">
    <div class="single-product-guarantee-info-wrapper sidebar-info">
      <SvgGuarantee class="single-product-guarantee-icon" />
      <p :class="['single-product-guarantee-name', loading ? 'skeleton-loader' : '']">
        <span v-if="!loading">
          {{ selectedModel.product_guaranty_name }}
        </span>
      </p>
    </div>
    <ReusableMyProductAvailable
      class="single-product-availablity-status-wrapper sidebar-info regular-font"
      v-if="loading || getAmountLeft(selectedModel)"
      :leftAmount="getAmountLeft(selectedModel)"
      showIfAvailable
      :loading="loading"
    />
    <p v-else class="single-product-unavailable-description sidebar-info">
      {{ t("pages.products.unavailableDescription") }}
    </p>
    <div class="single-product-shipment-status-wrapper sidebar-info">
      <ReusableMyProductShipmentStatus
        :loading="loading"
        :weight="Number(weight)"
        v-if="getAmountLeft(selectedModel)"
        :price="Number(selectedModel.discounted_price)"
      />
    </div>
    <div
      v-if="!loading && selectedModel.price_is_dynamic && getAmountLeft(selectedModel)"
      class="single-product-dynamic-price-notifier-wrapper sidebar-info"
    >
      <p class="dynamic-price-title">
        {{ t("pages.products.product_is_custom") }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.single-product-page-sidebar-info {
  width: 100%;
  .product-left-amount-text {
    font-size: 0.6em;
    height: 30px;
  }
  .sidebar-info {
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: flex;
    border-bottom: 1px solid $primary;
    width: 100%;
    &.regular-font {
      font-size: 0.8em;
    }
    &:last-child {
      border: none;
    }
  }
  .single-product-guarantee-info-wrapper {
    .single-product-guarantee-name {
      font-size: 1em;
      width: calc(100% - 29px);
      height: 24px;
    }
    .single-product-guarantee-icon {
      width: 24px;
      height: 24px;
      margin-left: 10px;
      path {
        fill: $primary;
      }
    }
  }
  .single-product-unavailable-description {
    border: none;
    font-size: 0.8em;
  }
  .single-product-shipment-status-wrapper {
    padding-bottom: 5px;
  }
  .single-product-dynamic-price-notifier-wrapper {
    .dynamic-price-title {
      font-size: 0.64em;
      color: $secondary;
    }
  }
}
</style>
