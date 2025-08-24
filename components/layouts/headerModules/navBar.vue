<script lang="ts" setup>
// * import
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import { useCartStore } from "@/store/user/cart";
import SvgLogin from "@/components/Svg/login.vue";
import SvgActiveLogin from "@/components/Svg/activeLogin.vue";
import SvgProfile from "@/components/Svg/profile.vue";
import SvgActiveProfile from "@/components/Svg/activeProfile.vue";
import SvgShoppingCart from "@/components/Svg/shoppingCart.vue";
import SvgActiveShoppingCart from "@/components/Svg/activeShoppingCart.vue";
import LayoutsHeaderModulesAppSearch from "@/components/layouts/headerModules/appSearch.vue";
import SvgLoading from "@/components/Svg/loading.vue";
import SvgMenu from "@/components/Svg/menu.vue";
import SvgActiveMenu from "@/components/Svg/activeMenu.vue";
import LayoutsHeaderModulesMenu from "@/components/layouts/headerModules/Menu.vue";
import ChangeableIconsLogo from "@/components/changeableIcons/logoSign.vue";

// * props and emits
const props = defineProps<{
  loading?: boolean;
}>();

// * composables
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const cartStore = useCartStore();
const userStore = useUserAuthStore();

// * store data
const { user, authToken } = storeToRefs(userStore);
const { cartItems } = storeToRefs(cartStore);

// * page data
const bodyIsNotClickable = ref(false);
const redirecting = ref(false);

// * watchers
watch(
  () => bodyIsNotClickable.value,
  (value) => {
    if (!redirecting.value && value) {
      document.body.classList.add("header-modal-open");
      return;
    }
    document.body.classList.remove("header-modal-open");
  }
);
watch(
  () => route.path,
  () => {
    closeBar();
  }
);

// * functions
function userRouteIsActive() {
  return route.path.includes("/user");
}
function closeBar() {
  redirecting.value = true;
  setTimeout(() => {
    redirecting.value = false;
  }, 300);
}
</script>

