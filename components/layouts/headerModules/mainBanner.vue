<script lang="ts" setup>
// * props
defineProps<{
  image_url?: string;
  to: string;
}>();
// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();
</script>

<template>
  <div class="main-banner-wrapper">
    <NuxtLink class="main-banner" :to="localePath(to)">
      <figure class="main-banner-image-wrapper">
        <NuxtPicture
          v-if="image_url"
          :src="getUrl(image_url)"
          format="avif,webp"
          :alt="t('pages.links.mainBanner')"
          :name="t('pages.links.mainBanner')"
          densities="x1 x2"
          quality="80"
          height="35px"
          width="100vw"
          sizes="100vw"
          :imgAttrs="{ class: 'main-banner-image' }"
        />
      </figure>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.main-banner-wrapper {
  height: 35px;
  transition: all 0.3s ease;
  .main-banner {
    width: 100%;
    z-index: 2;
    top: 0;
    display: block;
    .main-banner-image-wrapper {
      width: 100%;
      height: 100%;
      .main-banner-image {
        object-fit: cover;
        width: 100%;
        height: 35px;
      }
    }
  }
  @include lg {
    height: 60px;
    z-index: 6;
    position: relative;
    .main-banner {
      .main-banner-image-wrapper {
        .main-banner-image {
          height: 60px;
        }
      }
    }
  }
}
</style>
