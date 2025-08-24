<script lang="ts" setup>
// * imports
import LayoutsUser from "@/components/layouts/user/index.vue";
import PagesUserOrders from "@/components/pages/user/orders.vue";
// * composables
const { getUserPageData } = usePageData();
// * hooks
getUserPageData();
definePageMeta({
  pageTransition: { name: "user-page", mode: "out-in" },
});
</script>

<template>
  <div>
    <LayoutsUser>
      <PagesUserOrders />
    </LayoutsUser>
  </div>
</template>

<style lang="scss"></style>
