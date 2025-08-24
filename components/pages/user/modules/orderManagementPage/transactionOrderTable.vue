<script lang="ts" setup>
const { t } = useI18n();
defineProps<{
  transaction: any;
}>();

const { sanitizePrice, sanitizeQuantity, sanitizeTotalPrice } = useProduct();
</script>

<template>
  <table class="transaction-order-table-wrapper">
    <thead>
      <tr>
        <th scope="col">{{ t("pages.userOrderManagement.productTitle") }}</th>
        <th scope="col">{{ t("pages.userOrderManagement.productPrice") }}</th>
        <th scope="col">{{ t("pages.userOrderManagement.productDiscountedPrice") }}</th>
        <th scope="col">{{ t("pages.userOrderManagement.productProfit") }}</th>
        <th scope="col">{{ t("pages.userOrderManagement.productQuantity") }}</th>
        <th scope="col">{{ t("pages.userOrderManagement.productTotal") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in transaction.cart_items" :key="item.id">
        <td scope="row" class="item-name">
          <span>{{ item.name }}</span>
        </td>
        <td class="center-align-td" v-if="!item.selectedModel?.price_is_dynamic">
          {{ sanitizePrice(item.selectedModel.price) }}
        </td>
        <td class="center-align-td" v-else>
          {{ t("pages.products.priceIsDynamicTitle") }}
        </td>
        <td class="center-align-td" v-if="!item.selectedModel?.price_is_dynamic">
          {{
            sanitizePrice(
              (item.selectedModel.price - item.selectedModel.discounted_price) / 10
            )
          }}
        </td>
        <td class="center-align-td" v-else>
          {{ t("pages.products.priceIsDynamicTitle") }}
        </td>
        <td class="center-align-td" v-if="!item.selectedModel?.price_is_dynamic">
          {{ sanitizePrice(item.selectedModel.discounted_price) }}
        </td>
        <td class="center-align-td" v-else>
          {{ t("pages.products.priceIsDynamicTitle") }}
        </td>
        <td class="center-align-td">
          {{ sanitizeQuantity(item.quantity) }}
        </td>
        <td v-if="!item.selectedModel?.price_is_dynamic">
          {{ sanitizeTotalPrice(item.selectedModel.discounted_price, item.quantity) }}
        </td>
        <td v-else>{{ t("pages.products.priceIsDynamicTitle") }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="stay-white">
        <th scope="row" colspan="5">
          {{ t("pages.userOrderManagement.transactionTotal") }}
        </th>
        <th class="center-align-td">
          {{ sanitizePrice(transaction.total_amount) }}
        </th>
      </tr>
      <tr v-if="transaction.promotion_slug" class="stay-white">
        <th scope="row" colspan="5">
          {{ t("pages.userOrderManagement.transactionPromotion") }}
        </th>
        <th class="center-align-td">{{ transaction.promotion_slug }}</th>
      </tr>
      <tr v-if="transaction.promotion_discount_price" class="stay-white">
        <th scope="row" colspan="5">
          {{ t("pages.userOrderManagement.transactionProfit") }}
        </th>
        <th class="center-align-td">
          {{ sanitizePrice(transaction.promotion_discount_price) }}
        </th>
      </tr>
      <tr v-if="transaction.promotion_discount_percentage" class="stay-white">
        <th scope="row" colspan="5">
          {{ t("pages.userOrderManagement.transactionDiscountPercentage") }}
        </th>
        <th class="center-align-td">
          {{ transaction.promotion_discount_percentage }}
        </th>
      </tr>
      <tr>
        <th scope="row" colspan="5">
          {{ t("pages.userOrderManagement.transactionTotalAfterPercentage") }}
        </th>
        <th class="center-align-td">
          {{ sanitizePrice(transaction.total_promoted_amount) }}
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss">
.transaction-order-table-wrapper {
  border-collapse: collapse;
  border: 2px solid $primary;
  font-family: sans-serif;
  width: 100%;
  font-size: 12px;
  thead,
  tfoot {
    background-color: $optional;
    .stay-white {
      background-color: white;
    }
  }

  th,
  td {
    border: 1px solid $primary;
    padding: 8px 10px;
  }

  td:first-of-type {
    border: none;
  }
  td:last-of-type {
    text-align: center;
  }

  tbody > tr:nth-of-type(even) {
    background-color: rgb(237 238 242);
  }

  tfoot th {
    text-align: right;
  }

  tfoot td {
    font-weight: bold;
  }

  .item-name {
    display: flex;
    align-items: center;
    font-weight: 700;
    height: 50px;
    width: 100%;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 12px;
    @include md {
      font-size: 13px;
      height: unset;
      width: unset;
    }
  }
  .center-align-td {
    text-align: center;
  }
  @include lg {
    font-size: 13px;
  }
}
</style>