<template>
  <nav class="nav-bar-wrapper">
    <div :class="['nav-bar']">
      <div class="main-controls-wrapper">
        <ul class="upper-section">
          <li class="user-navigation-button">
            <span
              v-if="loading"
              :class="[
                'user-link user-account-link',
                userRouteIsActive() ? 'active' : '',
              ]"
            >
              <SvgLoading class="passive-icon" />
              <SvgLoading class="active-icon" />
              <span class="login-context skeleton-loader"></span>
            </span>
            <NuxtLink
              v-else-if="!authToken"
              :to="localePath(`/user/login?callBack=${route.fullPath}`)"
              :class="[
                'user-link user-account-link',
                userRouteIsActive() ? 'active' : '',
              ]"
              :aria-label="t('pages.links.login')"
            >
              <SvgLogin class="passive-icon" />
              <SvgActiveLogin class="active-icon" />
              <span class="login-context">{{ t("buttons.login") }}</span>
            </NuxtLink>
            <NuxtLink
              v-else
              :to="localePath(`/user/info`)"
              :class="[
                'user-link user-account-link',
                userRouteIsActive() ? 'active' : '',
              ]"
              :aria-label="t('pages.links.account')"
            >
              <SvgProfile class="passive-icon" />
              <SvgActiveProfile class="active-icon" />
              <span
                class="link-context"
                v-if="user && user.first_name && user.last_name"
                >{{ user.first_name }}</span
              >
              <span class="link-context" v-else>{{ t("pages.user.profile") }}</span>
            </NuxtLink>
          </li>
          <li class="cart-navigation-button">
            <NuxtLink
              :to="localePath('/cart')"
              class="user-link user-cart-link"
              :aria-label="t('pages.links.cart')"
            >
              <SvgShoppingCart :cartItems="cartItems" class="passive-icon" />
              <SvgActiveShoppingCart :cartItems="cartItems" class="active-icon" />
            </NuxtLink>
          </li>
          <li class="search-bar-wrapper">
            <LayoutsHeaderModulesAppSearch
              @openModal="bodyIsNotClickable = true"
              @closeModal="bodyIsNotClickable = false"
            />
          </li>
        </ul>
        <ul class="lower-section">
          <li
            @mouseover="bodyIsNotClickable = true"
            @mouseout="bodyIsNotClickable = false"
            class="links-wrapper categories-link-wrapper"
          >
            <div class="categories-drop-down-menu-activator-link">
              <!-- todo: change icon -->
              <SvgMenu class="passive-icon" />
              <SvgActiveMenu class="active-icon" />
              <span class="link-context">{{
                t("pages.logPage.tableName.product_category")
              }}</span>
            </div>
            <div
              v-if="!loading"
              :class="[
                'categories-dorp-down-menu-wrapper',
                redirecting ? 'changing-path' : '',
              ]"
            >
              <LayoutsHeaderModulesMenu />
            </div>
          </li>
          <li class="links-wrapper">
            <NuxtLink
              :to="localePath('/')"
              class="page-navigation-link"
              :aria-label="t('pages.links.home')"
            >
              <span class="link-context">{{
                t("pages.logPage.tableName.home_page")
              }}</span>
            </NuxtLink>
          </li>
          <li class="links-wrapper">
            <NuxtLink
              :to="localePath('/blog')"
              class="page-navigation-link"
              :aria-label="t('pages.links.home')"
            >
              <span class="link-context">{{ t("pages.logPage.tables.mag") }}</span>
            </NuxtLink>
          </li>
          <li class="links-wrapper">
            <NuxtLink
              to="https://chaparnet.com/track/"
              target="_blank"
              rel="noopener noreferrer"
              class="page-navigation-link"
            >
              <span class="link-context">{{
                t("pages.logPage.tableName.order_tracking")
              }}</span>
            </NuxtLink>
          </li>
          <li class="links-wrapper">
            <NuxtLink
              :to="localePath('/about')"
              class="page-navigation-link"
              :aria-label="t('pages.links.about')"
            >
              <span class="link-context">{{
                t("pages.logPage.tableName.about_page")
              }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="nav-bar-logo-container">
        <NuxtLink :to="localePath('/')" :aria-label="t('pages.links.home')">
          <ChangeableIconsLogo index="1" class="logo-wrapper" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
// body {
//   transition: all 0.3s ease-out;
// }
.header-modal-open {
  @include lg {
    overflow: hidden;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: $gray-title;
      opacity: 0.6;
      z-index: 3;
    }
  }
}
.nav-bar-wrapper {
  height: 65px;
  width: 100%;
  position: sticky;
  z-index: 5;
  top: 0px;
  .nav-bar {
    width: 100%;
    height: 65px;
    z-index: 5;
    border-bottom: 1px solid $border-color;
    padding: 10px;
    background-color: $optional-bg;
    display: flex;
    justify-content: space-between;
    .passive-icon,
    .active-icon {
      color: black;
      height: 24px;
      width: 24px;
    }
    .active-icon {
      display: none;
    }
    .main-controls-wrapper {
      width: 100%;
      height: 100%;
      .upper-section {
        width: 100%;
        height: 100%;
        .search-bar-wrapper {
          width: 100%;
          height: 100%;
        }
        .user-navigation-button,
        .cart-navigation-button {
          display: none;
        }
      }
      .lower-section {
        display: none;
      }
    }
    .nav-bar-logo-container {
      display: none;
    }
  }
  @include lg {
    height: 105px;
    .nav-bar {
      height: 105px;
      padding: 0 25px;
      .main-controls-wrapper {
        width: 70%;
        min-width: 700px;
        .upper-section {
          display: flex;
          padding: 10px 0;
          height: unset;
          align-items: center;
          .user-navigation-button,
          .cart-navigation-button {
            // todo localize
            display: block;
            &.user-navigation-button {
              margin-left: 10px;
              .login-context {
                font-size: 0.9em;
                &.skeleton-loader {
                  height: 22px;
                }
              }
            }
            .user-link {
              display: flex;
              padding: 0 16px;
              border: 1px solid #e0e0e6;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 800;
              align-items: center;
              color: $dark-blue-button;
              gap: 8px;
              height: 44px;
              position: relative;
              cursor: pointer;
              &.user-account-link {
                width: 160px;
              }
              &.user-cart-link {
                align-items: center;
                justify-content: center;
              }
              &:hover,
              &.router-link-exact-active,
              &.active {
                border-color: $primary;
                &.user-account-link {
                  span {
                    color: $primary;
                  }
                }
                .link-context {
                  color: $primary;
                }
                .passive-icon {
                  display: none;
                }
                .active-icon {
                  display: block;
                  color: $primary;
                }
                svg {
                  fill: $primary;
                }
              }
            }
          }
          .search-bar-wrapper {
            padding: 0 16px;
            align-items: center;
            height: 44px;
            flex-basis: 70%;
          }
        }
        .lower-section {
          display: flex;
          align-items: center;
          height: 40px;
          position: relative;
          width: 100%;
          .links-wrapper {
            .page-navigation-link {
              padding: 0 12px;
              gap: 4px;
              font-size: 15px;
              height: 40px;
              align-items: center;
              position: relative;
              cursor: pointer;
              &:before {
                content: "";
                height: 3px;
                width: 0;
                background: $primary;
                position: absolute;
                margin: 0 5px;
                bottom: -9px;
                right: 0;
              }
              &:hover,
              &.router-link-exact-active,
              &.active {
                &:before {
                  transition: width 0.3s ease-out;
                  width: 90%;
                }
                .link-context {
                  color: $primary;
                  transition: color 0.3s ease-out;
                  svg {
                    transform: scale(0.8);
                  }
                }
              }
            }
            &.categories-link-wrapper {
              position: relative;
              display: inline-block;
              .categories-drop-down-menu-activator-link {
                display: flex;
                margin-left: 20px;
                font-size: 15px;
                font-weight: 700;
                color: $dark-blue-title;
                height: 40px;
                align-items: center;
                gap: 2px;
                position: relative;
                cursor: pointer;
                &:hover {
                  svg {
                    fill: $primary;
                  }
                  .passive-icon {
                    display: none;
                  }
                  .active-icon {
                    display: block;
                    color: $primary;
                  }
                  .link-context {
                    color: $primary;
                  }
                }
              }
              @keyframes slideFromRight {
                0% {
                  transform: translateX(100vw);
                }
                100% {
                  transform: translateX(0);
                }
              }
              .categories-dorp-down-menu-wrapper {
                // top: 40px;
                border-top: 3px solid $primary;
                height: 550px;
                width: 300px;
                max-width: 775px;
                position: absolute;
                right: 0;
                transition: transform 0.3s ease-out;
                transform: translateX(100vw);
                // display: none;
                &.changing-path {
                  transform: translateX(100vw) !important;
                }
              }
              &:hover {
                .link-context {
                  color: $primary;
                }
                path {
                  fill: $primary;
                }
                .passive-icon {
                  display: none;
                }
                .active-icon {
                  display: block;
                  color: $primary;
                }
                .categories-dorp-down-menu-wrapper {
                  transition-delay: 0.15s;
                  transform: translateX(0);
                  display: block;
                }
                // border-bottom: 2px solid $primary;
                // box-shadow: 0 1px 1px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 30%);
              }
            }
          }
        }
      }
      .nav-bar-logo-container {
        display: flex;
        width: 22%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        a {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .logo-wrapper {
            // width: 100%;
            height: 100%;
            svg {
              margin: auto;
              height: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
