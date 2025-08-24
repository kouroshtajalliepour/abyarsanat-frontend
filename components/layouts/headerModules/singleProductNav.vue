<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/user/cart";
import { useProductStore } from "@/store/product";
import SvgArrowRight from "@/components/Svg/arrowRight.vue";
import SvgActiveHome from "@/components/Svg/activeHome.vue";
import SvgActiveShoppingCart from "@/components/Svg/activeShoppingCart.vue";

// * composables
const localePath = useLocalePath();
const { t } = useI18n();
const cartStore = useCartStore();
const productStore = useProductStore();

// * store data
const { cartItems } = storeToRefs(cartStore);
const { data } = storeToRefs(productStore);
</script>

<template>
  <nav class="single-product-nav-wrapper">
    <div class="single-product-nav">
      <div class="single-product-link-wrapper">
        <button
          name="back-button"
          @click="navigateTo(localePath(`/category/${data.product_category?.slug}`))"
        >
          <SvgArrowRight class="passive-icon" />
        </button>
        <NuxtLink :to="localePath('/')" :aria-label="t('pages.links.home')">
          <SvgActiveHome class="passive-icon" />
        </NuxtLink>
      </div>
      <div class="single-product-link-wrapper">
        <NuxtLink :to="localePath('/cart')" :aria-label="t('pages.links.cart')">
          <SvgActiveShoppingCart
            :cartItems="cartItems"
            class="passive-icon active-tags"
          />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.single-product-nav-wrapper {
  width: 100%;
  height: 60px;
  .single-product-nav {
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
    .single-product-link-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      .passive-icon {
        display: block;
        width: 24px;
        height: 24px;
      }
      button {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
