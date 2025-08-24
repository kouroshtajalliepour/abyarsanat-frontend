<script lang="ts" setup>
// * imports
import jmoment from "jalali-moment";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";
import ReusableMyAccordion from "@/components/reusable/myAccordion.vue";
import PagesUserModulesOrderManagementPageTransactionOrderTable from "./transactionOrderTable.vue";
import ReusableMyPagination from "@/components/reusable/myPagination.vue";

// * composables
const { sanitizePrice, sanitizeTotalPrice } = useProduct();
const { t, locale } = useI18n();
const route = useRoute();
const { getUrl } = useUrl();

// * props and emits
const props = defineProps<{
  transactions: any;
  transactionPages: any;
  totalCount: any;
}>();

// * data
const pageNumber = ref(route.query.pageNumber ? Number(route.query.pageNumber) : 1);
// * watchers
watch(
  () => [route.query.status, route.query.pageNumber],
  (newValue, oldValue) => {
    if (newValue[0] !== oldValue[0]) {
      if (pageNumber.value != 1) {
        pageNumber.value = 1;
        return;
      }
    }
  }
);
watch(
  () => pageNumber.value,
  () => {
    navigateTo({ query: { ...route.query, pageNumber: pageNumber.value.toString() } });
  }
);
</script>

<template>
  <div class="user-orders-wrapper">
    <div class="user-order-cart" v-for="transaction in transactions">
      <div class="user-order-cart-information" v-if="transaction">
        <p class="user-order-cart-information-context">
          <span>{{ t("pages.user.paymentAmount") }}:</span>
          {{ sanitizePrice(transaction.total_amount) }}
          <ReusableMyCurrency />
        </p>
        <p class="user-order-cart-information-context">
          <span>{{ t("pages.user.orderNumber") }}:</span>{{ transaction.payment_id }}
        </p>
        <p class="user-order-cart-information-context">
          <span>{{ t("pages.user.orderDate") }}:</span
          >{{ jmoment(transaction.created_at).locale(locale).calendar() }}
        </p>
      </div>
      <div
        class="user-order-cart-products-wrapper"
        v-if="transaction.cart_items && transaction.cart_items.length"
      >
        <!-- todo: make it a carousel -->
        <div
          class="user-order-cart-product"
          v-for="(product, index) in transaction.cart_items"
          :key="index"
        >
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            width="100px"
            height="100px"
            sizes="100px"
            v-if="
              product.mobile_image_url || product.image_url || product.model_image_url
            "
            :src="
              product.model_image_url
                ? product.model_image_url
                : product.image_url
                ? product.image_url
                : product.mobile_image_url
            "
            alt="product-picture"
            name="product-picture"
            :imgAttrs="{ class: 'user-order-cart-product-image' }"
          />
          <p class="user-order-cart-product-context">
            {{ product.name }} ({{ product.price_based_on }} :
            {{ product.selectedModel?.name }})
          </p>
          <p class="user-order-cart-product-context">
            <span>{{ t("pages.product.qty") }} : </span>{{ product.quantity }}
          </p>
          <p class="user-order-cart-product-context">
            {{
              sanitizeTotalPrice(
                product.selectedModel?.discounted_price,
                product.quantity
              )
            }}
            <ReusableMyCurrency />
          </p>
        </div>
      </div>
      <ReusableMyAccordion :title="t('pages.user.bill')">
        <div class="user-order-table-wrapper custom-scroll-x">
          <PagesUserModulesOrderManagementPageTransactionOrderTable
            :transaction="transaction"
          />
          <div class="user-order-recipient-info-wrapper">
            <!-- Front-end web developer course 2021 -->
            <div class="user-order-recipient-info">
              <h5 class="user-order-recipient-info-title">
                {{ t("pages.user.receiver") }} :
              </h5>
              <p>
                {{ transaction.recipient_first_name }}
                {{ transaction.recipient_last_name }}
              </p>
            </div>
            <div class="user-order-recipient-info">
              <h5 class="user-order-recipient-info-title">
                {{ t("entities.fields.full_address") }} :
              </h5>
              <p>{{ transaction.full_address }}</p>
            </div>
          </div>
        </div>
      </ReusableMyAccordion>
    </div>
    <ReusableMyPagination
      v-if="transactionPages && transactionPages.length"
      v-model="pageNumber"
      :pages="transactionPages"
    />
  </div>
</template>

<style lang="scss">
.user-orders-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  .user-order-cart {
    padding: 10px;
    border: 1px solid $primary;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    .accordion-wrapper {
      border-color: $primary;
      background-color: $optional-bg;
      .arrow-down-icon {
        color: $primary;
      }
      .accordion-title {
        p {
          color: $secondary;
        }
      }
    }

    .user-order-cart-information {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: $text-color;
      flex-direction: column;
      gap: 4px;

      .user-order-cart-information-context {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
      }
    }
    .user-order-cart-products-wrapper {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      margin: 20px 0;
      .user-order-cart-product {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 0 5px;
        flex-basis: 50%;
        .user-order-cart-product-image {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
        .user-order-cart-product-context {
          font-size: 0.9em;
          display: -webkit-box;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: center;
        }
      }
    }
    .user-order-table-wrapper {
      width: 100%;
      .user-order-recipient-info-wrapper {
        padding: 20px 0;
        gap: 10px;
        .user-order-recipient-info {
          display: flex;
          align-items: center;
          gap: 5px;
          .user-order-recipient-info-title {
            font-size: 1em;
            // font-weight: bold;
          }
        }
      }
    }
  }
  @include sm {
    .user-order-cart {
      .user-order-cart-products-wrapper {
        .user-order-cart-product {
          flex-basis: 33%;
        }
      }
    }
  }
  @include md {
    .user-order-cart {
      .user-order-table-wrapper {
        gap: 20px;
        flex-direction: row;
      }
    }
  }
  @include lg {
    .user-order-cart {
      gap: 8px;
      padding: 20px 30px;
      .user-order-cart-products-wrapper {
        .user-order-cart-product {
          flex-basis: 25%;
        }
      }
      .user-order-cart-information {
        flex-direction: row;
        align-items: center;
        gap: 0;
        .user-order-cart-information-context {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
