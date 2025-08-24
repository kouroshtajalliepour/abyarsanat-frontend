<script setup lang="ts">
// * imports
import ReusableMyModalContainer from "./container.vue";
// * composables
const route = useRoute();

// * props and emits
const props = defineProps<{
  modelValue: any;
}>();
const emit = defineEmits(["submit", "update:modelValue"]);

// * page data
const logoutModalIsClosing = ref(false);
const modalIsOpen = ref(props.modelValue ? true : false);

// * watchers
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      closeModal();
    } else {
      modalIsOpen.value = true;
    }
  }
);
watch(
  () => route.path,
  () => {
    emit("update:modelValue", false);
  }
);

// * functions
function closeModal() {
  logoutModalIsClosing.value = true;
  setTimeout(() => {
    modalIsOpen.value = false;
    logoutModalIsClosing.value = false;
  }, 290);
}
</script>

<template>
  <ReusableMyModalContainer
    @close="emit('update:modelValue', false)"
    v-if="modalIsOpen"
    :modalIsClosing="logoutModalIsClosing"
  >
    <slot />
  </ReusableMyModalContainer>
</template>

<style lang="scss">
.test {
  background: white;
}
</style>
