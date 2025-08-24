<script lang="ts" setup>
// * imports
import LayoutsHeaderModulesMainBanner from "@/components/layouts/headerModules/mainBanner.vue";
import LayoutsHeaderModulesProductListNav from "@/components/layouts/headerModules/productListNav.vue";
import LayoutsHeaderModulesSingleProductNav from "@/components/layouts/headerModules/singleProductNav.vue";
import LayoutsHeaderModulesNavBar from "@/components/layouts/headerModules/navBar.vue";
// * props
const props = defineProps<{
  image_url?: string;
  to?: string;
  loading?: boolean;
}>();
// * composables
const route = useRoute();
</script>

<template>
  <header class="header-wrapper">
    <LayoutsHeaderModulesMainBanner
      v-if="!loading && to && to !== '/none'"
      :to="to"
      :loading="loading"
      :image_url="image_url"
      :class="
        route.path.includes('/category') ||
        route.path.includes('/product') ||
        route.path.includes('/user')
          ? 'product-nav-included'
          : ''
      "
    />
    <LayoutsHeaderModulesProductListNav
      :class="route.path.includes('/category') ? 'product-nav active' : 'product-nav'"
    />
    <LayoutsHeaderModulesSingleProductNav
      :class="route.path.includes('/product') ? 'product-nav active' : 'product-nav'"
    />
  </header>
  <LayoutsHeaderModulesNavBar
    :loading="loading"
    :class="
      route.path.includes('/category') ||
      route.path.includes('/product') ||
      route.path.includes('/user')
        ? 'product-nav-included'
        : ''
    "
  />
</template>

<style lang="scss">
.product-nav-included {
  display: none;
  @include lg {
    display: block;
  }
}
.product-nav {
  display: none;

  &.active {
    display: flex;
    @include lg {
      display: none;
    }
  }
}
</style>
