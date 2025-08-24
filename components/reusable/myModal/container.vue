<script lang="ts" setup>
// * types
type IWrapperStyle = {
  background?: string;
  backdropFilter?: string;
};
type IModalStyle = {
  width?: string;
  height?: string;
};
// * props and emits
const props = defineProps<{
  wrapperStyle?: IWrapperStyle;
  modalStyle?: IModalStyle;
  modalIsClosing?: boolean;
}>();

const emit = defineEmits(["close"]);

watch(
  () => props.modalIsClosing,
  () => {
    if (props.modalIsClosing === true) {
      ModalIsClosing.value = true;
    }
  }
);

// * hooks
onBeforeUnmount(() => {
  ModalIsClosing.value = false;
  document.body.classList.remove("modal-is-open");
});
onBeforeMount(() => {
  setTimeout(() => {
    modalIsClosable.value = true;
  }, 290);
});

// * page data
const ModalIsClosing = ref(false);
const modalIsClosable = ref(false);
useHead(() => {
  return {
    bodyAttrs: {
      class: "modal-is-open",
    },
  };
});

// * function
function closeModal(e: any) {
  if (ModalIsClosing.value || !modalIsClosable.value) return;
  ModalIsClosing.value = true;
  emit("close");
  // setTimeout(() => {
  // }, 300);
}
</script>

<template>
  <div
    :class="['modal-wrapper', ModalIsClosing ? 'modal-wrapper-closing' : '']"
    @click.self="closeModal"
  >
    <div :class="['modal', ModalIsClosing ? ' modal-closing' : '']">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.modal-is-open {
  overflow: hidden !important;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: appear 0.3s ease-out;
  &.modal-wrapper-closing {
    animation: disappear 0.3s ease-out;
  }

  .modal {
    position: fixed;
    background-color: white;
    animation: slideUp 0.3s ease-out;
    &.modal-closing {
      animation: slideDown 0.3s ease-out;
    }
  }
}
</style>
