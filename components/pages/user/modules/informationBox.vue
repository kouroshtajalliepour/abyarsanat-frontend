<script lang="ts" setup>
// * imports
import SvgEdit from "@/components/Svg/edit.vue";
import SvgActiveEdit from "@/components/Svg/activeEdit.vue";

// * props and emits
defineProps<{
  context: string;
  title: string;
}>();
const emit = defineEmits(["openModal"]);

// * composables
const { t } = useI18n();
</script>

<template>
  <div class="user-information">
    <div class="user-information-current-value">
      <h5 class="user-information-title">{{ t(title) }}</h5>
      <p class="user-information-current-value-context">
        {{ context }}
      </p>
    </div>
    <div class="user-profile-edit" @click="emit('openModal')">
      <SvgEdit class="passive-icon" />
      <SvgActiveEdit class="active-icon" />
    </div>
  </div>
</template>

<style lang="scss">
.user-information {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  height: 85px;
  align-items: center;
  justify-content: space-between;
  &:first-child {
    border-bottom: 1px solid $primary;
  }

  .user-information-current-value {
    display: flex;
    flex-direction: column;
    .user-information-title {
      display: flex;
      align-items: center;
      font-weight: bolder;
      margin-bottom: 10px;
      font-size: 1em;
      font-weight: 600;
    }
  }
  .user-profile-edit {
    width: 24px;
    cursor: pointer;
    .active-icon,
    .passive-icon {
      width: 22px;
      height: 22px;
      color: black;
    }
    &:hover {
      .active-icon {
        display: block;
        color: $primary;
      }
      .passive-icon {
        display: none;
      }
    }
  }
  @include lg {
    height: 100px;
    .user-information-current-value {
      .user-information-title {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
