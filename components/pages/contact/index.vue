<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { usePageStore } from "@/store/page";
import ReusableMyPageTitle from "@/components/reusable/myPageTitle.vue";
import ReusableMyInfoBox from "@/components/reusable/myInfoBox.vue";
import PagesContactWaysBox from "./waysBox.vue";

// * composables
const pageStore = usePageStore();

// * store data
const { info } = storeToRefs(pageStore);
</script>

<template>
  <section>
    <ReusableMyPageTitle title="pages.contact.title" />
    <ReusableMyInfoBox info="pages.contact.information" />
    <div class="contact-us-container">
      <PagesContactWaysBox
        :address="info?.address"
        :postalCode="info?.postal_code"
        :salesNumber="info?.sale_number"
        :contactNumber="info?.contact_number"
        :supportNumber="info?.support_number"
        :email="info?.email"
        :workingHour="info?.working_hour"
      />
    </div>
  </section>
</template>

<style lang="scss">
.contact-us-container {
  width: 100%;
  padding: 0 20px;
}
</style>
