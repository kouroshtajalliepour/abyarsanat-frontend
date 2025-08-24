<script lang="ts" setup>
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";
import ReusableMyProductCartElement from "@/components/reusable/myProduct/cartElement.vue";
import ReusableMyPageButton from "@/components/reusable/myPageButton.vue";
// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
// * props
const props = defineProps<{
  products: any;
  loading?: boolean;
}>();
const { getUrl } = useUrl();
</script>

<template>
  <div class="surprizing-offer-section-wrapper">
    <ReusableMyPageSmallTitle :title="t('pages.links.surprisingOffer')" />
    <div v-if="loading" class="surprizing-offer-section-container">
      <ReusableMyProductCartElement v-for="i in 3" :loading="true" />
    </div>
    <section v-else>
      <div class="surprizing-offer-section-container horizontal">
        <ReusableMyProductCartElement
          :loading="loading"
          v-for="product in products?.slice(3)"
          :product="product"
        />
      </div>
      <div class="surprizing-offer-section-container">
        <ReusableMyProductCartElement
          :loading="loading"
          v-for="product in products?.slice(0, 3)"
          :product="product"
        />
      </div>
      <div class="show-more-surprizing-offer-button">
        <ReusableMyPageButton
          :to="localePath('/selection/special-offer')"
          :ctx="t('pages.links.seeAllSurprizingOffers')"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.surprizing-offer-section-wrapper {
  width: 100%;
  align-items: center;
  // padding-top: 10px;
  padding-bottom: 30px;
  position: relative;
  .surprizing-offer-section-container {
    background-color: $optional-bg;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &.horizontal {
      display: none;
    }
    article {
      width: calc(100% - 20px);
      margin-bottom: 10px;
      .product-cart-element-wrapper {
        width: 100%;
        .product-cart-figure {
          width: 100%;
        }
      }
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
  .show-more-surprizing-offer-button {
    margin-top: 20px;
  }

  @include sm {
    .surprizing-offer-section-container {
      article {
        width: calc(50% - 30px);
      }
      > :first-child {
        margin-left: 10px;
      }
    }
  }
  @include lg {
    background-color: $optional-bg;
    .surprizing-offer-section-container {
      max-width: 1100px;
      margin: auto;
      article {
        width: calc(33% - 20px);
        margin-bottom: 0px;
        margin-left: 10px;
      }
      > :last-child {
        margin-left: 0px;
      }
      &.horizontal {
        display: flex;
        margin-bottom: 20px;
        article {
          width: calc(50% - 30px);
        }
      }
    }
  }
  @include lg {
    padding: 0 30px;
    // padding-top: 20px;
  }
}
</style>
