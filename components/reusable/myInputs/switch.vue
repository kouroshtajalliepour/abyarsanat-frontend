<script lang="ts" setup>
// * props and emits
const props = defineProps<{
  modelValue: boolean;
  title: string;
  id: string;
}>();
const emit = defineEmits(["update:modelValue"]);
// * data
const value = ref(props.modelValue);

// * watchers
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
watch(
  () => value.value,
  () => {
    emit("update:modelValue", value.value);
  }
);
</script>

<template>
  <label :for="`switch-${id}`" class="switch-wrapper">
    <p class="switch-title">{{ title }}</p>
    <div class="switch">
      <input :id="`switch-${id}`" type="checkbox" v-model="value" />
      <span class="switch-slider round"></span>
    </div>
  </label>
</template>

<style lang="scss">
.switch-wrapper {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  .switch-title {
    font-size: 0.9em;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      &:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
    }
    input:checked + .switch-slider {
      background-color: $secondary;
    }
    input:checked + .switch-slider:before {
      transform: translateX(20px);
    }
    .switch-slider.round {
      border-radius: 34px;
    }
    .switch-slider.round:before {
      border-radius: 50%;
    }
  }
}
</style>
