<script lang="ts" setup>
// * imports
import SvgWhatsApp from "@/components/Svg/whatsApp.vue";
import SvgLoading from "@/components/Svg/loading.vue";
// * props
defineProps<{
  whatsAppUrl?: string;
  loading?: boolean;
}>();
// * composables
const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <div
    :class="[
      'fixed-contact-wrapper',
      route.path === '/cart' ? 'invisible' : '',
      route.path.includes('product') ? 'higher' : '',
    ]"
  >
    <NuxtLink
      v-if="!loading && whatsAppUrl"
      :to="whatsAppUrl"
      target="_blank"
      :aria-label="t('pages.links.whatsApp')"
    >
      <SvgWhatsApp />
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.fixed-contact-wrapper {
  position: fixed;
  bottom: 80px;
  transition: all 0.3s ease-out;
  left: 15px;
  z-index: 2;
  &.invisible {
    opacity: 0;
  }
  &.higher {
    left: 5px;
    bottom: 135px;
  }
  @include lg {
    opacity: 1;
    right: unset;
    bottom: 20px;
    left: 50px;
    &.higher {
      bottom: 20px;
      left: 50px;
    }
  }
}
</style>
