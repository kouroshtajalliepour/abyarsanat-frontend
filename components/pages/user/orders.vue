<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserTransactionStore } from "@/store/user/transaction";
import { useUserAuthStore } from "@/store/user/auth";
import PagesUserModulesOrderManagementPageAppHeader from "./modules/orderManagementPage/appHeader.vue";
import ChangeableIconsLoading from "@/components/changeableIcons/loading.vue";
import PagesUserModulesOrderManagementPageTransactions from "./modules/orderManagementPage/transactions.vue";
import PagesUserModulesOrderManagementPageNoOrderFound from "./modules/orderManagementPage/noOrderFound.vue";

// * composables
const userTransactionStore = useUserTransactionStore();
const userAuthStore = useUserAuthStore();
const { t, locale } = useI18n();
const { getUrl } = useUrl();
const route = useRoute();

// * store data
const {
  multiData: userTransactions,
  recordsFound: userTransactionsTotalCount,
  dataPages: userTransactionPages,
} = storeToRefs(userTransactionStore);

// * computed data
const transactions = computed(() => userTransactions.value);
// * data
const loading = ref(false);
const userTransactionManagementHeader = ref(null) as any;

const fullRoute = computed(() => {
  return route.fullPath.toString();
});

// * hooks

await useLazyAsyncData(
  "user-orders",
  () => {
    const query = {
      status: route.query.status,
    };
    return userTransactionStore.getMultiData({
      lang: locale.value,
      dataResult: "result",
      dataCountResult: "totalCount",
      preDefined: {
        verified: "1",
      },
      url: "/user/transaction",
      query,
      pageSize: 20,
      pageNumber: route.query.pageNumber,
      keepOldData: false,
    });
  },
  {
    watch: [fullRoute, userAuthStore.authToken],
  }
);

onMounted(() => {
  window.scroll(0, 0);
});
onUpdated(() => {
  window.scroll(0, 0);
});
watch(
  () => fullRoute,
  () => {
    window.scroll(0, 0);
  }
);
</script>

<template>
  <PagesUserModulesOrderManagementPageAppHeader ref="userTransactionManagementHeader" />
  <div class="user-page-body-wrapper" @click="userTransactionManagementHeader.close()">
    <div class="user-loading-wrapper" v-if="loading">
      <ChangeableIconsLoading />
    </div>
    <PagesUserModulesOrderManagementPageTransactions
      :transactionPages="userTransactionPages"
      :transactions="transactions"
      :totalCount="userTransactionsTotalCount"
      v-else-if="transactions && transactions.length"
    />
    <PagesUserModulesOrderManagementPageNoOrderFound v-else />
  </div>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
