<script setup lang="ts">
// * composables
const localePath = useLocalePath();
// * props
const props = defineProps<{
  to: string;
  ctx: string;
}>();
</script>

<template>
  <div class="page-button-wrapper">
    <button class="page-button" type="button" @click="navigateTo(localePath(to))">
      {{ ctx }}
    </button>
  </div>
</template>

<style lang="scss">
.page-button-wrapper {
  display: flex;
  justify-content: center;
  .page-button {
    background-color: $primary;
    color: white;
    padding: 8px;
    border-radius: 9px;
  }
}
</style>
