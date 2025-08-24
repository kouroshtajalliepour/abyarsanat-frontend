<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import AppFormsEditUserInfo from "@/components/appForms/editUserInfo.vue";
import LayoutsUser from "@/components/layouts/user/index.vue";
import PagesUser from "@/components/pages/user/index.vue";

// * page config
definePageMeta({
  pageTransition: { name: "user-page", mode: "out-in" },
});

// * props and emits
const emit = defineEmits(["openPhoneNumberModal", "openEditModal"]);

// * composables
const { t } = useI18n();
const userStore = useUserAuthStore();

// * store data
const { user } = storeToRefs(userStore);

// * data
const isPhoneNumberEditOpen = ref(false);
const User = ref({ ...(user.value ? user.value : {}) });
const isFormOpen = ref(false);
// * hooks
const { getUserPageData } = usePageData();
getUserPageData();
</script>

<template>
  <section>
    <!-- modals -->
    <ReusableMyModal
      v-model="isPhoneNumberEditOpen"
      class="app-default-modal-wrapper info-modal"
    >
      <ReusableMyModalHeaderDefault
        :title="t('entities.fields.id_info')"
        @close="isPhoneNumberEditOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <p>{{ t("pages.userInfo.phoneNumberEditHint") }}</p>
      </ReusableMyModalBodyDefault>
    </ReusableMyModal>
    <ReusableMyModal v-model="isFormOpen" class="app-default-modal-wrapper">
      <ReusableMyModalHeaderDefault
        :title="t('entities.fields.id_info')"
        @close="isFormOpen = false"
      />
      <ReusableMyModalBodyDefault>
        <AppFormsEditUserInfo @submit="isFormOpen = false" :user="User" />
      </ReusableMyModalBodyDefault>
    </ReusableMyModal>
    <!-- page -->
    <LayoutsUser>
      <PagesUser
        :user="user"
        @openPhoneNumberModal="isPhoneNumberEditOpen = true"
        @openEditModal="isFormOpen = true"
      />
    </LayoutsUser>
  </section>
</template>

<style lang="scss">
.user-update-basic-fields-form-wrapper {
  .form-fields {
    padding-bottom: 5px;
    label {
      color: $gray-icon;
      font-size: 15px;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 5px;
    }
  }
}
</style>
