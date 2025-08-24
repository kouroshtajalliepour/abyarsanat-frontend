<script lang="ts" setup>
// * imports
import ChangeableIconsNoAddressFound from "@/components/changeableIcons/noAddressFound.vue";
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="no-address-found-wrapper">
    <ChangeableIconsNoAddressFound class="no-address-found-icon" />
    <span class="no-address-found-description">{{
      t("pages.user.notAvailableAddress")
    }}</span>
  </div>
</template>

<style lang="scss">
.no-address-found-wrapper {
  border: 1px solid $border-color;
  border-radius: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .no-address-found-description {
    color: $subTitle-color;
  }
  .no-address-found-icon {
    width: 200px;
    height: 200px;
  }
}
</style>
