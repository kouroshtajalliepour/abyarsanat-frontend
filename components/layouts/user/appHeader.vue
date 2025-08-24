<script setup lang="ts">
// * imports
import SvgXMark from "@/components/Svg/xMark.vue";
import SvgActiveMenu from "@/components/Svg/activeMenu.vue";
// * composables
const { t } = useI18n();

// * props and emits
const props = defineProps<{
  modelValue: boolean;
  first_name: string;
  last_name: string;
}>();
const emit = defineEmits(["update:modelValue"]);

// * hooks
onBeforeUnmount(() => {
  document.body.classList.remove("user-modal-is-open");
});

onMounted(() => {
  document.body.classList.remove("user-modal-is-open");
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      document.body.classList.add("user-modal-is-open");
      return;
    }
    document.body.classList.remove("user-modal-is-open");
  }
);
</script>

<template>
  <div class="user-layout-header-wrapper">
    <div
      class="user-layout-header"
      type="button"
      @click="emit('update:modelValue', !modelValue)"
    >
      <SvgXMark v-if="modelValue" class="passive-icon" />
      <SvgActiveMenu v-else class="passive-icon" />
      <h5 class="header-title">{{ first_name }} {{ last_name }}</h5>
    </div>
  </div>
</template>

<style lang="scss">
.user-modal-is-open {
  overflow-y: hidden;
  @include lg {
    overflow-y: auto;
  }
}
.user-layout-header-wrapper {
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 1;

  svg {
    color: black;
    width: 24px;
    height: 24px;
  }
  .user-layout-header {
    height: 60px;
    background-color: $optional-bg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding: 17px 20px;
    border-bottom: 1px solid $primary;
    .header-title {
      font-size: 1em;
    }
  }
  @include lg {
    display: none;
  }
}
</style>
