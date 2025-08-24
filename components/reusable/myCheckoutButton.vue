<script lang="ts" setup>
defineProps<{
  title: string;
  disabled?: boolean;
}>();

const emit = defineEmits(["submit"]);
</script>

<template>
  <button
    :disabled="disabled"
    type="button"
    @click="emit('submit')"
    class="checkout-button"
    :name="title"
  >
    <h5 class="checkout-button-title">
      {{ title }}
    </h5>
  </button>
</template>

<style lang="scss">
.checkout-button {
  width: 100%;
  background-color: $primary;
  font-size: 1.3em;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 2px 0px;
  height: 50px;
  cursor: pointer;
  .checkout-button-title {
    color: #fff;
  }
  &:disabled {
    background-color: $gray-bg;
  }
  @include lg {
    opacity: 0.9;
    transition: opacity 0.2s ease-out;
    margin-top: 25px;
    height: 50px;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
