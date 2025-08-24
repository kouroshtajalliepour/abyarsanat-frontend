<script lang="ts" setup>
// * props
const props = defineProps<{
  linkAddressSanitizer?: any;
  linkNameSanitizer?: any;
  linkAreaLabelSanitizer?: any;
  linkName: string;
  linkAddress: string;
  links: any;
}>();

// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
// * data
const { title: siteName } = locales.value.filter((l: any) => {
  return l.code == locale.value;
})[0] as any;
const loading = ref(true);

// * functions
function dataSanitizer(rawData: string, sanitizerFunction: any) {
  if (sanitizerFunction) {
    return sanitizerFunction(rawData);
  }
  return rawData;
}
// * hooks

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <nav class="page-navigation-wrapper">
    <ul class="page-navigation-links-wrapper">
      <li class="page-navigation-link-wrapper">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="t('pages.links.home')"
          class="page-navigation-link"
        >
          <p class="link-context">{{ siteName }}</p>
          <span class="link-divider">/</span>
        </NuxtLink>
      </li>

      <li v-if="!loading" class="page-navigation-link-wrapper" v-for="link in links">
        <NuxtLink
          :to="dataSanitizer(link[linkAddress], linkAddressSanitizer)"
          :aria-label="dataSanitizer(link[linkName], linkAreaLabelSanitizer)"
          class="page-navigation-link"
        >
          <p class="link-context">
            {{ dataSanitizer(link[linkName], linkNameSanitizer) }}
          </p>
          <span class="link-divider">/</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <!-- <div class="page-navigation-wrapper" v-else-if="topLinkName">
        <div class="page-navigation-link-wrapper">
          <p>{{ topLinkName }}</p>
          <span>/</span>
        </div>
        <div class="page-navigation-link-wrapper">
          <NuxtLink
            :to="localePath('/')"
            :aria-label="t('pages.links.home')"
            class="page-navigation-link"
          >
            <p>{{ siteName }}</p>
            <span>/</span>
          </NuxtLink>
        </div>
      </div> -->
</template>

<style lang="scss">
.page-navigation-wrapper {
  padding: 0 20px;
  border-bottom: 1px solid $primary;
  // background-color: $optional-bg;
  .page-navigation-links-wrapper {
    display: flex;
    padding: 20px 0;

    .page-navigation-link-wrapper {
      display: flex;
      align-items: center;
      color: black;
      font-size: 12px;
      font-weight: 700;
      gap: 10px;
      .page-navigation-link {
        display: flex;
        .link-divider {
          padding: 0 8px;
          color: $secondary;
        }
      }
    }
    & .page-navigation-link-wrapper:last-child {
      .page-navigation-link {
        .link-divider {
          display: none;
        }
      }
    }
  }
  @include lg {
    border-bottom: none;
    .page-navigation-links-wrapper {
      border-bottom: 1px solid $primary;
    }
  }
}
</style>
