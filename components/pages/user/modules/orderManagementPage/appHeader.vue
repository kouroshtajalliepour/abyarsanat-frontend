<script lang="ts" setup>
// * imports
import ReusableMyInputsSelect from "@/components/reusable/myInputs/select.vue";
// * composables
const { t } = useI18n();
const route = useRoute();

// * data
const selectedSort = ref(
  route.query.status ? route.query.status.toString() : "in-process"
);

function format(text: string) {
  return t(`pages.userOrders.sorts.${text}`);
}

const options = ref(["in-process", "completed", "canceled"]);

// * watchers
//  todo : move down a level
watch(
  () => selectedSort.value,
  () => {
    navigateTo({ query: { ...route.query, status: selectedSort.value } });
  }
);
watch(
  () => route.query.status,
  () => {
    if (route.query.status && route.query.status.toString() !== selectedSort.value) {
      selectedSort.value = route.query.status.toString();
    }
  }
);
const transactionSortsSelect = ref(null) as any;

function close() {
  transactionSortsSelect.value.close();
}

defineExpose({
  close,
});
</script>

<template>
  <header class="user-layout-wrapper-header" @click.self="transactionSortsSelect.close()">
    <h5 class="user-layout-wrapper-header-title" @click="transactionSortsSelect.close()">
      {{ t("pages.user.ordersHistory") }}
    </h5>
    <div @click.self="transactionSortsSelect.close()" class="orders-sort-wrapper">
      <ReusableMyInputsSelect
        ref="transactionSortsSelect"
        v-model="selectedSort"
        :format="format"
        :options="options"
      />
    </div>
  </header>
</template>

<style lang="scss">
.orders-sort-wrapper {
  width: 150px;
}
</style>
