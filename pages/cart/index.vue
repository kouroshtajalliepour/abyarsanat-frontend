<script lang="ts" setup>
import PagesCart from "@/components/pages/cart/index.vue";
const { getCartPageData } = usePageData();
// * hooks
getCartPageData();
</script>

<template>
  <main class="cart-page-outer-wrapper">
    <ClientOnly>
      <PagesCart />
    </ClientOnly>
  </main>
</template>
<style lang="scss">
.cart-page-outer-wrapper {
  min-height: calc(100vh - $top-of-the-window-lg);
}
</style>
