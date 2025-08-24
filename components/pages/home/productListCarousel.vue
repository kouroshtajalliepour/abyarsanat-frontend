<script lang="ts" setup>
// * imports
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";
import ReusableMyCarousel from "@/components/reusable/myCarousel.vue";
import ReusableMySlide from "@/components/reusable/mySlide.vue";
import ReusableMyProductCartElement from "@/components/reusable/myProduct/cartElement.vue";
// * composables
// * props
const props = defineProps<{
  products: any;
  title?: string;
  loading?: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="product-list-carousel-wrapper">
    <ReusableMyPageSmallTitle v-if="title" :title="title" />
    <ReusableMyCarousel
      :loading="true"
      class="product-list-carousel"
      :scrollAmount="250"
      :gap="10"
    >
      <ReusableMySlide v-for="i in 15">
        <ReusableMyProductCartElement :loading="true" />
      </ReusableMySlide>
    </ReusableMyCarousel>
  </div>
  <div v-else-if="products" class="product-list-carousel-wrapper">
    <ReusableMyPageSmallTitle v-if="title" :title="title" />
    <ReusableMyCarousel class="product-list-carousel" :scrollAmount="250" :gap="10">
      <ReusableMySlide v-for="product in products">
        <ReusableMyProductCartElement :product="product" />
      </ReusableMySlide>
    </ReusableMyCarousel>
  </div>
</template>

<style lang="scss">
.product-list-carousel-wrapper {
  width: 100%;
  align-items: center;
  position: relative;
  padding: 0 10px;

  .product-list-carousel {
    margin-bottom: 20px;
  }

  @include lg {
    padding: 50px 30px 0;
    position: static;
  }
}
</style>
