<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/user/cart";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";
import SvgActiveInfo from "@/components/Svg/activeInfo.vue";
import ReusableMyProductPriceSanitizer from "@/components/reusable/myProduct/priceSanitizer.vue";
import ReusableMyCheckoutButton from "@/components/reusable/myCheckoutButton.vue";

// * emits and props
const emit = defineEmits(["submit", "toggleShipmentInfo"]);

// * composables
const { t, locale } = useI18n();
const cartStore = useCartStore();
const { sanitizePrice, sanitizeQuantity } = useProduct();

// * runtime config
const {
  public: { free_shipment_price },
} = useRuntimeConfig();

// * store data
const { cartData, appliedPromotion } = storeToRefs(cartStore);

// * page data
const promotion_slug = ref("");
const promotionError = ref(false);

// * functions
async function applyPromotionCode() {
  try {
    await cartStore.applyPromotion({
      locale: locale.value,
      promotionSlug: promotion_slug.value,
    });
  } catch (e: any) {
    promotionError.value = true;
  }
}

function revertPromotion() {
  promotion_slug.value = "";
  cartStore.revertPromotion();
}
</script>

<template>
  <div
    :class="['cart-sidebar-wrapper', cartData.cartIncludesDynamicPrice ? 'larger' : '']"
  >
    <div class="cart-sidebar">
      <div class="cart-sidebar-section">
        <h5 class="cart-sidebar-title">{{ t("pages.cart.productsPrice") }}</h5>
        <p class="price final-price">
          {{ sanitizePrice(cartData.total_raw_price) }}
          <ReusableMyCurrency />
        </p>
      </div>
      <div class="cart-sidebar-section space-included">
        <h5 class="cart-sidebar-title">{{ t("pages.cart.benefit") }}</h5>
        <p class="price final-price">
          {{ sanitizePrice(cartData.total_profit_price) }}
          <ReusableMyCurrency />
        </p>
      </div>
      <!-- <div class="cart-sidebar-section space-included">
        <h5 class="cart-sidebar-title">{{ t("pages.cart.shipmentPrice") }}</h5>
        <p>
          <span v-if="cartData.total_price >= free_shipment_price">
            {{ sanitizeQuantity(0) }}
            <ReusableMyCurrency />
          </span>
          <span class="shipment-description" v-else>
            <SvgActiveInfo @click="emit('toggleShipmentInfo')" class="info-icon" />
            <span class="currency">{{ t("pages.cart.preOrderShipment") }}</span>
          </span>
        </p>
      </div> -->
      <div class="cart-sidebar-section cart-sidebar-hint-section">
        <p v-if="cartData.total_price <= free_shipment_price" class="cart-sidebar-hint">
          {{ t("pages.cart.shipment_price_tip") }}
        </p>
      </div>
      <div class="cart-sidebar-section total-price">
        <h5 class="cart-sidebar-title">{{ t("pages.cart.totalPrice") }}</h5>
        <ReusableMyProductPriceSanitizer
          :price="cartData.total_price"
          :discountedPrice="cartData.total_promoted_price"
          disablePercentage
        />
      </div>
      <div
        v-if="cartData.cartIncludesDynamicPrice"
        class="cart-sidebar-section cart-sidebar-hint-section"
      >
        <p class="cart-sidebar-hint bold">
          {{ t("pages.cart.dynamicPriceTip") }}
        </p>
      </div>
      <form
        v-if="!appliedPromotion"
        @submit.prevent="applyPromotionCode"
        class="promotion-code-wrapper"
      >
        <div class="promotion-code-wrapper">
          <h5 class="cart-sidebar-title">{{ t("pages.cart.promotion_code") }}</h5>
          <div class="promotion-inputs-container">
            <input
              class="promotion-input"
              type="text"
              @change="promotionError = false"
              v-model="promotion_slug"
            />
            <input class="promotion-submit" :value="t('buttons.apply')" type="submit" />
          </div>
        </div>
        <p class="promotion-error" v-if="promotionError">
          {{ t("useCases.errors.payment.promotion_expired") }}
        </p>
      </form>
      <div v-else class="cancel-promotion-wrapper">
        <h5 class="cart-sidebar-title">
          {{
            t("pages.cart.promotion_applied", {
              promotionCode: appliedPromotion.slug,
            })
          }}
        </h5>
        <div class="cancel-promotion-button-wrapper">
          <button
            :name="t('pages.cart.cancel_promotion')"
            class="cancel-promotion-button"
            type="button"
            @click="revertPromotion"
          >
            {{ t("pages.cart.cancel_promotion") }}
          </button>
        </div>
      </div>
      <div class="checkout-wrapper">
        <div class="checkout-total-price-wrapper">
          <h5 class="cart-sidebar-title checkout-total-price-title">
            {{ t("pages.cart.totalPrice") }}
          </h5>

          <ReusableMyProductPriceSanitizer
            :price="cartData.total_price"
            disablePercentage
            :discountedPrice="cartData.total_promoted_price"
          />
        </div>

        <ReusableMyCheckoutButton
          :title="t('pages.cart.continue_order')"
          @submit="emit('submit')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-sidebar-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid $primary;
  background-color: $optional-bg;
  .cart-sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 40px 15px;
    position: relative;
    gap: 10px;

    .cart-sidebar-title {
      font-size: 1em;
    }
    .form-error {
      color: $red;
      margin-top: 10px;
    }

    .cart-sidebar-section {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &.space-included {
        border-top: 1px solid $primary;
        margin-top: 20px;
        padding-top: 20px;
      }
      &.cart-sidebar-hint-section {
        font-size: 0.8em;
        margin-top: 25px;
        border-bottom: 1px solid $primary;
        padding-bottom: 20px;
        .cart-sidebar-hint {
          color: $gray-title;
          &.bold {
            color: $primary;
            // font-weight: bold;
          }
        }
      }
    }

    .promotion-code-wrapper {
      width: 100%;
      padding-top: 15px;
      margin-bottom: 55px;
      .promotion-code-wrapper {
        width: 100%;
        .promotion-inputs-container {
          display: flex;
          width: 100%;
          gap: 5px;
          margin-top: 10px;
          .promotion-input {
            background-color: white;
            border: 1px solid $primary;
            border-radius: 5px;
            padding: 5px;
            direction: ltr;
            color: black;
            width: 100%;
          }
          .promotion-submit {
            color: $primary;
            display: flex;
            border: 1px solid $primary;
            background-color: white;
            padding: 0 5px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
              background-color: $primary;
              color: white;
            }
          }
        }
      }
      .promotion-error {
        color: $red;
        font-size: 0.8em;
        margin-top: 5px;
      }
    }

    .cancel-promotion-wrapper {
      margin-bottom: 55px;
      width: 100%;
      padding-top: 15px;
      .cancel-promotion-button-wrapper {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-top: 10px;
        .cancel-promotion-button {
          color: $primary;
          display: flex;
          border: 1px solid $primary;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            background-color: $primary;
            color: white;
          }
        }
      }
    }
    // * shit code
    .checkout-wrapper {
      z-index: 2;
      width: calc(100% - 20px);
      position: fixed;
      bottom: 70px;
      right: 10px;
      border-radius: 12px;
      background-color: white;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 10px;
      gap: 5px;
      border: 1px solid $primary;
      box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.14), 0 -2px 2px rgba(0, 0, 0, 0.05);
      height: 72px;

      .checkout-total-price-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 10px;
        .checkout-total-price-title {
          display: none;
        }
      }
    }

    .shipment-description {
      display: flex;
      align-items: center;
      .info-icon {
        color: $primary;
        cursor: pointer;
      }
    }
  }
  @include md {
    .cart-sidebar {
      .checkout-wrapper {
        bottom: 75px;
      }
    }
  }
  @include lg {
    position: sticky;
    height: 580px;
    max-width: 320px;
    border-radius: 5px;
    top: calc($top-of-the-window-lg + 5px);
    &.larger {
      height: 710px;
    }
    .cart-sidebar {
      .cancel-promotion-wrapper {
        margin: 0;
      }
      .cart-sidebar-section {
        &.total-price {
          display: none;
        }
      }
      .promotion-code-wrapper {
        margin: 0;
      }
      .checkout-wrapper {
        position: relative;
        flex-direction: column;
        padding: 0;
        align-items: flex-start;
        gap: 0;
        bottom: 0;
        box-shadow: none;
        border: none;
        height: unset;

        .checkout-total-price-wrapper {
          border-radius: 5px;
          margin-top: 15px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 0;
          .checkout-total-price-title {
            display: block;
          }
        }
      }
    }
  }
}
</style>
