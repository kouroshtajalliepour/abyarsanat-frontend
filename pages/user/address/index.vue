<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import LayoutsUser from "@/components/layouts/user/index.vue";
import ModalGroupsAddressManagement from "@/components/modalGroups/addressManagement.vue";
import PagesUserAddress from "@/components/pages/user/address.vue";

// * page config
definePageMeta({
  pageTransition: { name: "user-page", mode: "out-in" },
});

// * props and emits
const emit = defineEmits(["openPhoneNumberModal", "openEditModal"]);

// * composables
const userStore = useUserAuthStore();

// * store data
const { user } = storeToRefs(userStore);

// * data
const addressManagement = ref(null) as any;

// * functions

function handleOpenUpdateModal(address: any) {
  addressManagement.value.triggerAddressUpdate(address);
}
function handleOpenDeleteModal(address: any) {
  addressManagement.value.triggerAddressDelete(address);
}
const { getUserPageData } = usePageData();
getUserPageData();
</script>

<template>
  <div>
    <ModalGroupsAddressManagement :user="user" ref="addressManagement" />
    <LayoutsUser>
      <PagesUserAddress
        @openCreateModal="addressManagement.openCreateModal()"
        @openUpdateModal="handleOpenUpdateModal"
        @openDeleteModal="handleOpenDeleteModal"
        :user="user"
      />
    </LayoutsUser>
  </div>
</template>

<style lang="scss"></style>
