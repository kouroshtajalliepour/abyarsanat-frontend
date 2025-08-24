<script setup lang="ts">
// * imports
import SvgEdit from "@/components/Svg/edit.vue";
import SvgActiveEdit from "@/components/Svg/activeEdit.vue";
import SvgProfile from "@/components/Svg/profile.vue";
import SvgActiveProfile from "@/components/Svg/activeProfile.vue";
import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";
import SvgMultiLocation from "@/components/Svg/multiLocation.vue";
import SvgActiveMultiLocation from "@/components/Svg/activeMultiLocation.vue";
import SvgShoppingBag from "@/components/Svg/shoppingBag.vue";
import SvgActiveShoppingBag from "@/components/Svg/activeShoppingBag.vue";
import SvgTruck from "@/components/Svg/truck.vue";
import SvgActiveTruck from "@/components/Svg/activeTruck.vue";
import SvgPhone from "@/components/Svg/phone.vue";
import SvgActivePhone from "@/components/Svg/activePhone.vue";
import SvgInfo from "@/components/Svg/info.vue";
import SvgActiveInfo from "@/components/Svg/activeInfo.vue";
import SvgLogout from "@/components/Svg/logout.vue";
import SvgActiveLogout from "@/components/Svg/activeLogout.vue";

// * composables
const localePath = useLocalePath();
const { t } = useI18n();
// * props & emits

const props = defineProps<{
  first_name: string;
  last_name: string;
  phone_number: string;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "logout"]);
</script>

