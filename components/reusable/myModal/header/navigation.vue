<script lang="ts" setup>
// * imports
import SvgXMark from "@/components/Svg/xMark.vue";
// * props
const props = defineProps<{
  titles: string[];
  modelValue: number;
  unavailableIndexes: number[];
}>();
const emit = defineEmits(["close", "update:modelValue"]);

function handleNavigation(index: number) {
  //   console.log("🚀 ~ handleNavigation ~ index:", index)
  //   if (props.titles.length - props.modelValue > 1) {
  //     return;
  //   }
  if (props.unavailableIndexes.includes(index)) {
    return;
  }
  emit("update:modelValue", index);
}
</script>

<template>
  <div class="navigation-header-wrapper">
    <div class="navigation-header-titles-scroll-wrapper">
      <div class="navigation-header-titles-wrapper">
        <h3
          v-for="(title, index) in titles"
          @click="handleNavigation(index)"
          :class="[
            'navigation-header-title',
            modelValue >= index ? 'active' : '',
            unavailableIndexes.includes(index) ? 'no-allowed' : '',
          ]"
        >
          {{ title }}
        </h3>
      </div>
    </div>

    <div class="navigation-header-controller">
      <slot />
      <SvgXMark class="navigation-header-icon" @click="emit('close')" />
    </div>
  </div>
</template>

<style lang="scss">
.navigation-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12.5px 3px;
  margin: 0 20px;
  border-bottom: 1px solid $primary;
  //   background-color: $optional-bg;
  .navigation-header-titles-scroll-wrapper {
    overflow-x: auto;
    .navigation-header-titles-wrapper {
      display: flex;
      align-items: center;
      //   width: 410px;
      .navigation-header-title {
        color: #d7d7d7;
        cursor: pointer;
        margin: 0 35px;
        font-size: 1.1em;
        position: relative;
        &::before {
          content: "";
          width: 40px;
          height: 3px;
          background-color: #d7d7d7;
          position: absolute;
          bottom: calc(50% - 2.5px);
          right: -55px;
        }
        &.active,
        &:hover {
          color: #151a18;
          &::before {
            background-color: #151a18;
          }
        }
        &.no-allowed {
          color: #d7d7d7;
          cursor: not-allowed;
          &::before {
            background-color: #d7d7d7;
          }
        }
        &:first-child {
          margin-right: 0px;
          &::before {
            display: none;
          }
        }
      }
    }
  }
  .navigation-header-controller {
    display: flex;
    align-items: center;
    .navigation-header-icon {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
</style>
