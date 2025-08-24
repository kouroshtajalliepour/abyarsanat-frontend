<script setup lang="ts">
// * imports
import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";
import SvgArrowRight from "@/components/Svg/arrowRight.vue";

// * props
const props = defineProps<{
  scrollAmount: number;
  gap: number;
  loading?: boolean;
}>();

// * data
const isDragging = ref(false);
const startX = ref(0);
const scrollStart = ref(0);
const itemsWrapper = ref<HTMLElement | null>(null);
const scrollWidth = ref(0);
const clientWidth = ref(0);
const scrollLeft = ref(0);

// * hooks

onMounted(() => {
  if (itemsWrapper.value) {
    scrollWidth.value = itemsWrapper.value.scrollWidth;
    clientWidth.value = itemsWrapper.value.clientWidth;
  }

  document
    .querySelectorAll(".carousel-wrapper, .carousel-wrapper *")
    .forEach(function (el) {
      el.addEventListener("dragstart", function (e) {
        e.preventDefault();
      });
    });
});

// * functions

function updateScrollLeft() {
  if (itemsWrapper.value) {
    scrollLeft.value = itemsWrapper.value.scrollLeft;
  }
}
function smoothScroll(element: HTMLElement, targetScrollLeft: number, duration = 300) {
  const startScrollLeft = element.scrollLeft;
  const distance = targetScrollLeft - startScrollLeft;
  const startTime = performance.now();

  function step(timestamp: number) {
    const currentTime = timestamp - startTime;
    element.scrollLeft = easeInOutQuad(currentTime, startScrollLeft, distance, duration);
    if (currentTime < duration) {
      requestAnimationFrame(step);
    }
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(step);
}
function handleLeft() {
  if (itemsWrapper.value) {
    const targetScrollLeft = itemsWrapper.value.scrollLeft - props.scrollAmount;
    smoothScroll(itemsWrapper.value, targetScrollLeft);
  }
}

function handleRight() {
  if (itemsWrapper.value) {
    const targetScrollLeft = itemsWrapper.value.scrollLeft + props.scrollAmount;
    smoothScroll(itemsWrapper.value, targetScrollLeft);
  }
}
function preventClick(event: Event) {
  event.preventDefault();
}
function startDrag(event: MouseEvent) {
  if (props.loading) {
    return;
  }
  isDragging.value = true;
  startX.value = event.clientX;
  scrollStart.value = scrollLeft.value;
}

function handleDrag(event: MouseEvent) {
  if (props.loading) {
    return;
  }
  // document.querySelectorAll(".carousel-wrapper *").forEach((link) => {
  //   link.addEventListener("click", preventClick);
  // });
  if (!isDragging.value || !itemsWrapper.value) {
    // document.querySelectorAll(".carousel-wrapper *").forEach((link) => {
    //   link.removeEventListener("click", preventClick);
    // });
    return;
  }
  const deltaX = event.clientX - startX.value;
  itemsWrapper.value.scrollLeft = scrollStart.value - deltaX;
  if (deltaX < 15) {
    // document.querySelectorAll(".carousel-wrapper *").forEach((link) => {
    //   link.removeEventListener("click", preventClick);
    // });
  }
}

function endDrag() {
  isDragging.value = false;
}
</script>

<template>
  <div
    :class="['carousel-wrapper', loading ? 'loading' : '']"
    @mousedown="startDrag"
    @mousemove="handleDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <ul
      ref="itemsWrapper"
      @scroll="updateScrollLeft"
      :style="`gap: ${gap}px;`"
      class="carousel-items-wrapper"
    >
      <slot />
    </ul>
    <button
      class="carousel-actions left-button"
      type="button"
      v-if="Math.abs(scrollLeft) != scrollWidth - clientWidth"
      @click="handleLeft"
      name="previous-button"
    >
      <SvgArrowLeft />
    </button>
    <button
      class="carousel-actions right-button"
      type="button"
      v-if="scrollLeft < 0"
      @click="handleRight"
      name="next-button"
    >
      <SvgArrowRight />
    </button>
  </div>
</template>

<style lang="scss">
.carousel-wrapper {
  width: 100%;
  position: relative;
  * {
    user-select: none;
  }
  .carousel-items-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    display: flex;
  }
  &.loading {
    .carousel-items-wrapper {
      overflow-x: hidden;
    }
  }
  .carousel-actions {
    display: none;
  }
  @include md {
    // .carousel-items-wrapper {
    //     overflow-x: hidden;
    // }
    .carousel-actions {
      display: block;
      position: absolute;
      background-color: white;
      top: calc(50% - 21px);
      border: 1px solid $primary;
      border-radius: 50%;
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: center;
      svg {
        color: $primary;
        width: 18px;
        height: 18px;
      }
      &.left-button {
        left: 0;
      }
    }
    &.loading {
      .carousel-actions {
        display: none;
      }
    }
  }
}
</style>
