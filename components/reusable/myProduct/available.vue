<script lang="ts" setup>
const props = defineProps<{
  leftAmount: any;
  showIfAvailable?: boolean;
  loading?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <p v-if="loading" class="product-left-amount-text">
    <span class="left-amount-context skeleton-loader"></span>
  </p>
  <p v-else-if="leftAmount" class="product-left-amount-text">
    <span class="left-amount-notifier left-amount-context" v-if="Number(leftAmount) <= 3">
      {{
        t("pages.products.getLeftAmount", {
          leftAmount: leftAmount,
        })
      }}
    </span>
    <span class="is-available-notifier left-amount-context" v-else-if="showIfAvailable">
      {{ t("pages.products.product_is_available") }}
    </span>
  </p>
</template>

<style lang="scss">
.product-left-amount-text {
  font-size: 0.6em;
  height: 18px;
  .left-amount-context {
    height: 19px;
    &.skeleton-loader {
      width: 100%;
      display: block;
    }
    &.left-amount-notifier {
      color: $red;
    }
    &.is-available-notifier {
      color: $green;
    }
  }
}
</style>
