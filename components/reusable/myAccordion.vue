<script setup lang="ts">
// * imports
import SvgArrowDown from "@/components/Svg/arrowDown.vue";

// * props
defineProps<{
  title?: string;
}>();

// * data
const accordionIsActive = ref(false);
const accordionWrapper = ref(null) as any;
const contentHeight = computed(() => {
  return accordionIsActive.value ? accordionWrapper.value.scrollHeight : 0;
});
</script>

<template>
  <div :class="['accordion-wrapper', accordionIsActive ? 'active' : '']">
    <!-- :aria-controls="`accordion-content-${title}`" -->
    <button
      type="button"
      @click="accordionIsActive = !accordionIsActive"
      class="accordion-title"
      :name="title"
    >
      <p>{{ title }}</p>
      <SvgArrowDown class="arrow-down-icon" />
    </button>
    <div
      ref="accordionWrapper"
      class="accordion-content"
      :style="{ height: contentHeight + 'px' }"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.accordion-wrapper {
  width: 100%;
  overflow: hidden;
  border: 1px solid $border-color;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .accordion-title {
    height: 50px;
    width: 100%;
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 1em;
    }
    .arrow-down-icon {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease-out;
    }
  }
  .accordion-content {
    overflow: hidden;
    padding: 0 20px;
    transition: height 0.3s ease-out;
  }
  &.active {
    .accordion-title {
      .arrow-down-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
