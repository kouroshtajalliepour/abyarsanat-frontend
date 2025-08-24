<script lang="ts" setup>
// * imports
import SvgArrowDown from "@/components/Svg/arrowDown.vue";
// * props
const props = defineProps<{
  modelValue?: string;
  options: any;
  optionsAsObject?: {
    key: string;
    value: string;
  };
  searchAble?: boolean;
  format?: any;
  labelFormat?: any;
  maxHeight?: number;
}>();
const emit = defineEmits(["update:modelValue"]);

// * computed data
const contentHeight = computed(() => {
  return inputSelectIsActive.value ? inputSelectWrapper.value.scrollHeight : 0;
});
const sanitizeModelValue = computed(() => {
  try {
    if (props.optionsAsObject) {
      if (!props.modelValue) {
        return "";
      }
      const key = props.optionsAsObject.key as any;
      const value = props.optionsAsObject.value as any;
      const result = props.options.filter(
        (option: any) => option[key] == props.modelValue
      )[0];
      if (!result) {
        return "";
      }
      if (props.labelFormat) {
        return props.labelFormat(result[value]);
      }
      return result[value];
    }
    return getValue(props.modelValue);
  } catch (error: any) {
    console.log("🚀 ~ sanitizeModelValue ~ error:", error);
  }
});

// * data
const inputSelectIsActive = ref(false);
const inputSelectWrapper = ref(null) as any;
const searchInputElement = ref(null) as any;
const searchInput = ref(sanitizeModelValue.value);
const filteredOptions = ref(props.options);

// * watchers
watch(
  () => sanitizeModelValue.value,
  () => {
    searchInput.value = sanitizeModelValue.value;
    filteredOptions.value = props.options;
  }
);
watch(
  () => props.options,
  () => {
    filteredOptions.value = props.options;
  }
);

watch(
  () => inputSelectIsActive.value,
  () => {
    if (props.searchAble) {
      if (inputSelectIsActive.value) {
        searchInputElement.value.focus();
      } else {
        searchInput.value = sanitizeModelValue.value;
        searchInputElement.value.blur();
      }
    }
  }
);

watch(
  () => searchInput.value,
  () => {
    const value = props.optionsAsObject?.value as any;
    filteredOptions.value = props.options;
    if (searchInput.value === sanitizeModelValue.value) return;
    if (searchInput.value.length) {
      filteredOptions.value = props.options.filter((option: any) => {
        if (value) {
          return option[value].includes(searchInput.value);
        } else {
          return option.includes(searchInput.value);
        }
      });
    }
  }
);

// * functions
function close() {
  inputSelectIsActive.value = false;
}
function open() {
  inputSelectIsActive.value = true;
}
function toggle() {
  inputSelectIsActive.value = !inputSelectIsActive.value;
}
function getValue(rawValue?: string) {
  if (props.format) {
    return props.format(rawValue);
  }
  return rawValue;
}
function getOptionKey(option: any) {
  if (props.optionsAsObject && props.optionsAsObject.key) {
    return option[props.optionsAsObject.key];
  }
  return option;
}
function getOptionValue(option: any) {
  if (props.optionsAsObject && props.optionsAsObject.value) {
    return option[props.optionsAsObject.value];
  }
  return option;
}

defineExpose({
  inputSelectIsActive,
  close,
  open,
  toggle,
});
</script>

<template>
  <div class="input-select-outer-wrapper">
    <div
      :class="['input-select-wrapper', inputSelectIsActive ? 'active' : '']"
      @click="inputSelectIsActive = !inputSelectIsActive"
    >
      <div class="input-select-title">
        <p v-if="!searchAble">{{ sanitizeModelValue }}</p>
        <input
          v-else
          type="text"
          v-model="searchInput"
          ref="searchInputElement"
          :class="[
            'input-select-search-input',
            sanitizeModelValue === searchInput ? 'active' : '',
          ]"
        />
        <SvgArrowDown class="arrow-down-icon" />
      </div>
      <ul
        ref="inputSelectWrapper"
        :class="[
          'input-select-options-wrapper',
          maxHeight && Number(contentHeight) > Number(maxHeight) ? 'scroll-needed' : '',
        ]"
        :style="{
          height: `${contentHeight}px`,
          maxHeight: maxHeight ? `${maxHeight}px` : 'unset',
        }"
      >
        <li
          :class="[
            'input-select-option',
            getOptionKey(option) == modelValue ? 'active' : '',
          ]"
          @click="emit('update:modelValue', getOptionKey(option))"
          v-if="!searchAble"
          v-for="option in options"
        >
          {{ getValue(getOptionValue(option)) }}
        </li>
        <li
          :class="[
            'input-select-option',
            getOptionKey(option) == modelValue ? 'active' : '',
          ]"
          @click="emit('update:modelValue', getOptionKey(option))"
          v-else
          v-for="option in filteredOptions"
        >
          {{ getValue(getOptionValue(option)) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.input-select-outer-wrapper {
  position: relative;
  .input-select-wrapper {
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    .input-select-title {
      border: 1px solid $border-color;
      border-radius: 10px;
      height: 40px;
      display: flex;
      padding: 12px 10px;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 12px;
      }
      .input-select-search-input {
        width: calc(100% - 30px);
        border: none;
        outline: none;
        cursor: pointer;
        background: transparent;
        &.active {
          color: $primary;
        }
      }
      .arrow-down-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        transition: transform 0.3s ease-out;
      }
    }
    .input-select-options-wrapper {
      position: absolute;
      top: calc(100% + 10px);
      width: 100%;
      background-color: white;
      overflow: hidden;
      transition: height 0.3s ease-out;
      &.scroll-needed {
        overflow-y: auto;
      }
      .input-select-option {
        padding: 10px 12px;
        font-size: 12px;
        border-bottom: 1px solid $border-color;
        &.active,
        &:hover {
          background-color: $gray-bg;
        }
        &.active {
          color: $primary;
        }
      }
    }
    &.active {
      .input-select-options-wrapper {
        border: 1px solid $border-color;
        border-radius: 10px;
      }
      .input-select-title {
        .arrow-down-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
