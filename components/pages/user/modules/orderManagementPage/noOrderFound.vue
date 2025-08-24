<script lang="ts" setup>
// * imports
import ChangeableIconsNoOrderFound from "@/components/changeableIcons/noOrderFound.vue";
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="no-order-container">
    <ChangeableIconsNoOrderFound />
    <span>{{ t("pages.user.notAvailableOrder") }}</span>
  </div>
</template>

<style lang="scss">
.no-order-container {
  border: 1px solid $border-color;
  border-radius: 10px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  span {
    color: $subTitle-color;
  }
  svg {
    width: 100px;
    height: 100px;
  }
}
</style>
