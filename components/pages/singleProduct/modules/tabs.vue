<script lang="ts" setup>
// * imports
import PagesSingleProductModulesProperties from "./properties.vue";
import ReusableMyHtmlSanitizer from "@/components/reusable/myHtmlSanitizer.vue";

// * props
const props = defineProps<{
  product: any;
}>();

// * composables
const { t } = useI18n();

// * data
const activeTab = ref("productProperties");
const detailTabs = ref([
  { id: "productProperties", name: t("pages.product.tabs.specifications") },
  { id: "description", name: t("pages.product.tabs.description") },
  { id: "content", name: t("pages.product.tabs.content") },
]);

// * computed data
const properties = computed(() => {
  if (props.product && props.product.properties) {
    return props.product.properties.filter((property: any) => property.selected == false);
  }
});

// * functions
const isElementInViewport = (el: any) => {
  if (el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};
const handleScroll = () => {
  const productProperties = document.getElementById("productProperties");
  const description = document.getElementById("description");
  const content = document.getElementById("content");

  if (isElementInViewport(productProperties)) {
    activeTab.value = "productProperties";
  } else if (isElementInViewport(description)) {
    activeTab.value = "description";
  } else if (isElementInViewport(content)) {
    activeTab.value = "content";
  }
};
function navigateToTab(tabId: any) {
  const element = document.getElementById(tabId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  activeTab.value = tabId;
}
// * hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="product-tabs-wrapper">
    <div :class="['product-tabs-header ']">
      <div
        v-for="tab in detailTabs"
        :key="tab.id"
        class="product-tabs-header-navigation-wrapper"
      >
        <span
          @click="navigateToTab(tab.id)"
          :class="['product-tab', activeTab == tab.id ? 'active-tab' : 'tab']"
          v-if="
            (tab.id === 'productProperties' && properties && properties.length) ||
            (tab.id === 'content' && product.content && product.content.length) ||
            (tab.id === 'description' && product.description)
          "
        >
          {{ tab.name }}
        </span>
      </div>
    </div>
    <div class="product-tabs-information-wrapper">
      <div
        v-if="properties && properties.length"
        id="productProperties"
        class="product-tab-information"
      >
        <h2 class="product-details-title">
          {{ t("pages.product.tabs.specifications") }}
        </h2>
        <PagesSingleProductModulesProperties :properties="properties" />
      </div>
      <div v-if="product.description" id="description" class="product-tab-information">
        <h2 class="product-details-title">
          {{ t("pages.product.tabs.description") }}
        </h2>
        <p class="product-description-context">{{ product.description }}</p>
      </div>
      <div
        v-if="product.content && product.content.length"
        id="content"
        class="product-tab-information"
      >
        <h2 class="product-details-title">{{ t("pages.product.tabs.content") }}</h2>
        <ReusableMyHtmlSanitizer :contents="product?.content" inline height="250" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product-tabs-wrapper {
  display: flex;
  flex-direction: column;
  .product-tabs-header {
    position: sticky;
    top: 58px;
    display: flex;
    border: 1px solid $primary;
    z-index: 2;
    top: calc($top-of-the-window-xs - 1px);
    background-color: $optional-bg;
    justify-content: center;
    &::before {
      content: "";
      top: -6px;
      width: 100%;
      height: 5px;
      background-color: white;
      position: absolute;
      right: 0;
    }
    .product-tabs-header-navigation-wrapper {
      .product-tab {
        cursor: pointer;
        height: 100%;
        padding: 10px;
        transition: all 0.2s ease-out;
        font-size: 0.9em;
        display: block;
        &.active-tab {
          color: white;
          background-color: $primary;
        }
      }
    }
  }
  .product-tabs-information-wrapper {
    .product-details-title {
      margin-bottom: 10px;
      padding: 10px;
      font-size: 1em;
      color: $subTitle-color;
    }
    .product-tab-information {
      border-bottom: 1px solid $primary;
      &:last-child {
        padding-bottom: 20px;
      }
      .product-description-context {
        font-size: 0.9em;
        padding: 0 20px;
        padding-bottom: 20px;
      }
    }
  }
  @include lg {
    margin-top: 50px;
    .product-tabs-header {
      top: calc($top-of-the-window-lg + 5px);
      justify-content: flex-start;
      border-radius: 10px;
      .product-tabs-header-navigation-wrapper {
        &:first-child {
          .product-tab {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
    // .product-tabs-information-wrapper {
    //   .product-tab-information {
    //     padding: 20px 0 20px 10px;
    //   }
    // }
  }
}
</style>
