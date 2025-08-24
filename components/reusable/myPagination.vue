<script lang="ts" setup>
// * imports
// import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";
import SvgArrowDown from "@/components/Svg/arrowDown.vue";
// import SvgArrowRight from "@/components/Svg/arrowRight.vue";

// * props and emits
const props = defineProps<{
  modelValue: number;
  pages: number[];
}>();
const emit = defineEmits(["update:modelValue"]);

// * data
function pageExists(page: any) {
  return props.pages.some((Page: any) => Page == page);
}
function changePage(page: any) {
  if (pageExists(page)) {
    emit("update:modelValue", page);
  }
}
const visiblePages = ref([]) as any;

// * hooks
onMounted(() => {
  getVisiblePage();
});

// * functions
function getVisiblePage() {
  if (props.pages.length < 5) {
    visiblePages.value = [...props.pages];
  } else {
    if (Number(props.modelValue) > 4) {
      const yo = props.pages.length - props.modelValue < 3;
      if (yo) {
        visiblePages.value = [
          props.pages[0],
          ...props.pages.slice(props.pages.length - 5, props.pages.length),
        ];
      } else {
        visiblePages.value = [
          props.pages[0],
          props.pages[props.modelValue - 2],
          props.pages[props.modelValue - 1],
          props.pages[props.modelValue],
          props.pages[props.pages.length - 1],
        ];
      }
    } else {
      visiblePages.value = [
        ...props.pages.slice(0, 5),
        props.pages[props.pages.length - 1],
      ];
    }
  }
}

// * watchers
watch(
  () => props.modelValue,
  () => {
    getVisiblePage();
  }
);
</script>

<template>
  <ul class="pagination-wrapper">
    <li class="pagination-button-wrapper">
      <button
        name="previous-button"
        class="pagination-button navigation"
        type="button"
        :disabled="!pageExists(modelValue - 1)"
        @click="changePage(modelValue - 1)"
      >
        <SvgArrowDown class="arrow-icon" />
      </button>
    </li>
    <li class="pagination-button-wrapper" v-for="(page, index) in visiblePages">
      <button
        name="pagination-button"
        :class="['pagination-button', page == modelValue ? 'active' : '']"
        type="button"
        @click="changePage(page)"
      >
        <span class="context">{{ page }}</span>
      </button>

      <button
        name="next-button"
        v-if="
          !!(index == 0 && modelValue > 4) ||
          !!(index == 3 && modelValue > 4 && pages.length - modelValue >= 3) ||
          !!(modelValue < 5 && index == 4 && pages.length > 5)
        "
        class="pagination-button passive"
        type="button"
      >
        <span class="context">...</span>
      </button>
    </li>
    <li class="pagination-button-wrapper">
      <button
        class="pagination-button navigation"
        :disabled="!pageExists(modelValue + 1)"
        type="button"
        name="pagination-button"
        @click="changePage(modelValue + 1)"
      >
        <SvgArrowDown class="arrow-icon right" />
      </button>
    </li>
  </ul>
</template>

<style lang="scss">
.pagination-wrapper {
  display: flex;
  justify-content: center;
  direction: ltr;
  margin-top: 50px;
  .pagination-button-wrapper {
    .pagination-button {
      margin: 0 5px;
      padding: 6px;
      background-color: white;
      border: 1px solid $primary;
      border-radius: 50%;
      height: 32px;
      width: 32px;
      font-size: 0.8em;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $optional-bg;
      &.navigation {
        padding: 6px;
      }
      .arrow-icon {
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
        &.right {
          transform: rotate(270deg);
        }
      }
      .context {
        height: 20px;
        width: 20px;
        color: $primary;
      }

      &.active,
      &:hover {
        border-color: $primary;
        color: $secondary;
        background-color: $primary;
        .context {
          color: $optional-bg;
        }
      }
      &:disabled {
        cursor: not-allowed;
        color: $primary;
        border-color: $primary;
        background-color: $optional-bg;
        .context {
          color: black;
        }
      }
      &.passive {
        cursor: default;
        color: black;
        border-color: $primary;
      }
    }
  }
}
</style>
