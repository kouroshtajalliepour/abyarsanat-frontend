<script lang="ts" setup>
// * props and emits
const props = defineProps<{
  slides: any;
  url_field: string;
  alt: string;
  url?: string;
  staticAlt?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  autoPlay?: number;
  modelValue?: number;
  loading?: boolean;
  preloadAllowed?: boolean;
  quality?: string;
  width: string;
  sizes: string;
  height: string;
}>();
const emit = defineEmits(["clickOnImage", "update:modelValue"]);

// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();
const img = useImage();

// * data
const currentSlide = ref(props.modelValue ? props.modelValue : 0) as any;
const mounted = ref(false);
// * watchers
watch(
  () => currentSlide.value,
  () => {
    emit("update:modelValue", currentSlide.value);
  }
);
watch(
  () => props.modelValue,
  () => {
    currentSlide.value = props.modelValue;
  }
);

// * functions
function handleClick(index: any) {
  emit("clickOnImage", index);
}

// * hooks
onMounted(() => {
  mounted.value = true;
});
onBeforeUnmount(() => {
  mounted.value = false;
});
</script>

<template>
  <div class="slider-wrapper">
    <NuxtPicture
      v-show="false"
      format="avif,webp"
      densities="x1 x2"
      :quality="quality ? quality : '80'"
      loading="eager"
      preload
      :width="width"
      :sizes="sizes"
      :height="height"
      v-if="slides?.length && preloadAllowed"
      :src="getUrl(slides[0][url_field])"
    />
    <Carousel
      touchDrag
      :mouseDrag="false"
      v-if="loading"
      :items-to-show="1"
      :wrap-around="false"
      dir="rtl"
    >
      <Slide class="slider-slide-wrapper">
        <span class="carousel__item slider-link-wrapper">
          <div class="slider-image skeleton-loader"></div>
        </span>
      </Slide>
    </Carousel>
    <Carousel
      touchDrag
      :mouseDrag="false"
      v-else-if="slides"
      :items-to-show="1"
      :wrap-around="true"
      :transition="300"
      :autoplay="mounted ? autoPlay : undefined"
      v-model="currentSlide"
      dir="rtl"
    >
      <Slide v-for="(slide, index) in slides" class="slider-slide-wrapper">
        <NuxtLink
          v-if="url"
          :to="localePath(slide[url])"
          :aria-label="t('pages.links.single_category', { name: slide[alt] })"
          class="carousel__item slider-link-wrapper"
        >
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            :quality="quality ? quality : '80'"
            :loading="!(url && index == 0 && preloadAllowed) ? 'lazy' : 'eager'"
            :width="width"
            :sizes="sizes"
            :height="height"
            v-if="slide && slide[url_field]"
            :src="getUrl(slide[url_field])"
            :alt="!staticAlt ? slide[alt] : alt"
            :name="slide[alt]"
            class="slider-image"
            :imgAttrs="{ class: 'slider-image' }"
          />
        </NuxtLink>
        <div
          v-else
          @click="handleClick(index)"
          class="carousel__item slider-link-wrapper"
        >
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            :quality="quality ? quality : '80'"
            :loading="!(!url && index == 0 && preloadAllowed) ? 'lazy' : 'eager'"
            :width="width"
            :sizes="sizes"
            :height="height"
            v-if="slide && slide[url_field]"
            :src="getUrl(slide[url_field])"
            :alt="!staticAlt ? slide[alt] : alt"
            :name="slide[alt]"
            class="slider-image"
            :imgAttrs="{ class: 'slider-image' }"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation v-if="navigation" />
        <Pagination v-if="pagination" />
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss">
.slider-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  .carousel {
    width: 100%;
    height: 100%;
    .carousel__viewport {
      width: 100%;
      height: 100%;
      .carousel__track {
        width: 100%;
        height: 100%;
      }
    }
  }
  .carousel__prev,
  .carousel__next {
    display: none;
    background-color: $gray-bg !important;
    color: black;
    border-radius: 50%;
    border: 1px solid $secondary;
    // display: flex;
    transition: transform 0.3s ease-out;
    top: calc(50% - 15px);
  }

  .slider-slide-wrapper {
    height: 100%;
    .slider-link-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      .slider-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .carousel__pagination {
    position: absolute;
    bottom: 10px;
    width: 100%;

    .carousel__pagination-button {
      padding: 2px !important;
      &::after {
        background-color: gray;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        transition: all 0.3s ease-out;
      }
    }
    .carousel__pagination-button--active {
      &::after {
        background-color: $primary;
        width: 13px;
        border-radius: 2px;
      }
    }
  }

  @include md {
    .carousel__prev,
    .carousel__next {
      display: flex;
    }
  }
  @include lg {
    .carousel__prev {
      transform: translateX(200%);
    }
    .carousel__next {
      transform: translateX(-200%);
    }
    &:hover {
      .carousel__prev,
      .carousel__next {
        display: flex;
        transform: translateX(0);
      }
    }
  }
}
</style>
