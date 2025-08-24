<script lang="ts" setup>
// * imports
import PagesUserModulesInformationBox from "./modules/informationBox.vue";
// * props and emits
const emit = defineEmits(["openPhoneNumberModal", "openEditModal"]);
const props = defineProps<{
  user: any;
}>();
</script>

<template>
  <section class="user-information-management-page">
    <div class="user-information-wrapper">
      <PagesUserModulesInformationBox
        title="entities.fields.first_name"
        :context="user?.first_name"
        @openModal="emit('openEditModal')"
      />
      <PagesUserModulesInformationBox
        title="entities.fields.last_name"
        :context="user?.last_name"
        @openModal="emit('openEditModal')"
      />
    </div>
    <div class="user-information-wrapper">
      <PagesUserModulesInformationBox
        title="entities.fields.phone_number"
        :context="user?.phone_number"
        @openModal="emit('openPhoneNumberModal')"
      />
      <PagesUserModulesInformationBox
        title="entities.fields.email"
        :context="user?.email"
        @openModal="emit('openEditModal')"
      />
    </div>
  </section>
</template>

<style lang="scss">
.user-information-management-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
  .user-information-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:first-child {
      border-bottom: 1px solid $primary;
    }
  }
  @include lg {
    flex-direction: row;
    border: 1px solid $primary;
    background-color: $optional-bg;
    border-radius: 5px;
    .user-information-wrapper {
      padding: 20px;
      &:first-child {
        border-bottom: none;
        border-left: 1px solid $primary;
      }
    }
  }
}
</style>
