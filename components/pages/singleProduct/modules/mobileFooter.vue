<script lang="ts" setup>
// * imports
import ReusableMyProductControls from "@/components/reusable/myProduct/controls.vue";

// * props and emits
const props = defineProps<{
  loading?: boolean;
  selectedModel?: any;
  has_multiple_types: any;
  productId: any;
  productName: any;
  categoryName: any;
  models: any;
}>();
const emit = defineEmits(["openModal"]);
</script>

<template>
  <div class="mobile-empty-space"></div>
  <div class="single-product-footer-wrapper">
    <ReusableMyProductControls
      :selectedModel="selectedModel"
      :productId="productId"
      :productName="productName"
      :categoryName="categoryName"
      :has_multiple_types="has_multiple_types"
      :loading="loading"
      :models="models"
      @openModal="emit('openModal')"
    />
  </div>
</template>

<style lang="scss">
.mobile-empty-space {
  height: 71px;
  width: 100%;
  @include lg {
    display: none;
  }
}
.single-product-footer-wrapper {
  position: fixed;
  bottom: 0;
  background-color: $optional-bg;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.14), 0 -2px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid $primary;
  z-index: 4;
  width: 100%;
  height: 65px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .product-price-wrapper {
    .discount-percentage {
      top: 6px;
      left: 135px;
      right: unset;
      bottom: unset;
    }
  }
  &::before {
    content: "";
    bottom: -11px;
    width: calc(100% - 10px);
    height: 10px;
    background-color: $optional-bg;
    position: absolute;
    right: 0;
  }
  @include md {
    // width: 550px;
    // border-radius: 10px;
    // bottom: calc($bottom-of-the-window-xs + 20px);
    // margin: 0 calc((100% - 550px) / 2);
    &::before {
      display: none;
    }
  }
  @include lg {
    display: none;
  }
}
</style>
