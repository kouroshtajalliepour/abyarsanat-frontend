<script lang="ts" setup>
const localePath = useLocalePath();
const { getUserPageData } = usePageData();
getUserPageData();
onBeforeMount(() => {
  navigateTo(localePath("/user/info"));
});
definePageMeta({
  pageTransition: { name: "user-page", mode: "out-in" },
});
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
