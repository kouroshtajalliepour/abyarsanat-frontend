<script lang="ts" setup>
// * imports
import SvgTruck from "@/components/Svg/truck.vue";
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="widget-container">
    <div class="widget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M3.5 3A2.5 2.5 0 0 0 1 5.5V6h14v-.5A2.5 2.5 0 0 0 12.5 3zM15 7H1v3.5A2.5 2.5 0 0 0 3.5 13h9a2.5 2.5 0 0 0 2.5-2.5zm-4.5 3h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1"
        ></path>
      </svg>

      <p>{{ t("pages.widgets.payment") }}</p>
    </div>
    <div class="widget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M6 3q-.75 0-1.2.6L3.5 5.2c-.3.4-.5.8-.5 1.3V19c0 1.1.9 2 2 2h8.3c-.2-.6-.3-1.3-.3-2c0-3.3 2.7-6 6-6c.7 0 1.4.1 2 .3V6.5c0-.5-.2-.9-.5-1.3l-1.4-1.7c-.2-.3-.6-.5-1.1-.5zm-.1 1h12l.9 1H5.1zM6 15h6v3H6zm15.3.8l-3.6 3.6l-1.6-1.6L15 19l2.8 3l4.8-4.8z"
        ></path>
      </svg>

      <p>{{ t("pages.widgets.guarantee") }}</p>
    </div>
    <div class="widget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m7-7.5H5V9h8zm5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M17 12V9.5h2.5l1.96 2.5z"
        ></path>
      </svg>
      <p>{{ t("pages.widgets.shipment") }}</p>
    </div>
    <div class="widget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11 21v-2h8v-7.1q0-2.925-2.037-4.962T12 4.9T7.038 6.938T5 11.9V18H4q-.825 0-1.412-.587T2 16v-2q0-.525.263-.987T3 12.275l.075-1.325q.2-1.7.988-3.15t1.975-2.525T8.762 3.6T12 3t3.225.6t2.725 1.663t1.975 2.512t1 3.15l.075 1.3q.475.225.738.675t.262.95v2.3q0 .5-.262.95t-.738.675V19q0 .825-.587 1.413T19 21zm-2-7q-.425 0-.712-.288T8 13t.288-.712T9 12t.713.288T10 13t-.288.713T9 14m6 0q-.425 0-.712-.288T14 13t.288-.712T15 12t.713.288T16 13t-.288.713T15 14m-8.975-1.55Q5.85 9.8 7.625 7.9T12.05 6q2.225 0 3.913 1.412T18 11.026Q15.725 11 13.813 9.8t-2.938-3.25q-.4 2-1.687 3.563T6.025 12.45"
        ></path>
      </svg>
      <p>{{ t("pages.widgets.support") }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.widget-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: $optional-bg;
  align-items: center;
  flex-wrap: wrap;
  @include lg {
    padding: 0 20px 10px;
  }
}
.widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  gap: 10px;
  flex-basis: 50%;
  svg {
    width: 50px;
    height: 50px;
    color: $primary;
  }
  p {
    font-size: 12px;
    text-align: center;
    color: $gray-subtitle;
    width: 120px;
    @include lg {
      font-size: 15px;
      width: 100%;
    }
  }
  @include xl {
    flex-basis: 25%;
  }
}
</style>
