<script setup lang="ts">
import SvgArrowRight from "@/components/Svg/arrowRight.vue";
import LayoutsHeaderModulesAppSearch from "@/components/layouts/headerModules/appSearch.vue";
</script>

<template>
  <nav class="product-list-nav-wrapper">
    <div class="product-list-nav">
      <button name="back-button" class="product-list-navigation" @click="$router.back()">
        <SvgArrowRight class="passive-icon" />
      </button>
      <LayoutsHeaderModulesAppSearch :minimal="true" />
    </div>
  </nav>
</template>

<style lang="scss">
.product-list-nav-wrapper {
  width: 100%;
  height: 60px;
  .product-list-nav {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 17px 20px;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: $optional-bg;
    border-bottom: 1px solid $primary;
    z-index: 5;
    .passive-icon {
      width: 24px;
      height: 24px;
      color: black;
    }
  }
}
</style>
