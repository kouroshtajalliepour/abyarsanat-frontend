<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import { useCartStore } from "@/store/user/cart";
import SvgPaymentCallBackLoading from "@/components/Svg/paymentCallBack/loading.vue";
import SvgPaymentCallBackError from "@/components/Svg/paymentCallBack/error.vue";
import SvgPaymentCallBackSuccess from "@/components/Svg/paymentCallBack/success.vue";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";
// * props
const props = defineProps<{
  paymentStatus: string;
  successPayment: any;
}>();

// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { sanitizePrice } = useProduct();
const userStore = useUserAuthStore();
const cartStore = useCartStore();

// * store data
const { userNavBarIsOpen } = storeToRefs(userStore);
const { cartItems } = storeToRefs(cartStore);

// * functions
function navigateToUserOrdersPage() {
  userNavBarIsOpen.value = false;
  if (props.paymentStatus === "ok") {
    cartItems.value = [];
  }

  navigateTo(localePath("/user/orders"));
}
function navigateToHomeOrdersPage() {
  userNavBarIsOpen.value = false;
  if (props.paymentStatus === "ok") {
    cartItems.value = [];
  }
  navigateTo(localePath("/"));
}
</script>

<template>
  <div>
    <div class="payment-callback-wrapper" v-if="paymentStatus === 'loading'">
      <div class="payment-loading-wrapper">
        <SvgPaymentCallBackLoading class="payment-callback-loading-icon" />
      </div>
    </div>
    <div
      class="payment-callback-wrapper"
      v-else-if="paymentStatus === 'error' || successPayment.success == false"
    >
      <div class="payment-callback">
        <div class="payment-callback-title">
          <h2 class="payment-callback-title-context error">
            {{ t("pages.callback.error_title") }}
          </h2>
          <SvgPaymentCallBackError class="payment-callback-error-icon" />
        </div>
        <h5 class="payment-callback-description">{{ t("pages.callback.error_info") }}</h5>
        <nav class="payment-callback-nav">
          <nuxt-link class="payment-callback-nav-link" :to="localePath('/')">{{
            t("pages.callback.backToHome")
          }}</nuxt-link>
        </nav>
      </div>
    </div>
    <div class="payment-callback-wrapper" v-else>
      <div class="payment-callback">
        <div class="payment-callback-title">
          <h2 class="payment-callback-title-context">
            {{
              successPayment.provider !== "none"
                ? t("pages.callback.success_title")
                : t("pages.callback.order_success_title")
            }}
          </h2>
          <SvgPaymentCallBackSuccess class="payment-callback-success-icon" />
        </div>
        <div class="payment-callback-information">
          <h5 class="payment-callback-information-title">
            {{
              successPayment.provider !== "none"
                ? t("entities.fields.payment_id")
                : t("entities.fields.payment_order_id")
            }}
          </h5>
          <h5 class="payment-callback-information-value">
            {{ successPayment.payment_id }}
          </h5>
        </div>
        <div class="payment-callback-information" v-if="successPayment.ref_id">
          <h5 class="payment-callback-information-title">
            {{ t("entities.fields.ref_id") }}
          </h5>
          <h5 class="payment-callback-information-value">
            {{ successPayment.ref_id }}
          </h5>
        </div>
        <div
          class="payment-callback-information"
          v-if="
            successPayment.total_promoted_amount &&
            successPayment.total_promoted_amount != '0'
          "
        >
          <h5 class="payment-callback-information-title">
            {{ t("entities.fields.payed_price") }}
          </h5>
          <h5 class="payment-callback-information-value">
            {{ sanitizePrice(successPayment.total_promoted_amount) }}
            <ReusableMyCurrency />
          </h5>
        </div>
        <!--<div
          class="payment-callback-information"
          v-if="successPayment.provider && successPayment.provider !== 'none'"
        >
          <h5 class="payment-callback-information-title">
            {{ t("entities.fields.provider") }}
          </h5>
          <h5 class="payment-callback-information-value">
            {{ t(`entities.values.paymentProvider.${successPayment.provider}`) }}
          </h5>
        </div>
        <h5 class="payment-callback-description" v-else>
          {{ t("pages.callback.noProviderHint") }}
        </h5> -->
        <nav class="payment-callback-nav">
          <span
            class="payment-callback-nav-link secondary"
            @click="navigateToUserOrdersPage"
            >{{ t("pages.callback.orderManagement") }}</span
          >
          <span class="payment-callback-nav-link" @click="navigateToHomeOrdersPage">{{
            t("pages.callback.backToHome")
          }}</span>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.payment-callback-wrapper {
  display: flex;
  width: 100%;
  // padding: 200px 0;
  justify-content: center;
  height: 100vh;
  align-items: center;
  .payment-loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .payment-callback-loading-icon {
      width: 100px;
      height: 100px;
      fill: $gray-icon;
    }
  }
  .payment-callback {
    padding: 10px 10px;
    border: 1px solid $border-color;
    width: 90%;
    border-radius: 10px;
    display: flex;
    max-height: 500px;
    flex-direction: column;
    gap: 10px;

    .payment-callback-title {
      display: flex;
      flex-flow: column-reverse;
      padding-bottom: 10px;
      gap: 10px;
      align-items: center;
      border-bottom: 1px solid $border-color;
      .payment-callback-title-context {
        font-size: 20px;
        color: $primary;
        &.error {
          color: $danger;
        }
      }
      .payment-callback-error-icon {
        width: 60px;
        height: 60px;
        color: $danger;
      }
      .payment-callback-success-icon {
        width: 75px;
        height: 75px;
        color: $primary;
      }
    }
    .payment-callback-description {
      font-size: 0.9em;
      text-align: center;
      margin: 10px 0;
    }

    .payment-callback-information {
      display: flex;
      flex-direction: column;
      align-items: center;
      .payment-callback-information-value {
        font-weight: 700;
        margin: 10px 0;
        font-size: 1.5em;
        color: $primary;
      }
    }

    .payment-callback-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      .payment-callback-nav-link {
        display: inline-block;
        width: 150px;
        padding: 8px 12px;
        border-radius: 5px;
        margin: 0 10px;
        font-size: 0.9em;
        cursor: pointer;
        color: white;
        background-color: $primary;
        text-align: center;
        &.secondary {
          background-color: $secondary;
        }
      }
    }
  }
  @include md {
    .payment-callback-loading-icon {
      width: 150px;
      height: 150px;
    }
    .payment-callback {
      width: 70%;
      padding: 20px 30px;
    }
  }
  @include lg {
    .payment-callback-loading-icon {
      width: 200px;
      height: 200px;
    }
    .payment-callback {
      width: 50%;
      .payment-callback-title {
        .payment-callback-title-context {
          font-size: 24px;
        }
        .payment-callback-error-icon,
        .payment-callback-success-icon {
          width: 40px;
          height: 40px;
        }
      }
      .payment-callback-description {
        font-size: 15px;
      }
    }
  }
}
</style>
