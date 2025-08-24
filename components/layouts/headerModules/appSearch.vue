<script lang="ts" setup>
// * imports
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import AppFormsAppSearch from "@/components/appForms/appSearch.vue";
import SvgSearch from "@/components/Svg/search.vue";
import ChangeableIconsLogo from "@/components/changeableIcons/logo.vue";
// * composables
const { t } = useI18n();

// * props & emits
const emit = defineEmits(["openModal", "closeModal"]);
const props = defineProps<{
  minimal?: boolean;
}>();

// * page data
const searchMenuIsOpen = ref(false);
const searchMenuIsClosing = ref(false);

// * watchers
watch(
  () => searchMenuIsOpen.value,
  (value) => {
    emit(value ? "openModal" : "closeModal");
  }
);

// * functions

function openModal() {
  searchMenuIsOpen.value = true;
}
function closeSearchBar() {
  searchMenuIsClosing.value = true;
  setTimeout(() => {
    searchMenuIsOpen.value = false;
    searchMenuIsClosing.value = false;
  }, 290);
}
</script>

<template>
  <ReusableMyModal class="search-bar-modal-wrapper" v-model="searchMenuIsOpen">
    <AppFormsAppSearch @close="searchMenuIsOpen = false" />
  </ReusableMyModal>
  <div v-if="!minimal" class="search-wrapper">
    <div @click="openModal" class="search-activator">
      <SvgSearch class="passive-icon" />
      <p class="search-description mobile">{{ t("pages.products.mobileSearch") }}</p>
      <p class="search-description desktop">{{ t("pages.products.search") }}</p>
      <div class="search-mobile-logo">
        <span>
          <ChangeableIconsLogo index="2" class="logo-wrapper" />
        </span>
      </div>
    </div>
    <AppFormsAppSearch
      class="search-bar"
      v-if="searchMenuIsOpen"
      @close="closeSearchBar()"
      :searchMenuIsClosing="searchMenuIsClosing"
    />
    <div
      v-if="searchMenuIsOpen"
      class="search-bar-curtain"
      @click.self="closeSearchBar()"
    ></div>
  </div>
  <div @click="openModal" v-else>
    <SvgSearch class="passive-icon" />
  </div>
</template>

<style lang="scss">
.search-bar-modal-wrapper {
  .modal {
    width: 100%;
    height: 100%;
  }
  @include lg {
    display: none !important;
  }
}

.search-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .search-activator {
    width: 100%;
    height: 100%;
    border: 1px solid $border-color;
    padding: 6px 10px;
    border-radius: 0.375rem;
    cursor: text;
    align-items: center;
    display: flex;
    color: black;
    .search-description {
      font-size: 1em;
      font-weight: 100;
      &.desktop {
        display: none;
      }
    }
    .passive-icon,
    .active-icon {
      margin-left: 10px;
    }
    .search-mobile-logo {
      display: flex;
      width: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      span {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .logo-wrapper {
          width: 100%;
          height: 100%;
          margin-right: 5px;
          svg {
            height: 24px;
          }
        }
      }
    }
  }
  .search-bar-curtain {
    animation: disappear 0.3s ease-out;
    display: none;
  }
  .search-bar {
    width: 100%;
    height: 100%;
    z-index: 7;
    display: none;
    position: absolute;
    top: 0;
  }

  @include lg {
    .search-activator {
      .search-description {
        &.mobile {
          display: none;
        }
        &.desktop {
          display: block;
        }
      }
      .search-mobile-logo {
        display: none;
      }
    }
    .search-bar-curtain {
      display: block;
      width: 100vw;
      height: 100vh;
      position: fixed;
      animation: appear 0.3s ease-out;
      top: 0px;
      left: 0px;
      z-index: 5;
    }
    .search-bar {
      display: block;
    }
  }
}
</style>
