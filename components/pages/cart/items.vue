<script setup lang="ts">
// * imports
import ReusableMyProductPriceSanitizer from "@/components/reusable/myProduct/priceSanitizer.vue";
import ReusableMyProductCartController from "@/components/reusable/myProduct/cartController.vue";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";

// * props and emits
const props = defineProps<{
  cartItems?: any;
}>();
const emit = defineEmits(["decay", "increase", "updateQuantity"]);

// * composables
const { t } = useI18n();
const { sanitizeTotalPrice } = useProduct();
const { getUrl } = useUrl();

// * functions
function updateQuantity(e: any, product: any) {
  emit("updateQuantity", { model_id: product.model_id, quantityToUpdate: e });
}
</script>

<template>
  <div class="cart-items-wrapper" v-if="cartItems?.length">
    <div class="cart-item" v-for="product in cartItems" :key="product.model_id">
      <figure class="cart-item-image-wrapper">
        <!-- <button type="button" @click="cartStore.removeItemFromCart(product.model_id)" aria-label="delete-button"><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/></svg></button> -->
        <NuxtLink class="product-image-link" :to="`/product/${product.slug}`">
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            width="120px"
            sizes="120px"
            height="120px"
            v-if="product.image_url || product.model_image_url"
            :src="
              getUrl(
                product.model_image_url ? product.model_image_url : product.image_url
              )
            "
            alt="product-picture"
            name="product-picture"
            class="product-picture"
            :imgAttrs="{ class: 'product-image' }"
          />
        </NuxtLink>
      </figure>
      <div class="cart-item-content-wrapper">
        <p class="cart-item-title">
          {{ product.name }}
          <span v-if="product.has_multiple_types" class="cart-item-title"
            >({{ product.price_based_on }} : {{ product.model_name }})</span
          >
        </p>
        <div class="cart-item-price-wrapper">
          <ReusableMyProductPriceSanitizer
            :priceIsDynamic="product.price_is_dynamic"
            disablePercentage
            :price="product.price"
            :discountedPrice="product.discounted_price"
          />
        </div>
        <div class="product-cart-controller-wrapper">
          <ReusableMyProductCartController
            :available="product.available_amount"
            :frozen="product.frozen_amount_in_warehouse"
            :max="product.max_amount_purchaseable"
            @decay="emit('decay', product.model_id)"
            @increase="emit('increase', product.model_id)"
            @updateQuantity="updateQuantity($event, product)"
            :productModel="product"
          />
        </div>
        <div class="cart-item-total-price-wrapper">
          <p v-if="!product.price_is_dynamic" class="cart-item-total-price">
            <span>{{ t("pages.product.totalPrice") }}:</span>
            {{ sanitizeTotalPrice(product.discounted_price, product.qty) }}
            <ReusableMyCurrency />
          </p>
          <p v-else class="cart-item-total-price">
            <span>{{ t("pages.products.priceIsDynamicTitle") }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-items-wrapper {
  width: 100%;

  .cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $border-color;
    padding: 20px 10px;
    gap: 30px;

    .cart-item-price-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      flex-basis: 30%;
      margin: 5px 0;
      height: 50px;
    }

    .cart-item-image-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 30vw;
      width: 30vw;
      .product-image-link {
        height: 100%;
        width: 100%;
        .product-picture {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          .product-image {
            width: 120px;
            height: 120px;
          }
        }
      }
    }

    .cart-item-content-wrapper {
      display: flex;
      width: calc(100% - 40px - 30vw);
      color: $text-color;
      flex-direction: column;
      gap: 6px;
      .cart-item-title {
        font-size: 13px;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        flex-basis: 30%;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 5px 0;
        display: -webkit-box;
      }

      .product-cart-controller-wrapper {
        flex-basis: 30%;
        display: flex;
      }

      .cart-item-total-price-wrapper {
        flex-basis: 22%;
        display: flex;
        justify-content: flex-end;
        .cart-item-total-price {
          font-size: 1em;
          font-weight: 400;
        }
      }
      p {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
      }
    }
  }
  @include lg {
    min-height: $full-window-lg;
    .cart-item {
      gap: 8px;
      border: 1px solid $primary;
      background-color: $optional-bg;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 10px 20px;
      .cart-item-price-wrapper {
        align-items: center;
      }
      .cart-item-image-wrapper {
        gap: 0;
        flex-direction: row;
        height: 120px;
        width: 120px;
      }
      .cart-item-content-wrapper {
        flex-direction: row;
        align-items: center;
        width: calc(100% - 40px - 120px);
        gap: 0;
        .cart-item-title {
          max-width: 150px;
          font-size: 14px;
          margin-right: 10px;
        }
        .product-cart-controller-wrapper {
          justify-content: center;
        }
        p {
          font-size: 15px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
