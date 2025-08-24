<script lang="ts" setup>
// * imports
import SvgXMark from "@/components/Svg/xMark.vue";
// * props
const props = defineProps<{
  title: string;
}>();
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="default-header-wrapper">
    <h3 class="default-header-title">
      {{ title }}
    </h3>
    <div class="default-header-controller">
      <slot />
      <SvgXMark class="default-header-icon" @click="emit('close')" />
    </div>
  </div>
</template>

<style lang="scss">
.default-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12.5px 3px;
  margin: 0 20px;
  border-bottom: 1px solid $primary;
  background-color: $optional-bg;
  .default-header-title {
    font-size: 1.2em;
    color: $secondary;
  }
  .default-header-controller {
    display: flex;
    align-items: center;
    .default-header-icon {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
</style>
