<script setup lang="ts">
// * imports
import SvgPlus from "@/components/Svg/plus.vue";
import SvgMinus from "@/components/Svg/minus.vue";
import SvgTrash from "@/components/Svg/trash.vue";
import SvgActiveTrash from "@/components/Svg/activeTrash.vue";

// * emits and props
const emit = defineEmits(["decay", "increase", "updateQuantity"]);

const props = defineProps<{
  productModel: any;
  available: any;
  frozen: any;
  max: any;
}>();

const { updateProductQuantity, productIsAllowedToIncrease } = useProduct();

// * composables

const { t } = useI18n();
// * hooks
onMounted(() => {
  const result = updateProductQuantity(
    props.available,
    props.frozen,
    props.max,
    props.productModel.qty
  );
  if (result !== false) {
    emit("updateQuantity", result);
  }
});
onUpdated(() => {
  const result = updateProductQuantity(
    props.available,
    props.frozen,
    props.max,
    props.productModel.qty
  );
  if (result !== false) {
    emit("updateQuantity", result);
  }
});
</script>

<template>
  <div class="product-cart-controller">
    <div class="cart-controller-buttons-wrapper">
      <button
        name="increase-button"
        :disabled="!productIsAllowedToIncrease(available, frozen, productModel.qty, max)"
        @click="emit('increase')"
        class="cart-controller-button"
      >
        <SvgPlus class="passive-icon" />
        <SvgPlus class="active-icon" />
      </button>
      <span class="quantity-wrapper">
        <span>
          {{ productModel.qty }}
        </span>
        <span
          v-if="!productIsAllowedToIncrease(available, frozen, productModel.qty, max)"
          @click="emit('increase')"
          class="not-allowed-to-increase"
          >{{ t("pages.cart.maxAmountReached") }}</span
        >
      </span>
      <button
        name="decrease-button"
        class="cart-controller-button"
        v-if="productModel.qty != 1"
        @click="emit('decay')"
      >
        <SvgMinus class="passive-icon" />
        <SvgMinus class="active-icon" />
      </button>
      <button
        name="trash-button"
        class="cart-controller-button"
        v-else
        @click="emit('decay')"
      >
        <SvgTrash class="passive-icon" />
        <SvgActiveTrash class="active-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.product-cart-controller {
  width: 110px;
  height: 45px;
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  justify-content: center;
  border: 1px solid $primary;
  border-radius: 7px;
  background-color: $optional-bg;
  .cart-controller-buttons-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    width: 100%;
    height: 100%;
    gap: 15px;
    align-items: center;
    .quantity-wrapper {
      position: relative;
      .not-allowed-to-increase {
        color: $secondary;
        position: absolute;
        font-size: 0.7em;
        bottom: -10px;
        right: calc(100% - 19px);
      }
    }
    .quantity-wrapper {
      span {
        color: $primary;
      }
    }
    .cart-controller-button {
      display: flex;
      align-items: center;
      .passive-icon,
      .active-icon {
        width: 20px;
        height: 20px;
      }

      .passive-icon {
        display: none;
      }
      .active-icon {
        color: $primary;
      }
      &:disabled {
        .passive-icon {
          display: block;
          color: $border-color;
        }
        .active-icon {
          display: none;
        }
      }
    }
  }
  @include lg {
    padding: 5px;
    .cart-controller-buttons-wrapper {
      .quantity-wrapper {
        span {
          color: black;
        }
      }
      .cart-controller-button {
        .passive-icon {
          display: block;
        }
        .active-icon {
          display: none;
        }
        &:hover,
        &:active {
          .passive-icon {
            display: none;
          }
          .active-icon {
            display: block;
          }
        }
      }
    }
  }
}
</style>
