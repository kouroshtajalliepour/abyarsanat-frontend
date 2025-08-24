<script lang="ts" setup>
// * imports
import ChangeableIconsSpecialOfferTag from "@/components/changeableIcons/specialOfferTag.vue";
import ReusableMyProductShipmentStatus from "./shipmentStatus.vue";
import ReusableMyProductAvailable from "./available.vue";
import ReusableMyProductUnavailable from "./unavailable.vue";
import ReusableMyProductPriceSanitizer from "./priceSanitizer.vue";
import ReusableMyProductModels from "./models.vue";
// * props
const props = defineProps<{
  product?: any;
  loading?: boolean;
  hideTags?: boolean;
  minimal?: boolean;
}>();
// * composables
const localePath = useLocalePath();
const { t } = useI18n();
const { getAmountLeft } = useProduct();
const { getUrl } = useUrl();
</script>
<template>
  <article>
    <div class="product-cart-element-wrapper" v-if="loading">
      <figure :class="['product-cart-figure', minimal ? 'minimal' : '']">
        <div
          :class="['product-cart-image skeleton-loader', minimal ? 'minimal' : '']"
        ></div>
        <figcaption class="product-cart-data">
          <div class="product-information-wrapper">
            <p class="product-cart-title skeleton-loader loading"></p>
            <ReusableMyProductShipmentStatus v-if="!minimal" loading />
          </div>
          <div class="product-availability-wrapper">
            <ReusableMyProductShipmentStatus loading />
          </div>
        </figcaption>
      </figure>
    </div>

    <NuxtLink
      v-else-if="product"
      :to="localePath(`/product/${product.slug}`)"
      :aria-label="t('pages.links.single_product', { name: product.name })"
      target="_blank"
      class="product-cart-element-wrapper"
    >
      <figure :class="['product-cart-figure', minimal ? 'minimal' : '']">
        <ChangeableIconsSpecialOfferTag
          v-if="product.product_is_special_offer_product && !hideTags"
        />
        <ReusableMyProductModels
          v-if="product?.models"
          :models="product.models"
          :colorBased="!!product.show_models_as_radio"
        />
        <NuxtPicture
          format="avif,webp"
          class="product-picture-tag"
          densities="x1 x2"
          quality="80"
          :width="minimal ? '120px' : '140px'"
          :height="minimal ? '120px' : '140px'"
          :sizes="minimal ? '120px' : '140px'"
          v-if="product && product.image_url"
          :src="getUrl(product.image_url)"
          :alt="product.image_alt"
          :name="product.image_alt"
          :imgAttrs="{
            class: minimal ? 'product-cart-image minimal' : 'product-cart-image',
          }"
        />
        <div v-else class="product-cart-image"></div>
        <figcaption class="product-cart-data">
          <div class="product-information-wrapper">
            <p class="product-cart-title">{{ product.name }}</p>
            <ReusableMyProductShipmentStatus
              :weight="Number(product.weight)"
              v-if="getAmountLeft(product) && !minimal"
              :price="Number(product.discounted_price)"
            />
            <ReusableMyProductAvailable
              class="product-cart-left-amount"
              :leftAmount="getAmountLeft(product)"
              v-if="!minimal"
            />
          </div>

          <div class="product-availability-wrapper">
            <ReusableMyProductUnavailable v-if="!getAmountLeft(product)" />
            <ReusableMyProductPriceSanitizer
              v-else
              :price="product.price"
              :minimal="minimal"
              :discountedPrice="product.discounted_price"
            />
          </div>
        </figcaption>
      </figure>
    </NuxtLink>
  </article>
</template>

<style lang="scss">
.product-cart-element-wrapper {
  display: block;
  .product-cart-figure {
    background: white;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    // align-items: center;
    gap: 10px;
    border-bottom: 1px solid $border-color;
    position: relative;
    border: 1px solid $border-color;
    border-radius: 10px;
    width: 200px;
    height: 320px;

    .product-picture-tag {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .product-cart-image {
      height: 140px;
      width: 140px;
      object-fit: cover;
      align-self: center;
      &.minimal {
        height: 120px;
        width: 120px;
      }
    }

    .product-cart-data {
      height: 140px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      &.loading {
        width: 100%;
      }
      .product-information-wrapper {
        position: relative;
        .product-cart-title {
          font-size: 0.8em;
          margin-bottom: 5px;
          height: 42px;
          overflow: hidden;
          display: -webkit-box;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .product-cart-left-amount {
          margin-top: 5px;
          margin-right: 5px;
        }
      }
      .product-availability-wrapper {
        align-self: flex-end;
      }
    }
    &.minimal {
      .product-cart-data {
        height: 100px;
        &.loading {
          height: 100px;
        }
      }
    }
  }
}

// @include md {
//     .product-cart-element-wrapper {
//     .product-cart-figure {
//       border: 1px solid $border-color;
//       flex-direction: column;
//       .product-cart-image {
//         width: 240px;
//         height: 240px;
//         margin-top: 20px;
//       }
//       .product-cart-data {
//         width: 240px;
//         padding-top: 20px;
//         margin-bottom: 20px;
//       }
//     }
//   }
// }
</style>
