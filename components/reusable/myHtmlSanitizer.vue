<script lang="ts" setup>
// * imports
import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";

// * composables
const { t } = useI18n();

// * props
const props = defineProps<{
  contents: any;
  height?: string;
  inline?: boolean;
}>();

// * page data

const htmlSanitizerIsOpen = ref(false);
const htmlSanitizer = ref(null) as any;
const scrollHeight = ref(0);
onMounted(() => {
  scrollHeight.value = htmlSanitizer.value?.scrollHeight;
});
watch(
  () => htmlSanitizer.value,
  () => {
    scrollHeight.value = htmlSanitizer.value?.scrollHeight;
  }
);
const contentHeight = computed(() => {
  if (!props.height) {
    return undefined;
  }
  return htmlSanitizerIsOpen.value ? scrollHeight.value : props.height;
});
</script>

<template>
  <div class="html-sanitizer-wrapper">
    <div
      :class="['html-sanitizer', !inline ? 'add-space' : '']"
      ref="htmlSanitizer"
      :style="{ height: contentHeight + 'px' }"
    >
      <div v-for="content in contents" v-html="content?.context"></div>
    </div>
    <div
      v-if="height && contentHeight && scrollHeight > Number(height)"
      :class="[
        'html-sanitizer-controller',
        !htmlSanitizerIsOpen ? 'active' : '',
        !inline ? 'add-space' : '',
      ]"
    >
      <button
        name="expansion-button"
        type="button"
        @click="htmlSanitizerIsOpen = !htmlSanitizerIsOpen"
      >
        {{ t(`pages.general.${!htmlSanitizerIsOpen ? "open" : "close"}`) }}
        <SvgArrowLeft />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.html-sanitizer-wrapper {
  position: relative;
  margin-bottom: 10px;
  .html-sanitizer-controller {
    position: absolute;
    bottom: -20px;
    right: 20px;
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: white;
    button {
      color: $primary;
      display: flex;
      align-items: center;
      font-size: 0.9em;
      svg {
        margin: 0 5px;
        width: 16px;
        height: 16px;
      }
    }
    &.active {
      &:before {
        content: "";
        width: 100%;
        height: 50px;
        background-color: $white;
        opacity: 0.6;
        position: absolute;
        top: -45px;
        right: 0;
      }
    }
  }
  .html-sanitizer {
    display: block;
    width: calc(100% - 40px);
    margin: 0 20px;
    overflow: hidden;
    transition: height 0.3s ease-out;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin: 10px 0;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: auto;
      margin: 10px 0;
    }
  }
  @include lg {
    .html-sanitizer {
      &.add-space {
        width: calc(100% - 100px);
        margin: 0 50px;
      }
    }
    .html-sanitizer-controller {
      &.add-space {
        width: calc(100% - 50px);
        margin: 0 25px;
      }
    }
  }
}
</style>
