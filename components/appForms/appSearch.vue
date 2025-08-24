<script setup lang="ts">
// * imports
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import SvgSearch from "@/components/Svg/search.vue";
import SvgArrowRight from "@/components/Svg/arrowRight.vue";

// * composables
const searchStore = useSearchStore();
const localePath = useLocalePath();
const { t, locale } = useI18n();
const { getUrl } = useUrl();

// * props & emits
const emit = defineEmits(["close"]);
const prop = defineProps<{
  searchMenuIsClosing?: boolean;
}>();

// * store data
const { searchResults } = storeToRefs(searchStore);

// * page data
const searchQuery = ref("");
const formError = ref(false);
const loading = ref(false);
const searchBar = ref(null) as any;
// * watchers
let validationTimeOut: any;
watch(
  () => searchQuery.value,
  () => {
    loading.value = false;
    formError.value = false;
    clearTimeout(validationTimeOut);
    if (searchQuery.value.length) {
      if (searchQuery.value[searchQuery.value.length] == " ") {
        searchQuery.value = searchQuery.value.slice(0, -1);
      }

      loading.value = true;
      validationTimeOut = setTimeout(validation, 1000);

      async function validation() {
        try {
          await searchStore.get({
            lang: locale.value,
            searchQuery: searchQuery.value,
          });
        } catch (error: any) {
          formError.value = true;
        } finally {
          loading.value = false;
        }
      }
    }
  }
);

// * functions

function goToSearchedPage() {
  emit("close");
  navigateTo(localePath(`/search/${searchQuery.value}`));
}
onMounted(() => {
  if (searchBar.value) {
    searchBar.value.focus();
  }
});
</script>

<template>
  <div>
    <form
      :class="['search-bar-form', searchMenuIsClosing ? 'closing' : '']"
      @submit.prevent="goToSearchedPage"
    >
      <div class="input-wrapper">
        <SvgSearch class="passive-icon search-icon" />
        <SvgArrowRight class="passive-icon back-icon" @click="emit('close')" />
        <input
          ref="searchBar"
          v-model="searchQuery"
          class="search-input"
          type="text"
          name="appSearchInput"
          :placeholder="t('pages.products.search')"
        />
      </div>
      <div
        :class="[
          'search-result-wrapper',
          !loading && searchQuery && searchResults?.length ? 'allow-scroll' : '',
        ]"
      >
        <div class="search-result-products-wrapper" v-if="loading">
          <button
            :name="t('pages.products.goToSearchPage', { searchQuery: searchQuery })"
            class="go-to-search-page"
            type="button"
            @click="goToSearchedPage"
          >
            {{ t("pages.products.goToSearchPage", { searchQuery: searchQuery }) }}
          </button>
          <div class="search-loading-wrapper" v-for="i in 20">
            <span class="search-loading-image skeleton-loader"></span>
            <div class="search-loading-title skeleton-loader"></div>
          </div>
        </div>
        <div
          class="search-result-product"
          v-else-if="(searchQuery && !searchResults.length) || formError"
        >
          <p class="result-not-found">{{ t("pages.products.search_not_found") }}</p>
        </div>
        <div
          class="search-result-products-wrapper"
          v-else-if="searchQuery && searchResults?.length"
        >
          <button
            :name="t('pages.products.goToSearchPage', { searchQuery: searchQuery })"
            class="go-to-search-page"
            type="button"
            @click="goToSearchedPage"
          >
            {{ t("pages.products.goToSearchPage", { searchQuery: searchQuery }) }}
          </button>
          <div
            class="search-result-product"
            v-for="result in searchResults"
            :key="result.id"
          >
            <NuxtLink
              v-if="result.table_name === 'product'"
              :to="localePath(`/product/${result.slug}`)"
              :aria-label="t('pages.links.single_product', { name: result.name })"
              @click="emit('close')"
              target="_blank"
            >
              <NuxtPicture
                :src="getUrl(result.image_url)"
                format="avif,webp"
                alt="product-picture"
                name="product-picture"
                width="40"
                sizes="40"
                height="40"
                densities="x1 x2"
                quality="80"
              />
              <!-- sizes="xs:200px md:400px" -->
              <p>{{ result.name }}</p>
            </NuxtLink>
            <NuxtLink
              v-else-if="result.table_name === 'product_category'"
              :to="localePath(`/category/${result.slug}`)"
              :aria-label="t('pages.links.single_product', { name: result.name })"
              @click="emit('close')"
            >
              <NuxtPicture
                :src="getUrl(result.image_url)"
                format="avif,webp"
                alt="product-picture"
                name="product-picture"
                width="40"
                height="40"
                densities="x1 x2"
                quality="80"
              />
              <p>
                {{
                  t("pages.product.productCategorySearchResult", { name: result.name })
                }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@keyframes expand {
  0% {
    height: 100%;
  }
  100% {
    height: 400px;
  }
}
@keyframes closeExpansion {
  0% {
    height: 400px;
  }
  100% {
    height: 100%;
  }
}

.search-bar-form {
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  animation: expand 0.3s ease-out;
  background: white;
  margin: 10px;
  .search-icon {
    display: none;
  }
  &.closing {
    animation: closeExpansion 0.3s ease-out;
  }
  .input-wrapper {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    .search-input {
      border-radius: 0.375rem 0 0 0.375rem;
      padding: 7px 10px;
      border: none;
      width: calc(100% - 24px);
      height: 100%;
      outline: none;
      &::placeholder {
        font-size: 1em;
        font-weight: 100;
      }
    }
  }
  .search-result-wrapper {
    border-top: 1px solid $secondary;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 9;
    height: calc(100% - 44px);
    padding: 10px;
    padding-top: 20px;
    overflow: hidden;
    &.allow-scroll {
      overflow-y: auto;
    }
    .search-result-products-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .go-to-search-page {
        display: flex;
        font-size: 15px;
        color: $gray-subtitle;
      }
      .search-loading-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        .search-loading-image {
          width: 40px;
          height: 40px;
        }
        .search-loading-title {
          width: 100%;
          height: 21px;
        }
      }
    }
    .search-result-product {
      .result-not-found {
        padding-right: 10px;
        font-size: 14px;
        display: flex;
      }
      a {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          text-align: start;
          font-size: 13px;
          color: $gray-subtitle;
          @include lg {
            font-size: 14px;
          }
        }
      }
    }
  }
  @include lg {
    width: 100%;
    height: 400px;
    margin: 0;
    border: 1px solid $primary;
    border-radius: 0.375rem;
    .search-icon {
      display: block;
    }
    .back-icon {
      display: none;
    }
    .search-result-wrapper {
      border-top: none;
      padding: 20px 10px;
      // max-height: 350px;
      .search-result-wrapper {
        max-height: unset;
      }
    }
  }
}

// .divider {
//     width: 100%;
//     height: 1px;
//     padding: 0 15px;
//     margin-top: 5px;
//     p {
//         width: 100%;
//         height: 100%;
//         background-color: $border-color;
//     }
// }
// .ui-input {
//     input {
//         border: unset;
//         --tw-shadow : 0;
//         background-color: white;
//         --tw-ring-color: transparent;
//         color: $gray-subtitle;
//         font-size: 15px;
//         box-shadow: none;
//         &:focus {
//             --tw-ring-color: transparent;
//         }
//         @include lg{
//             box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
//         }
//     }
//     span {
//         z-index: 7;
//     }
// }
</style>
