<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import AppFormsBinaryForm from "@/components/appForms/binaryForm.vue";
import LayoutsUserAppHeader from "@/components/layouts/user/appHeader.vue";
import LayoutsUserNav from "@/components/layouts/user/nav.vue";

// * composables
const { t } = useI18n();
const userStore = useUserAuthStore();
const localePath = useLocalePath();

// * store data
const { user, userNavBarIsOpen } = storeToRefs(userStore);

// * page data
const logoutModalIsOpen = ref(false);

// * functions
function logout() {
  userStore.logout();
  navigateTo(localePath("/"));
}
</script>

<template>
  <ReusableMyModal class="binary-form-modal-wrapper" v-model="logoutModalIsOpen">
    <AppFormsBinaryForm
      hint="pages.user.logoutHint"
      cancelTitle="pages.user.cancel"
      confirmTitle="pages.user.exit"
      @submit="logout"
      @cancel="logoutModalIsOpen = false"
    />
  </ReusableMyModal>
  <LayoutsUserAppHeader
    :first_name="user?.first_name"
    :last_name="user?.last_name"
    v-model="userNavBarIsOpen"
  />
  <div class="user-layout-wrapper">
    <LayoutsUserNav
      @logout="logoutModalIsOpen = true"
      :first_name="user?.first_name"
      :last_name="user?.last_name"
      :phone_number="user?.phone_number"
      v-model="userNavBarIsOpen"
    />
    <div :class="['user-page-wrapper', userNavBarIsOpen ? 'user-nav-is-closed' : '']">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.user-layout-wrapper {
  overflow: revert;
  width: 100%;
  min-height: $full-window-lg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .passive-icon {
    color: $secondary;
    width: 28px;
    height: 28px;
  }
  .active-icon {
    color: $primary;
    display: none;
    width: 28px;
    height: 28px;
  }
  .user-page-wrapper {
    width: 100%;
    transform: translateX(0%);
    transition: all 0.3s ease-out;
    &.user-nav-is-closed {
      transform: translateX(calc(-100% - 50px));
      display: none;
    }
  }
  @include lg {
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
    gap: 20px;
    .user-page-wrapper {
      transform: translateX(0) !important;
      animation: slideInFromLeft 0.3s ease !important;
      display: block !important;
    }
  }
}
</style>
