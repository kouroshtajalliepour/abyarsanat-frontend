<script setup lang="ts">
// * props & emits
const props = defineProps<{
  title: string;
}>();
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="landing-box-wrapper">
    <h1>{{ t(title) }}</h1>
  </div>
</template>

<style lang="scss">
.landing-box-wrapper {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid $primary;
  border-radius: 100%/30%;

  @include lg {
    height: 250px;
  }
}
</style>
