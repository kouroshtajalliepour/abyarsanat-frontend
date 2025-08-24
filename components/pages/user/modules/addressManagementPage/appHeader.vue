<script lang="ts" setup>
// * props and emits
const props = defineProps<{
  allowedToAddAddress: boolean;
}>();
const emit = defineEmits(["openCreateModal"]);
// * composables
const { t } = useI18n();
</script>

<template>
  <header class="user-layout-wrapper-header">
    <h5 class="user-layout-wrapper-header-title">{{ t("pages.user.address") }}</h5>
    <button
      v-if="allowedToAddAddress"
      @click="emit('openCreateModal')"
      type="button"
      class="add-address-button"
      :name="t('pages.user.add')"
    >
      {{ t("pages.user.add") }} +
    </button>
    <span v-else class="max-addresses-reached-hint">{{
      t("pages.user.limited_address")
    }}</span>
  </header>
</template>

<style lang="scss">
.user-layout-wrapper-header {
  .add-address-button {
    width: 100px;
    padding: 5px 20px;
    background-color: $primary;
    border-radius: 10px;
    display: flex;
    text-align: center;
    color: white;
    &:disabled {
      background-color: $border-color;
    }
  }
  .max-addresses-reached-hint {
    color: $danger;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    @include lg {
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>
