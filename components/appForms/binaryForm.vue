<script lang="ts" setup>
const props = defineProps<{
  hint: string;
  cancelTitle: string;
  confirmTitle: string;
}>();
const emit = defineEmits(["cancel", "submit"]);
const { t } = useI18n();
</script>

<template>
  <p class="binary-form-hint">{{ t(hint) }}</p>
  <div class="binary-form-controls-wrapper">
    <button
      :name="t(cancelTitle)"
      class="binary-form-control cancel"
      type="button"
      @click="emit('cancel')"
    >
      {{ t(cancelTitle) }}
    </button>
    <button
      :name="t(confirmTitle)"
      class="binary-form-control"
      type="button"
      @click="emit('submit')"
    >
      {{ t(confirmTitle) }}
    </button>
  </div>
</template>

<style lang="scss">
.binary-form-hint {
  font-size: 0.9em;
}
.binary-form-controls-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  .binary-form-control {
    padding: 7px 5px;
    min-width: 60px;
    opacity: 0.9;
    background: $secondary;
    border-radius: 5px;
    border: 1px solid $border-color;
    &.cancel {
      background: $primary;
      margin-left: 5px;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
