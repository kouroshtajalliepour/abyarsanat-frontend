<script setup lang="ts">
// * imports
import ChangeableIconsNotFound from "@/components/changeableIcons/notFound.vue";
// * props
defineProps<{
  title: string;
}>();
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="not-found-wrapper">
    <ChangeableIconsNotFound />
    <h5>{{ t(title) }}</h5>
  </div>
</template>

<style lang="scss">
.not-found-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;
  padding: 30px 0;
  svg {
    width: 90px;
    height: 90px;
    fill: $border-color;
  }
}
</style>
