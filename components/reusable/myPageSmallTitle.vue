<script setup lang="ts">
// * props & emits
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div v-if="title" class="page-small-title-wrapper">
    <h2>{{ title }}</h2>
  </div>
</template>
<style lang="scss">
.page-small-title-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid $primary;
  position: sticky;
  top: calc($top-of-the-window-xs + 5px);
  z-index: 2;
  background-color: white;
  h2 {
    color: $secondary;
    font-size: 1.2em;
  }
  @include lg {
    position: static;
    h2 {
      font-size: 1.3em;
    }
  }
}
</style>
