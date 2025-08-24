<script lang="ts" setup>
// * imports
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";

// * props
defineProps<{
  price: string | number;
  discountedPrice?: string | number;
  disablePercentage?: boolean;
  priceIsDynamic?: boolean;
  loading?: boolean;
  minimal?: boolean;
  styleRelative?: boolean;
}>();
// * composables
const { sanitizePrice, sanitizePercentage } = useProduct();
const { t } = useI18n();
</script>

<template>
  <div
    :class="[
      'product-price-wrapper',
      styleRelative ? 'relative' : '',
      loading ? 'loading' : '',
    ]"
  >
    <p v-if="loading" class="price-context skeleton-loader"></p>
    <div v-else>
      <p class="price-context">
        <span v-if="priceIsDynamic">{{
          t("pages.products.priceIsDynamicPriceTitle")
        }}</span>
        {{
          !discountedPrice || price == discountedPrice
            ? sanitizePrice(price)
            : sanitizePrice(discountedPrice)
        }}
        <ReusableMyCurrency />
      </p>
      <div
        :class="['discount-percentage', minimal ? 'minimal' : '']"
        v-if="!disablePercentage && discountedPrice && price != discountedPrice"
      >
        <p class="discount-percentage-context">
          {{ sanitizePercentage(price, discountedPrice) }}
        </p>
      </div>
      <span
        v-if="discountedPrice && price != discountedPrice"
        class="deleted-price-context"
      >
        {{ sanitizePrice(price) }}
      </span>
      <span v-else-if="!disablePercentage" class="deleted-price-context"></span>
    </div>
  </div>
</template>

<style lang="scss">
.product-price-wrapper {
  // position: relative;
  &.loading {
    width: 100%;
  }
  // .deleted-price-wrapper {
  //   position: absolute;
  //   top: -18px;
  //   display: flex;
  //   align-items: center;
  //   gap: 10px;
  //   .deleted-price-context {
  //     font-size: 0.9em;
  //     color: $deleted-price;
  //     text-decoration: line-through;
  //   }
  // }
  .discount-percentage {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $optional-bg;
    border: 1px solid $red;
    width: 34px;
    height: 20px;
    border-radius: 10px;
    padding: 0 4px;
    position: absolute;
    bottom: 27px;
    right: 10px;
    font-size: 0.7em;
    text-decoration: none;
    .discount-percentage-context {
      color: $red;
      line-height: 1;
    }
    &.minimal {
      bottom: 37px;
    }
  }
  &.relative {
    position: relative;
    .discount-percentage {
      bottom: unset;
      right: 20px;
    }
  }
  .price-context {
    height: 24px;
    &.skeleton-loader {
      width: 100%;
    }
  }
  .deleted-price-context {
    font-size: 0.9em;
    color: $deleted-price;
    margin-right: 1px;
    text-decoration: line-through;
  }
}
</style>
