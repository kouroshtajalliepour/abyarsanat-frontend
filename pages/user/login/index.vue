<script lang="ts" setup>
// * imports
import PagesUserLogin from "@/components/pages/user/login.vue";
const { getUserPageData } = usePageData();
getUserPageData();
</script>

<template>
  <div>
    <PagesUserLogin />
  </div>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
