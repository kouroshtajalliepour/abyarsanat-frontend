<script lang="ts" setup>
// * imports
import SvgLoading from "@/components/Svg/loading.vue";

// * props
defineProps<{
  modalFooter?: boolean;
  loading?: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'modal-body custom-scroll-y',
      modalFooter ? 'submit-button-footer-included' : '',
    ]"
  >
    <slot />
    <div v-if="loading" class="loading-wrapper">
      <SvgLoading class="modal-body-loading" />
    </div>
  </div>
</template>

<style lang="scss">
.modal-body {
  overflow-y: auto;
  height: calc(100% - 55px);
  padding: 20px;
  position: relative;

  .loading-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-body-loading {
      width: 50px;
      height: 50px;
    }
  }

  &.modal-footer-included {
    height: calc(100% - 110px);
  }
}
</style>
