<script setup lang="ts">
// * imports
import ChangeableIconsSpecialOfferTag from "@/components/changeableIcons/specialOfferTag.vue";
import ReusableMyProductShipmentStatus from "@/components/reusable/myProduct/shipmentStatus.vue";
import ReusableMyProductAvailable from "@/components/reusable/myProduct/available.vue";
import ReusableMyProductUnavailable from "@/components/reusable/myProduct/unavailable.vue";
import ReusableMyProductPriceSanitizer from "@/components/reusable/myProduct/priceSanitizer.vue";
import ReusableMyNotFound from "@/components/reusable/myNotFound.vue";
// * props
const props = defineProps<{
  products: any;
  loading: any;
}>();

// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();
const { getAmountLeft } = useProduct();

// * data
</script>

<template>
  <ul class="products-wrapper" v-if="loading">
    <li class="product-cart-wrapper" v-for="i in 20">
      <div class="product-cart-link-wrapper">
        <figure class="product-cart-figure">
          <div class="product-cart-image skeleton-loader"></div>
          <figcaption class="product-cart-data">
            <div class="product-information-wrapper">
              <p class="product-cart-title skeleton-loader loading"></p>
              <ReusableMyProductShipmentStatus loading />
            </div>
            <div class="product-availability-wrapper">
              <ReusableMyProductShipmentStatus loading />
            </div>
          </figcaption>
        </figure>
      </div>
    </li>
  </ul>
  <ul class="products-wrapper" v-else-if="products && products.length">
    <li class="product-cart-wrapper" v-for="(product, index) in products">
      <NuxtLink
        :to="localePath(`/product/${product.slug}`)"
        :aria-label="t('pages.links.single_product', { name: product.name })"
        target="_blank"
        class="product-cart-link-wrapper"
      >
        <figure class="product-cart-figure">
          <ChangeableIconsSpecialOfferTag
            v-if="product.product_is_special_offer_product"
          />
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            width="120px"
            sizes="120px md:220px"
            height="120px"
            :loading="index ? 'lazy' : 'eager'"
            :preload="index == 0"
            v-if="product.image_url"
            :src="getUrl(product.image_url)"
            :alt="product.image_alt"
            :name="product.image_alt"
            :imgAttrs="{ class: 'product-cart-image' }"
          />
          <div v-else class="product-cart-image"></div>
          <figcaption class="product-cart-data">
            <div class="product-information-wrapper">
              <p class="product-cart-title">{{ product.name }}</p>
              <ReusableMyProductShipmentStatus
                :weight="Number(product.weight)"
                v-if="getAmountLeft(product)"
                :price="Number(product.discounted_price)"
              />
              <ReusableMyProductAvailable
                class="product-cart-left-amount"
                :leftAmount="getAmountLeft(product)"
              />
            </div>

            <div class="product-availability-wrapper">
              <ReusableMyProductUnavailable v-if="!getAmountLeft(product)" />
              <ReusableMyProductPriceSanitizer
                v-else
                :price="product.price"
                :showDiscountPercentage="true"
                :discountedPrice="product.discounted_price"
              />
            </div>
          </figcaption>
        </figure>
      </NuxtLink>
    </li>
  </ul>
  <ReusableMyNotFound title="pages.notFound.product" v-else />
</template>

<style lang="scss">
.products-wrapper {
  display: flex;
  flex-flow: row wrap;
  .product-cart-wrapper {
    flex-basis: 100%;
    .product-cart-link-wrapper {
      display: block;
      .product-cart-figure {
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid $border-color;
        position: relative;

        .product-cart-image {
          height: 120px;
          width: 120px;
          object-fit: cover;
        }
        .product-cart-data {
          height: 120px;
          width: calc(100% - 140px);
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          &.loading {
            width: 100%;
          }
          .product-information-wrapper {
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
            }
          }
          .product-availability-wrapper {
            align-self: flex-end;
          }
        }
      }
    }
    &:last-child {
      .product-cart-link-wrapper {
        .product-cart-figure {
          border: none;
        }
      }
    }
  }
  @include md {
    border-top: 1px solid $border-color;
    .product-cart-wrapper {
      flex-basis: 50%;
      .product-cart-link-wrapper {
        .product-cart-figure {
          border: 1px solid $border-color;
          padding: 10px;
          height: 440px;
          flex-direction: column;
          .product-cart-image {
            width: 220px;
            height: 220px;
            margin-top: 20px;
          }
          .product-cart-data {
            width: 220px;
            margin-bottom: 20px;
            .product-price-wrapper .discount-percentage {
              right: 33px;
            }
          }
        }
      }
      &:last-child {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border: 1px solid $border-color;
          }
        }
      }
      &:nth-child(odd) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-top: none;
          }
        }
      }
      &:nth-child(even) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-top: none;
            border-right: none;
          }
        }
      }
    }
  }
  @include xl {
    .product-cart-wrapper {
      flex-basis: 33%;
      &:nth-child(odd) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-right: none;
          }
        }
      }
      &:nth-child(3n + 1) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-right: 1px solid $border-color;
          }
        }
      }
    }
  }
  @include xxl {
    .product-cart-wrapper {
      flex-basis: 25%;
      &:nth-child(3n + 1) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-right: none;
          }
        }
      }
      &:nth-child(4n + 1) {
        .product-cart-link-wrapper {
          .product-cart-figure {
            border-right: 1px solid $border-color;
          }
        }
      }
    }
  }
}
</style>
