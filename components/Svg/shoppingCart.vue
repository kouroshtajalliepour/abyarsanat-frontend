<template>
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M104 216a16 16 0 1 1-16-16a16 16 0 0 1 16 16m88-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m47.71-125.86l-25.64 92.28A24.06 24.06 0 0 1 191 184H92.16A24.06 24.06 0 0 1 69 166.42L33.92 40H16a8 8 0 0 1 0-16h24a8 8 0 0 1 7.71 5.86L57.19 64H232a8 8 0 0 1 7.71 10.14M221.47 80H61.64l22.81 82.14a8 8 0 0 0 7.71 5.86H191a8 8 0 0 0 7.71-5.86Z"
      ></path>
    </svg>
    <span class="quantity-tag-wrapper" v-if="cartItems && cartItems.length">
      <span class="quantity-tag">{{ cartItems.length }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  cartItems?: {
    id: string;
    quantity: number;
  }[];
}>();
</script>

<style lang="scss">
.active-icon {
  position: relative;
  .quantity-tag-wrapper {
    position: absolute;
    bottom: -3px;
    right: -7px;
    width: 15px;
    height: 13px;
    font-size: 0.8em;
    background-color: $primary;
    border: 1px solid $primary;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    .quantity-tag {
      color: white;
    }
  }
}
</style>
