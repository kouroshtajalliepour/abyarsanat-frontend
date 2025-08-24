<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAddressStore } from "@/store/user/address";
import PagesUserModulesAddressManagementPageAppHeader from "./modules/addressManagementPage/appHeader.vue";
import ChangeableIconsLoading from "@/components/changeableIcons/loading.vue";
import PagesUserModulesAddressManagementPageAddresses from "./modules/addressManagementPage/addresses.vue";
import PagesUserModulesAddressManagementPageNoAddressFound from "./modules/addressManagementPage/noAddressFound.vue";

// * props and emits
const props = defineProps<{
  user: any;
}>();
const emit = defineEmits(["openCreateModal", "openUpdateModal", "openDeleteModal"]);

// * composables
const userAddressStore = useUserAddressStore();
const { t, locale } = useI18n();

// * store data
const { multiData: userAddresses, loading } = storeToRefs(userAddressStore);

// * hooks
onMounted(async () => {
  try {
    await userAddressStore.getMultiData({
      lang: locale.value,
      dataResult: "result",
      dataCountResult: "totalCount",
      preDefined: {},
      url: "/user/address",
      query: {},
      pageSize: 20,
      keepOldData: false,
    });
  } catch (error) {}
});
</script>

<template>
  <PagesUserModulesAddressManagementPageAppHeader
    :allowedToAddAddress="!!(!userAddresses || userAddresses.length < 20)"
    @openCreateModal="emit('openCreateModal')"
  />
  <div class="user-page-body-wrapper">
    <div class="user-loading-wrapper" v-if="loading">
      <ChangeableIconsLoading />
    </div>

    <PagesUserModulesAddressManagementPageAddresses
      v-else-if="userAddresses && userAddresses.length"
      :userAddresses="userAddresses"
      @openUpdateModal="emit('openUpdateModal', $event)"
      @openDeleteModal="emit('openUpdateModal', $event)"
    />
    <PagesUserModulesAddressManagementPageNoAddressFound v-else />
  </div>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
