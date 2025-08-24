<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <p class="product-cart-availablity-status">
    {{ t("pages.products.unavailable") }}
  </p>
</template>

<style lang="scss">
.product-cart-availablity-status {
  font-size: 0.8em;
  padding: 4px 5px;
  border-radius: 5px;
  background: $gray-bg;
  color: $red;
  border: 1px solid $border-color;
  height: 30px;
}
</style>
