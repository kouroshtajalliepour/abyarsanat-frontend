<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAddressStore } from "@/store/user/address";
import { useNotificationStore } from "@/store/notification";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import AppFormsBinaryForm from "@/components/appForms/binaryForm.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import AppFormsCreateUserAddress from "@/components/appForms/createUserAddress.vue";

// * composables
const { t, locale } = useI18n();
const { validateIranianPhoneNumber } = useValidators();
const userAddressStore = useUserAddressStore();
const notificationStore = useNotificationStore();

// * store data
const { notifyClass, notifyTitle } = storeToRefs(notificationStore);

// * props
const props = defineProps<{
  user: any;
}>();
const emit = defineEmits(["afterAddressCreated"]);

// * data
const addressIsBeingAdded = ref(false);
const addressIsBeingUpdated = ref(false);
const addressIsBeingDeleted = ref(false);
const addressToUpdate = ref({});
const addressToDelete = ref({});
const newAddress = ref({
  name: "",
  province_name: "",
  city_name: "",
  postal_code: "",
  full_address: "",
  building_number: "",
  building_unit: "",
  recipient_phone_number: props.user ? props.user.phone_number : "",
  recipient_first_name: props.user ? props.user.first_name : "",
  recipient_last_name: props.user ? props.user.last_name : "",
});

// * functions
function validateAddress({
  name,
  province_name,
  city_name,
  province_id,
  city_id,
  postal_code,
  full_address,
  building_number,
  building_unit,
  recipient_phone_number,
  recipient_first_name,
  recipient_last_name,
}: any) {
  if (
    !name ||
    !province_name ||
    !city_name ||
    !province_id ||
    !city_id ||
    !postal_code ||
    !full_address ||
    !building_number ||
    !building_unit ||
    !recipient_phone_number ||
    !recipient_first_name ||
    !recipient_last_name
  ) {
    throw new Error(t("useCases.errors.general.allFieldsAreRequired"));
  }

  try {
    validateIranianPhoneNumber(recipient_phone_number);
  } catch (error) {
    throw new Error(t("useCases.errors.general.invalidPhoneNumber"));
  }
}
async function updateAddress() {
  try {
    validateAddress(addressToUpdate.value);
    await userAddressStore.updateData(addressToUpdate.value, locale.value);
    addressIsBeingUpdated.value = false;
    notifyClass.value = "success";
    notifyTitle.value = "pages.notifications.address.updated";
  } catch (error: any) {
    if (!error.statusCode) {
      notifyClass.value = "error";
      notifyTitle.value = error.message;
    } else {
      notifyClass.value = "error";
      notifyTitle.value = "useCases.errors.general.unExpected";
    }
  }
}
async function createAddress() {
  try {
    validateAddress(newAddress.value);
    await userAddressStore.createData(newAddress.value, locale.value);
    addressIsBeingAdded.value = false;
    emit("afterAddressCreated");
    notifyClass.value = "success";
    notifyTitle.value = "pages.notifications.address.created";
  } catch (error: any) {
    if (!error.statusCode) {
      notifyClass.value = "error";
      notifyTitle.value = error.message;
    } else {
      notifyClass.value = "error";
      notifyTitle.value = "useCases.errors.general.unExpected";
    }
  }
}
function triggerAddressUpdate(address: any) {
  console.log("updating brooo", address);
  try {
    addressToUpdate.value = address;
    addressIsBeingUpdated.value = true;
  } catch (error: any) {
    console.log("🚀 ~ triggerAddressUpdate ~ error:", error);
  }
}
function triggerAddressDelete(address: any) {
  addressToDelete.value = address;
  addressIsBeingDeleted.value = true;
}
function openCreateModal() {
  newAddress.value = {
    name: "",
    province_name: "",
    city_name: "",
    postal_code: "",
    full_address: "",
    building_number: "",
    building_unit: "",
    recipient_phone_number: props.user ? props.user.phone_number : "",
    recipient_first_name: props.user ? props.user.first_name : "",
    recipient_last_name: props.user ? props.user.last_name : "",
  };
  addressIsBeingAdded.value = true;
}
defineExpose({
  triggerAddressUpdate,
  triggerAddressDelete,
  openCreateModal,
});

async function deleteAddress() {
  try {
    await userAddressStore.deleteData(addressToDelete.value, locale.value);
    addressToDelete.value = {};
    addressIsBeingDeleted.value = false;
    notifyClass.value = "success";
    notifyTitle.value = "pages.notifications.address.deleted";
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
  }
}
</script>

<template>
  <ReusableMyModal
    v-model="addressIsBeingDeleted"
    class="binary-form-modal-wrapper upper-level-modal"
  >
    <ReusableMyModalBodyDefault>
      <AppFormsBinaryForm
        hint="pages.user.delete_address_info"
        cancelTitle="pages.user.cancel"
        confirmTitle="pages.user.deleteAddress"
        @submit="deleteAddress"
        @cancel="
          addressToDelete = {};
          addressIsBeingDeleted = false;
        "
      />
    </ReusableMyModalBodyDefault>
  </ReusableMyModal>
  <ReusableMyModal
    v-model="addressIsBeingAdded"
    class="app-default-modal-wrapper upper-level-modal"
  >
    <ReusableMyModalHeaderDefault
      :title="t('entities.fields.address_details')"
      @close="addressIsBeingAdded = false"
    />
    <ReusableMyModalBodyDefault>
      <AppFormsCreateUserAddress
        :condition="addressIsBeingAdded"
        :user="user"
        @formSubmit="createAddress"
        :userAddress="newAddress"
        @closeForm="addressIsBeingAdded = false"
      />
    </ReusableMyModalBodyDefault>
  </ReusableMyModal>
  <ReusableMyModal
    v-model="addressIsBeingUpdated"
    class="app-default-modal-wrapper upper-level-modal"
  >
    <ReusableMyModalHeaderDefault
      :title="t('entities.fields.address_details')"
      @close="addressIsBeingUpdated = false"
    />
    <ReusableMyModalBodyDefault>
      <AppFormsCreateUserAddress
        :condition="addressIsBeingUpdated"
        :user="user"
        @formSubmit="updateAddress"
        :userAddress="addressToUpdate"
        @closeForm="addressIsBeingUpdated = false"
      />
    </ReusableMyModalBodyDefault>
  </ReusableMyModal>
</template>

<style lang="scss">
.delete-address-wrapper {
  display: flex;
  padding-top: 20px;
  align-items: center;
  gap: 20px;
  button {
    padding: 5px 10px;
    color: white;
    background-color: $primary;
    border: 1px solid $primary;
    border-radius: 10px;
    min-width: 70px;
  }
}
</style>
