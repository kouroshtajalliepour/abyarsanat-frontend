<script lang="ts" setup>
// * imports
import SvgRadio from "@/components/Svg/radio.vue";
import SvgCheckBox from "@/components/Svg/checkBox.vue";
import SvgActiveRadio from "@/components/Svg/activeRadio.vue";
import SvgActiveCheckBox from "@/components/Svg/activeCheckBox.vue";

// * props and emits
const props = defineProps<{
  modelValue?: string | string[];
  options: any;
  id: string | number;
  optionsAsObject?: {
    key: string;
    value: string;
  };
  multiple?: boolean;
  format?: any;
  maxHeight?: number;
}>();
const emit = defineEmits(["update:modelValue"]);

// * data

const value = ref(props.multiple && !props.modelValue ? [] : props.modelValue);

// * watchers

watch(
  () => value.value,
  () => {
    emit("update:modelValue", value.value);
  }
);

// * functions
function getValue(rawValue: string) {
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
const activeOptions = computed(() => {
  return props.options.map((option: any) => {
    const value = getOptionKey(option);
    if (props.multiple) {
      return Array.isArray(props.modelValue) && props.modelValue.includes(value);
    }
    return value === props.modelValue;
  });
});
</script>

<template>
  <ul class="option-selection-input-wrapper">
    <li
      :class="[
        'option-selection-input-option-wrapper',
        activeOptions[index] ? 'active' : '',
      ]"
      v-for="(option, index) in options"
    >
      <label class="option-selection-input-option-label" :for="`radio-${id}-${index}`">
        <input
          v-model="value"
          :value="getOptionKey(option)"
          :id="`radio-${id}-${index}`"
          :type="multiple ? 'checkbox' : 'radio'"
          class="option-selection-input"
        />
        <SvgRadio class="option-selection-input-passive-icon" v-if="!multiple" />
        <SvgCheckBox class="option-selection-input-passive-icon" v-else />
        <SvgActiveRadio class="option-selection-input-active-icon" v-if="!multiple" />
        <SvgActiveCheckBox class="option-selection-input-active-icon" v-else />
        <p class="option-selection-input-title">{{ getValue(getOptionValue(option)) }}</p>
      </label>
    </li>
  </ul>
</template>

<style lang="scss">
.option-selection-input-wrapper {
  .option-selection-input-option-wrapper {
    .option-selection-input-option-label {
      cursor: pointer;
      display: flex;
      padding: 5px;
      .option-selection-input {
        opacity: 0;
        width: 0;
        width: 0;
      }
      .option-selection-input-passive-icon,
      .option-selection-input-active-icon {
        width: 24px;
        height: 24px;
        margin-left: 5px;
      }
      .option-selection-input-active-icon {
        display: none;
      }
      .option-selection-input-title {
        font-size: 1em;
      }
    }
    &.active {
      .option-selection-input-option-label {
        .option-selection-input-active-icon {
          display: block;
          color: $primary;
        }
        .option-selection-input-passive-icon {
          display: none;
        }
      }
    }
    &.active,
    &:hover {
      background-color: $gray-bg;
    }
  }
}
</style>
