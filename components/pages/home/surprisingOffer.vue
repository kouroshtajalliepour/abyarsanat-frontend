<script lang="ts" setup>
// * imports
import ReusableMyProductCartElement from "@/components/reusable/myProduct/cartElement.vue";
import ReusableMyCarousel from "@/components/reusable/myCarousel.vue";
import ReusableMySlide from "@/components/reusable/mySlide.vue";
import ChangeableIconsDiscount from "@/components/changeableIcons/discount.vue";
import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";
// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();

// * props and emits
const props = defineProps<{
  specialOfferProducts: any;
  loading?: boolean;
}>();
const emit = defineEmits(["handleTouchStart", "handleTouchMove"]);
</script>

<template>
  <div class="special-offer-carousel-wrapper">
    <ReusableMyCarousel
      :loading="loading"
      class="special-offer-carousel"
      :scrollAmount="200"
      :gap="5"
    >
      <ReusableMySlide>
        <div class="special-offer-carousel-item surprising-offer-description-slide">
          <h2 class="surprising-offer-title">{{ t("pages.links.surprisingOffer") }}</h2>
          <ChangeableIconsDiscount class="surprising-offer-image" />
          <NuxtLink
            class="view-all-surprising-offers-link"
            :to="localePath('/selection/special-offer')"
          >
            {{ t("pages.links.see_all") }}
            <!-- <svg style="width: 18px; height: 18px;"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></svg> -->
            <SvgArrowLeft />
          </NuxtLink>
        </div>
      </ReusableMySlide>
      <ReusableMySlide v-if="loading" v-for="i in 15" class="suggested-product-slide">
        <ReusableMyProductCartElement :loading="true" minimal />
      </ReusableMySlide>
      <ReusableMySlide
        v-else
        v-for="product in specialOfferProducts"
        class="suggested-product-slide"
      >
        <ReusableMyProductCartElement :product="product" minimal />
      </ReusableMySlide>
      <ReusableMySlide>
        <div class="special-offer-carousel-item view-all-surprising-offer-slide">
          <NuxtLink
            class="view-all-surprising-offers-link"
            :to="localePath('/selection/special-offer')"
          >
            <!-- <svg style="width: 18px; height: 18px;"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></svg> -->
            <div class="icon-wrapper">
              <SvgArrowLeft />
            </div>
            <p>
              {{ t("pages.links.see_all") }}
            </p>
          </NuxtLink>
        </div>
      </ReusableMySlide>
    </ReusableMyCarousel>
  </div>
</template>

<style lang="scss">
.special-offer-carousel-wrapper {
  margin-top: 30px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  padding-left: 0;
  background-color: $optional-bg;
  display: flex;
  align-items: center;
  .suggested-product-slide {
    .product-cart-figure {
      border-radius: 0;
      height: 250px;
      width: 160px;
    }
    &:nth-child(2) {
      .product-cart-figure {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

  .special-offer-carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    width: 160px;
    height: 250px;
    gap: 10px;
    &.surprising-offer-description-slide {
      justify-content: center;
      background: transparent;
      padding: 5px 0;
      width: 130px;
      margin-left: 5px;
      .surprising-offer-title {
        padding: 0 5px;
        color: black;
        text-align: center;
      }
      .surprising-offer-image {
        object-fit: cover;
        width: 40px;
        height: 40px;
        margin: 10px 0;
        color: $primary;
      }
      .view-all-surprising-offers-link {
        display: flex;
        align-items: center;
        color: black;
        gap: 3px;
        font-size: 0.8em;
        margin-top: 10px;
        svg {
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 15px;
          height: 15px;
        }
      }
    }
    &.view-all-surprising-offer-slide {
      border-radius: 10px 0 0 10px;
      justify-content: center;
      height: 100%;
      margin-left: 20px;
      .view-all-surprising-offers-link {
        flex-direction: column;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-wrapper {
          border: 1px solid $primary;
          border-radius: 50%;
          display: flex;
          align-items: center;
          padding: 10px;
          justify-content: center;
          svg {
            color: $primary;
            width: 20px;
            height: 20px;
          }
        }
        p {
          margin-top: 5px;
          font-size: 0.9em;
        }
      }
    }
    &.first-child {
      border-radius: 0 10px 10px 0;
    }
  }
  @include lg {
    margin: 0 30px;
    margin-top: 40px;
    width: calc(100% - 60px);
    border-radius: 10px;
  }
}
</style>