<template>
  <nav :class="['user-layout-nav-wrapper', modelValue ? 'user-nav-is-open' : '']">
    <div class="user-layout-nav">
      <div class="user-nav-header">
        <div class="user-info-wrapper">
          <h5 class="user-nav-title">{{ first_name }} {{ last_name }}</h5>
          <p class="user-phone-number dir-ltr">
            {{ phone_number }}
          </p>
        </div>
        <NuxtLink
          @click="emit('update:modelValue', !modelValue)"
          class="edit-user-button-wrapper"
          :to="localePath('/user/info')"
          :aria-label="t('pages.links.user')"
        >
          <SvgEdit class="passive-icon" />
          <SvgActiveEdit class="active-icon" />
        </NuxtLink>
      </div>
      <div class="user-nav-body">
        <NuxtLink
          @click="emit('update:modelValue', !modelValue)"
          class="user-navigation-link"
          :to="localePath('/user/info')"
          :aria-label="t('pages.links.user')"
        >
          <SvgProfile class="passive-icon" />
          <SvgActiveProfile class="active-icon" />
          <h5 class="user-nav-title">{{ t("pages.user.profile") }}</h5>
          <SvgArrowLeft class="passive-icon left-arrow-icon" />
          <SvgArrowLeft class="active-icon left-arrow-icon" />
        </NuxtLink>
        <NuxtLink
          @click="emit('update:modelValue', !modelValue)"
          class="user-navigation-link"
          :to="localePath('/user/address')"
          :aria-label="t('pages.links.address')"
        >
          <SvgMultiLocation class="passive-icon" />
          <SvgActiveMultiLocation class="active-icon" />
          <h5 class="user-nav-title">{{ t("pages.user.address") }}</h5>
          <SvgArrowLeft class="passive-icon left-arrow-icon" />
          <SvgArrowLeft class="active-icon left-arrow-icon" />
        </NuxtLink>
        <NuxtLink
          @click="emit('update:modelValue', !modelValue)"
          class="user-navigation-link"
          :to="localePath('/user/orders?status=in-process')"
          :aria-label="t('pages.links.orders')"
        >
          <SvgShoppingBag class="passive-icon" />
          <SvgActiveShoppingBag class="active-icon" />
          <h5 class="user-nav-title">{{ t("pages.user.orders") }}</h5>
          <SvgArrowLeft class="passive-icon left-arrow-icon" />
          <SvgArrowLeft class="active-icon left-arrow-icon" />
        </NuxtLink>
        <NuxtLink
          class="user-navigation-link invisible-in-desktop"
          to="https://chaparnet.com/track/"
          target="_blank"
        >
          <SvgTruck class="passive-icon" />
          <SvgActiveTruck class="active-icon" />
          <h5 class="user-nav-title">
            {{ t("pages.logPage.tableName.order_tracking") }}
          </h5>
          <SvgArrowLeft class="passive-icon left-arrow-icon" />
          <SvgArrowLeft class="active-icon left-arrow-icon" />
        </NuxtLink>
        <NuxtLink
          class="user-navigation-link invisible-in-desktop"
          :to="localePath('/about')"
          :aria-label="t('pages.links.user')"
        >
          <SvgInfo class="passive-icon" />
          <SvgActiveInfo class="active-icon" />
          <h5 class="user-nav-title">{{ t("pages.about.title") }}</h5>
          <SvgArrowLeft class="passive-icon left-arrow-icon" />
          <SvgArrowLeft class="active-icon left-arrow-icon" />
        </NuxtLink>
        <button
          class="user-navigation-link logout-button"
          type="button"
          @click="emit('logout')"
          :name="t('pages.user.exit')"
          :aria-label="t('pages.links.user')"
        >
          <SvgLogout class="passive-icon" />
          <SvgActiveLogout class="active-icon" />
          <h5 class="user-nav-title">{{ t("pages.user.exit") }}</h5>
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.user-layout-nav-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  width: calc(100% - 50px);
  transform: translateX(calc(100% + 50px));
  position: fixed;
  transition: all 0.3s ease-out;

  &.user-nav-is-open {
    transform: translateX(0%);
  }
  .user-layout-nav {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid $primary;
    border-radius: 5px;
    padding: 20px;
    margin-top: 10px;
    gap: 10px;
    background-color: $optional-bg;
    align-items: flex-start;
    .user-nav-header {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 30px;
      border-bottom: 1px solid $primary;
      display: none;
      .user-info-wrapper {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .user-nav-title {
          font-size: 1em;
          color: $title-color;
        }
        .user-phone-number {
          color: $subTitle-color;
          font-weight: bolder;
          font-size: 1em;
        }
      }
      .edit-user-button-wrapper {
        width: 24px;
        &:hover,
        &.router-link-exact-active {
          .active-icon {
            display: block;
          }
          .passive-icon {
            display: none;
          }
        }
      }
    }
    .user-nav-body {
      display: flex;
      width: 100%;
      flex-direction: column;
      .user-navigation-link {
        display: flex;
        padding: 10px 0;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        text-align: center;
        width: 100%;
        position: relative;

        flex-direction: row;
        text-align: start;
        font-size: 16px;
        .user-nav-title {
          font-size: 1em;
          width: 100%;
          font-size: 15px;
        }

        &:hover,
        &.router-link-exact-active {
          .user-nav-title {
            color: $primary;
          }
          .active-icon {
            display: block;
          }
          .passive-icon {
            display: none;
          }
        }
        &.logout-button {
          background-color: $gray-bg;
          width: 50%;
          max-width: 180px;
          min-width: 150px;
          align-self: center;
          justify-content: center;
          align-content: center;
          margin-top: 40px;
          border-radius: 7px;
          padding: 10px 0;
          svg {
            position: absolute;
            color: black;
            right: 10px;
            bottom: calc(50% - 12px);
            width: 24px;
            height: 24px;
          }
          &:hover {
            .user-nav-title {
              color: $red;
            }
            .active-icon {
              color: $red;
            }
          }
          .user-nav-title {
            width: unset;
          }
        }

        .left-arrow-icon {
          position: absolute;
          left: 0;
          bottom: calc(50% - 12px);
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  @include lg {
    transform: translateX(0%) !important;
    margin: 0;
    min-width: 330px;
    width: unset;
    position: sticky;
    top: calc($top-of-the-window-lg + 5px);
    .user-layout-nav {
      margin-top: 0;
      .user-nav-header {
        display: flex;
      }
      .user-nav-body {
        .user-navigation-link {
          .left-arrow-icon {
            display: none !important;
          }
          &.invisible-in-desktop {
            display: none;
          }
        }
      }
    }
  }
}
</style>
