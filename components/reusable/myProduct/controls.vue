<script lang="ts" setup>
// * imports
import { useCartStore } from "@/store/user/cart";
import ReusableMyProductPriceSanitizer from "./priceSanitizer.vue";
import ReusableMyProductUnavailable from "./unavailable.vue";
import ReusableMyProductCartController from "./cartController.vue";

// * props
const props = defineProps<{
  selectedModel: any;
  has_multiple_types: any;
  models: any;
  loading?: boolean;
  productId: any;
  productName: any;
  categoryName: any;
}>();
const emit = defineEmits(["openModal"]);

// * composables
const {
  public: { openProductModel },
} = useRuntimeConfig();
const cartStore = useCartStore();
const { t } = useI18n();
const localePath = useLocalePath();

// * functions
const productInCart = computed(() => {
  return cartStore.getProductFromCart({
    model_id: props.selectedModel.id,
  });
});
function addToCart(model?: any) {
  if (openProductModel && props.has_multiple_types && props.models?.length > 1) {
    emit("openModal");
    return;
  }
  const Model = model ? model : props.selectedModel;
  cartStore.addProductToCart({
    id: Model.id,
    qty: 1,
    ga: {
      item_id: props.productId,
      item_variant: props.has_multiple_types ? Model?.name : undefined,
      item_name: props.productName,
      item_category: props.categoryName,
      price: Model?.discounted_price,
      last_price: Model?.price,
      quantity: 1,
    },
  });
}

// * composables
const { getAmountLeft } = useProduct();
</script>

<template>
  <div class="product-controller-wrapper">
    <div class="product-controller-section">
      <ReusableMyProductPriceSanitizer
        v-if="getAmountLeft(selectedModel)"
        :price="selectedModel.price"
        :discountedPrice="selectedModel.discounted_price"
        :loading="loading"
      />
      <ReusableMyProductUnavailable v-else />
    </div>
    <div class="product-controller-section">
      <div class="product-controller-cart-controls">
        <div
          v-if="
            !!(
              openProductModel &&
              props.has_multiple_types &&
              props.models?.length > 1
            ) || !productInCart
          "
          class="add-to-cart-cart-button-wrapper"
        >
          <button
            name="add-to-cart-button"
            type="button"
            v-if="loading"
            disabled
            class="add-to-cart-cart-button skeleton-loader"
          ></button>
          <button
            name="add-to-cart-button"
            type="button"
            v-else
            :disabled="!getAmountLeft(selectedModel)"
            @click="addToCart()"
            class="add-to-cart-cart-button"
          >
            {{ t("pages.cart.addToCart") }}
          </button>
        </div>
        <div v-else class="in-cart-controllers">
          <ReusableMyProductCartController
            :available="selectedModel.available_amount"
            :frozen="selectedModel.frozen_amount_in_warehouse"
            :max="selectedModel.max_amount_purchaseable"
            @increase="cartStore.increaseItemQuantityFromCart(selectedModel.id)"
            @decay="cartStore.decayItemQuantityFromCart(selectedModel.id)"
            @updateQuantity="
              cartStore.updateQuantity({
                model_id: selectedModel.id,
                quantityToUpdate: $event,
              })
            "
            :productModel="productInCart"
          />
          <div>
            <h5 class="review-cart">
              {{ t("pages.products.review") }}
              <NuxtLink :to="localePath('/cart')" :aria-label="t('pages.links.cart')">{{
                t("pages.cart.cart")
              }}</NuxtLink>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product-controller-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 10px;
  .product-controller-section {
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
    .in-cart-controllers {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      // gap: 10px;
      .icon {
        width: 20px;
        height: 20px;
        color: $primary;
      }
      .review-cart {
        font-size: 0.8em;
        display: none;
        a {
          margin-right: 5px;
          color: $primary;
        }
      }
      .product-cart-controller {
        margin: 0;
      }
    }
    .product-cart-controller {
      width: 100%;
    }
    .product-controller-cart-controls {
      width: 100%;
      .add-to-cart-cart-button-wrapper {
        width: 100%;
        display: flex;
        // padding-top: 30px;
        justify-content: flex-end;
        align-items: flex-end;

        .add-to-cart-cart-button {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: white;
          background-color: $primary;
          border-radius: 10px;
          padding: 10px;
          height: 45px;
          &:disabled {
            background-color: $border-color;
            color: white;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  @include lg {
    border-top: 1px solid $primary;
    padding-top: 15px;
    gap: 0;
    width: 100%;
    height: 110px;
    flex-direction: column;
    .product-controller-section {
      width: 100%;
      .in-cart-controllers {
        margin-top: 10px;
        gap: 10px;
        justify-content: flex-start;
        width: 100%;
        .review-cart {
          display: flex;
        }
        .product-cart-controller {
          width: 110px;
          height: 45px;
        }
      }
      .product-controller-cart-controls {
        .add-to-cart-cart-button-wrapper {
          justify-content: center;
          width: 100%;
          padding-top: 10px;
          align-items: flex-start;
          .add-to-cart-cart-button {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      }
    }
  }
}
</style>
