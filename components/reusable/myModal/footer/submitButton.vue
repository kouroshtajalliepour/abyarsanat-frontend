<script lang="ts" setup>
import ReusableMyCheckoutButton from "@/components/reusable/myCheckoutButton.vue";
defineProps<{
  title: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["submit"]);
</script>

<template>
  <div class="submit-button-modal-footer">
    <ReusableMyCheckoutButton
      :disabled="disabled"
      :title="title"
      @submit="emit('submit')"
    />
  </div>
</template>

<style lang="scss">
.submit-button-modal-footer {
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  gap: 5px;
  border-top: 1px solid $secondary;
  height: 62px;
  margin: 0 20px;
  .checkout-button {
    width: 190px;
    padding: 0 20px;
    margin: 0;
    .checkout-button-title {
      font-size: 0.7em;
    }
  }
}
</style>
