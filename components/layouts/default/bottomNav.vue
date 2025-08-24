<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/user/cart";
import { useUserAuthStore } from "@/store/user/auth";
import SvgMenu from "@/components/Svg/menu.vue";
import SvgActiveMenu from "@/components/Svg/activeMenu.vue";
import SvgReturn from "@/components/Svg/return.vue";
import SvgHome from "@/components/Svg/home.vue";
import SvgActiveHome from "@/components/Svg/activeHome.vue";
import SvgShoppingCart from "@/components/Svg/shoppingCart.vue";
import SvgActiveShoppingCart from "@/components/Svg/activeShoppingCart.vue";
import SvgLogin from "@/components/Svg/login.vue";
import SvgActiveLogin from "@/components/Svg/activeLogin.vue";
import SvgProfile from "@/components/Svg/profile.vue";
import SvgActiveProfile from "@/components/Svg/activeProfile.vue";
import SvgLoading from "@/components/Svg/loading.vue";

// * props and emits
const props = defineProps<{
  loading?: boolean;
}>();

// * composables
const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserAuthStore();

// * store data
const { user, authToken } = storeToRefs(userStore);
const { cartItems } = storeToRefs(cartStore);

// * function
function routeIsUserRelated() {
  return route.path.toString().includes("/user");
}
</script>

<template>
  <div class="bottom-nav-bar-reserved-space"></div>
  <ul class="bottom-nav-bar-container">
    <li class="bottom-nav-link-wrapper">
      <NuxtLink
        v-if="route.fullPath !== '/categories'"
        :to="localePath('/categories')"
        :aria-label="t('pages.links.category')"
        class="bottom-nav-link"
      >
        <SvgMenu class="passive-icon" />
        <SvgActiveMenu class="active-icon" />
        <p>{{ t("pages.products.categories") }}</p>
      </NuxtLink>
      <span v-else @click="router.back()" class="bottom-nav-link">
        <SvgReturn class="passive-icon" />
        <SvgReturn class="active-icon" />
        <p>{{ t("buttons.back") }}</p>
      </span>
    </li>
    <li class="bottom-nav-link-wrapper">
      <NuxtLink
        :to="localePath('/')"
        :aria-label="t('pages.links.home')"
        class="bottom-nav-link"
      >
        <SvgHome class="passive-icon" />
        <SvgActiveHome class="active-icon" />
        <p>{{ t("pages.logPage.tableName.home_page") }}</p>
      </NuxtLink>
    </li>
    <li class="bottom-nav-link-wrapper">
      <NuxtLink
        :to="localePath('/cart')"
        :aria-label="t('pages.links.cart')"
        class="bottom-nav-link"
      >
        <SvgShoppingCart :cartItems="cartItems" class="passive-icon" />
        <SvgActiveShoppingCart :cartItems="cartItems" class="active-icon" />
        <p>{{ t("pages.cart.cart") }}</p>
      </NuxtLink>
    </li>
    <li class="bottom-nav-link-wrapper">
      <span
        v-if="loading"
        :class="['bottom-nav-link', routeIsUserRelated() ? 'active' : '']"
      >
        <SvgLoading class="passive-icon" />
        <SvgLoading class="active-icon" />
      </span>
      <NuxtLink
        v-else-if="!authToken"
        :to="localePath(`/user/login?callBack=${route.fullPath}`)"
        :aria-label="t('pages.links.user')"
        :class="['bottom-nav-link', routeIsUserRelated() ? 'active' : '']"
      >
        <ClientOnly>
          <SvgLogin class="passive-icon" />
          <SvgActiveLogin class="active-icon" />
          <p>{{ t("buttons.login") }}</p>
        </ClientOnly>
      </NuxtLink>
      <NuxtLink
        v-else
        :to="localePath('/user')"
        :aria-label="t('pages.links.user')"
        :class="['bottom-nav-link', routeIsUserRelated() ? 'active' : '']"
      >
        <ClientOnly>
          <SvgProfile class="passive-icon" />
          <SvgActiveProfile class="active-icon" />
          <p v-if="user && user.first_name && user.last_name">{{ user.first_name }}</p>
          <p v-else>{{ t("pages.user.profile") }}</p>
        </ClientOnly>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss">
.bottom-nav-bar-container {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: $gray-bg;
  position: fixed;
  z-index: 4;
  bottom: 0;
  right: 0;
  height: 65px;
  background-color: $optional-bg;
  border-top: 1px solid $primary;
  //   border-top: 1px solid $border-color;
  border-radius: 7px 7px 0 0;
  .bottom-nav-link-wrapper {
    position: relative;
    gap: 4px;
    height: 100%;
    flex-basis: 25%;
    list-style: none;
    border-left: 1px solid $primary;

    .bottom-nav-link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      p {
        font-size: 12px;
      }
      .passive-icon,
      .active-icon {
        color: black;
        margin-bottom: 5px;
        height: 22px;
        width: 22px;
      }
      .active-icon {
        display: none;
      }
      // svg {
      //     width: 20px;
      //     height: 20px;
      //     fill: black;
      // }
      &:hover,
      &.router-link-exact-active,
      &.active {
        .passive-icon {
          display: none;
        }
        .active-icon {
          display: block;
        }
        p,
        svg {
          color: $primary;
        }
      }
    }
  }
  > :last-child {
    border-left: none;
  }
  @include md {
    height: 75px;
  }
  @include lg {
    display: none;
  }
}
.bottom-nav-bar-reserved-space {
  width: 100%;
  height: 65px;
  @include md {
    height: 75px;
  }
  @include lg {
    display: none;
  }
}
// .i-heroicons-arrow-uturn-left-solid {
//     color: $primary !important;
// }
// .mobile-nav-category-conatiner {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     // background-color: $gray-bg;
//     // padding: 10px;
// }

// .i-heroicons-arrow-uturn-left-solid {
//     width: 20px !important;
//     height: 20px !important;
// }
// .cartitem-qty {
//     background-color: $primary;
//     border: 1px solid $primary;
//     border-radius: 50%;
//     position: absolute;
//     bottom: 15px;
//     right: 6px;
//     color: white;
//     width: 18px;
//     height: 16px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 10px;
// }
</style>
