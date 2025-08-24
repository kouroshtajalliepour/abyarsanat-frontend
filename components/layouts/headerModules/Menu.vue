<script lang="ts" setup>
// * imports
import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import SvgArrowLeft from "@/components/Svg/arrowLeft.vue";
import ReusableMyPageTitle from "@/components/reusable/myPageTitle.vue";

// * composables
const localePath = useLocalePath();
const { t } = useI18n();
const pageStore = usePageStore();

// * store data
const { menu } = storeToRefs(pageStore);

// * page data
const selectedCategory = ref([menu.value[0]]);
const showProduct = (e: any) => {
  selectedCategory.value = menu.value.filter((category: any) => {
    return category.id === e;
  });
};
</script>

<template>
  <div class="app-menu-wrapper">
    <div class="title-wrapper">
      <ReusableMyPageTitle title="pages.categories.title" />
    </div>
    <ul class="app-menu-categories-wrapper custom-scroll-y" v-if="menu">
      <li v-for="category in menu" :key="category.id" :class="['app-menu-category']">
        <NuxtLink
          :to="localePath(`/category/${category.slug}`)"
          class="app-menu-category-context"
          v-if="category"
        >
          <span>{{ category.name }}</span>
          <SvgArrowLeft class="arrow-icon" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.app-menu-wrapper {
  position: static;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  .app-menu-categories-wrapper {
    margin-top: 40px;
    width: 100%;
    min-width: 165px;
    padding-right: 0 20px;
    .app-menu-category {
      display: flex;
      align-items: center;
      width: 100%;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      .app-menu-category-context {
        color: black;
        font-size: 14px;
        font-weight: 700;
        line-height: 2.17;
        padding: 12px 15px;
        // padding-bottom: 5px;
        border-bottom: 1px solid $primary;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .arrow-icon {
          width: 20px;
          height: 20px;
        }
      }
      &:hover,
      &.active-category {
        background-color: rgb(241, 242, 244, 0.5);
        .app-menu-category-context {
          color: $primary;
        }
      }
    }
    > :last-child {
      .app-menu-category-context {
        border-bottom: none;
      }
    }
  }
  @include lg {
    border-radius: 0 0 8px 8px;
    background-color: $optional-bg;
    box-shadow: 0 1px 1px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 30%);
    .title-wrapper {
      display: none;
    }
    .app-menu-categories-wrapper {
      margin-top: 0;
    }
  }
}
</style>
