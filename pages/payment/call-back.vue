<script setup lang="ts">
// * imports
import { useCartStore } from "@/store/user/cart";
import PagesPayment from "@/components/pages/payment/index.vue";

// * composables
const cartStore = useCartStore() as any;
const route = useRoute();
const { t } = useI18n();

// * page data
const paymentStatus = ref("loading");

// * hooks
onMounted(async () => {
  const { status, Status, authority, Authority } = route.query;
  const statusCode = Status ? Status : status;

  if (statusCode && statusCode.toString().toLowerCase() == "ok") {
    try {
      await cartStore.verifyPayment(Authority ? Authority : (authority as string));
      paymentStatus.value = "ok";
      useHead({
        title: t("pages.seo.payment.success"),
      });
    } catch (error) {
      paymentStatus.value = "error";
      useHead({
        title: t("pages.seo.payment.error"),
      });
    }
  } else {
    paymentStatus.value = "error";
    useHead({
      title: t("pages.seo.payment.error"),
    });
  }
});
</script>

<template>
  <main>
    <PagesPayment
      :paymentStatus="paymentStatus"
      v-if="cartStore.successPayment"
      :successPayment="cartStore.successPayment"
    />
  </main>
</template>

<style lang="scss">
.some-class {
  display: block;
}
</style>
