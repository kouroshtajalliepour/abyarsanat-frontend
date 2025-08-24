<script lang="ts" setup>
// * imports
import { useNotificationStore } from "@/store/notification";
import { storeToRefs } from "pinia";
import SvgXMark from "@/components/Svg/xMark.vue";

// * composables
const notificationStore = useNotificationStore();
const { t } = useI18n();

// * store data
const { notifyTitle, notifyClass } = storeToRefs(notificationStore);

// * page data
const barWidth = ref(100);

// * watchers

watch(
  () => notifyTitle.value,
  () => {
    barWidth.value = 100;
    trigger();
  }
);

// * functions

let timeout: any;

function closeNotification() {
  notifyTitle.value = "";
  notifyClass.value = "";
  clearTimeout(timeout);
}

function trigger() {
  timeout = setTimeout(() => {
    if (barWidth.value) {
      barWidth.value -= 1;
      trigger();
    } else {
      closeNotification();
    }
  }, 50);
}
function stopNotificationClosingAnimation() {
  clearTimeout(timeout);
}
function resumeNotificationClosingAnimation() {
  if (barWidth.value) {
    trigger();
  }
}
</script>
<template>
  <div
    @mouseenter="stopNotificationClosingAnimation"
    @mouseleave="resumeNotificationClosingAnimation"
    :class="['notification-wrapper', notifyClass]"
    v-if="notifyTitle && notifyClass"
  >
    <div class="info-wrapper">
      <SvgXMark @click="closeNotification" class="passive-icon" />
      <p class="notification-title">
        {{ t(notifyTitle) }}
      </p>
    </div>
    <div class="bar">
      <div class="bar-indicator" :style="`width: ${barWidth}%`"></div>
    </div>
  </div>
</template>

<style lang="scss">
.notification-wrapper {
  position: fixed;
  top: 20px;
  width: 300px;
  min-height: 60px;
  background-color: $gray-bg;
  border: 1px solid $secondary;
  left: calc(50vw - 150px);
  border-radius: 10px;
  z-index: 30;
  cursor: pointer;
  animation: slideFromUp 0.3s ease-out;
  overflow: hidden;
  .info-wrapper {
    padding: 20px;
    display: flex;
    // justify-content: center;
    align-items: center;
    .notification-title {
      width: calc(100% - 50px);
    }
    .passive-icon {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .bar {
    flex-basis: 100%;
    background: transparent;
    border-top: 1px solid $border-color;
    height: 5px;
    display: flex;
    justify-content: flex-end;
    .bar-indicator {
      height: 100%;
      background: $secondary;
      transition: all ease-out;
    }
  }
  &.success {
    border-color: $green;
    .bar {
      .bar-indicator {
        background: $green;
      }
    }
  }
  &.error {
    border-color: $red;
    .bar {
      .bar-indicator {
        background: $red;
      }
    }
  }
  &.warning {
    border-color: $warning;
    .bar {
      .bar-indicator {
        background: $warning;
      }
    }
  }
}
</style>
