<script lang="ts" setup>
// * imports
import { useCartStore } from "@/store/user/cart";
import ReusableMyProductPriceSanitizer from "@/components/reusable/myProduct/priceSanitizer.vue";
import ReusableMyProductUnavailable from "@/components/reusable/myProduct/unavailable.vue";
import ReusableMyProductCartController from "@/components/reusable/myProduct/cartController.vue";

// * props
const props = defineProps<{
  models: any;
  productId: any;
  productName: any;
  categoryName: any;
  has_multiple_types: any;
}>();

// * composables
const cartStore = useCartStore();
const { getAmountLeft } = useProduct();
const { t } = useI18n();
const { getUrl } = useUrl();

// * functions
function modelIsInCart(modelId: string) {
  return cartStore.getProductFromCart({
    model_id: modelId,
  });
}
function addToCart(model: any) {
  cartStore.addProductToCart({
    id: model.id,
    qty: 1,
    ga: {
      item_id: props.productId,
      item_variant: props.has_multiple_types ? model?.name : undefined,
      item_name: props.productName,
      item_category: props.categoryName,
      price: model?.discounted_price,
      last_price: model?.price,
      quantity: 1,
    },
  });
}
</script>

<template>
  <table class="product-models-table">
    <tr class="product-models-table-row" v-for="model in models">
      <td class="product-models-table-column name-column">
        <div class="table-data-wrapper">
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            width="90px"
            sizes="90px md:120px"
            height="90px"
            v-if="model.image_url"
            :src="getUrl(model.image_url)"
            :alt="model.name"
            :name="model.name"
            :imgAttrs="{ class: 'product-models-table-image' }"
          />
          <p v-else>{{ model.name }}</p>
        </div>
      </td>
      <td class="product-models-table-column price-column">
        <div class="table-data-wrapper">
          <ReusableMyProductPriceSanitizer
            :price="model.price"
            styleRelative
            :discountedPrice="model.discounted_price"
            v-if="getAmountLeft(model)"
          />
          <ReusableMyProductUnavailable v-else />
        </div>
      </td>
      <td class="product-models-table-column controller-column">
        <div class="table-data-wrapper">
          <button
            type="button"
            v-if="!getAmountLeft(model)"
            class="product-add-to-cart-button"
            :name="t('pages.cart.addToCart')"
            disabled
          >
            {{ t("pages.cart.addToCart") }}
          </button>
          <ReusableMyProductCartController
            v-else-if="modelIsInCart(model.id)"
            :available="model.available_amount"
            :frozen="model.frozen_amount_in_warehouse"
            :max="model.max_amount_purchaseable"
            @increase="cartStore.increaseItemQuantityFromCart(model.id)"
            @decay="cartStore.decayItemQuantityFromCart(model.id)"
            @updateQuantity="
              cartStore.updateQuantity({
                model_id: model.id,
                quantityToUpdate: $event,
              })
            "
            :productModel="modelIsInCart(model.id)"
          />
          <button
            v-else
            :name="t('pages.cart.addToCart')"
            class="product-add-to-cart-button"
            @click="addToCart(model)"
          >
            {{ t("pages.cart.addToCart") }}
          </button>
        </div>
      </td>
    </tr>
  </table>
</template>

<style lang="scss">
.product-models-table {
  width: 100%;

  .product-models-table-row {
    border-bottom: 1px solid $border-color;
    &:last-child {
      border: none;
    }
    .product-models-table-column {
      &.controller-column {
        width: 130px;
      }
      &.price-column {
        width: 180px;
      }

      .table-data-wrapper {
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 10px 0;
      }
      &.name-column {
        .table-data-wrapper {
          justify-content: flex-start;
          flex-direction: column;
        }
      }
      .product-add-to-cart-button {
        width: 110px;
        height: 40px;
        margin: 10px 0;
        border: 1px solid $border-color;
        border-radius: 7px;
        font-size: 0.7em;
        background: $primary;
        color: white;
        &:disabled {
          background: $gray-bg;
          cursor: not-allowed;
        }
      }
    }
  }
  @include sm {
    .product-models-table-row {
      .product-models-table-column {
        .table-data-wrapper {
          .product-models-table-image {
            width: 120px;
            height: 120px;
          }
        }
      }
    }
  }
}
</style>
