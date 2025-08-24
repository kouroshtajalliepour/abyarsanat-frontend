<script lang="ts" setup>
// * imports
import SvgActiveTruck from "@/components/Svg/activeTruck.vue";
// * props
const props = defineProps<{
  weight?: number;
  price?: number;
  loading?: boolean;
}>();

// * composables
const { t } = useI18n();

// * data
const {
  public: { free_shipment_price, free_shipment_wight_limiter },
} = useRuntimeConfig();

// * functions
const productIsFreeShipment = computed(() => {
  return !!(
    props.weight &&
    props.price &&
    props.weight < free_shipment_wight_limiter &&
    props.price > free_shipment_price
  );
});
</script>

<template>
  <p v-if="loading" class="product-shipment-status skeleton-loader"></p>
  <p v-else class="product-shipment-status">
    <SvgActiveTruck class="shipment-icon" />
    <span v-if="productIsFreeShipment">
      {{ t("pages.products.free_shipment_tag") }}
    </span>
    <span v-else>
      {{ t("pages.products.not_free_shipment") }}
    </span>
  </p>
</template>

<style lang="scss">
.product-shipment-status {
  display: inline-flex;
  align-items: center;
  font-size: 0.6em;
  padding: 3px 5px;
  border-radius: 5px;
  white-space: nowrap;
  background: $gray-bg;
  height: 26px;
  width: 90px;
  .shipment-icon {
    margin-left: 5px;
    color: $primary;
    width: 20px;
    height: 20px;
  }
}
</style>
