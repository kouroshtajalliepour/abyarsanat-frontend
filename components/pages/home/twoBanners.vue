<script lang="ts" setup>
// * composables
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();

// * props
const props = defineProps<{
  banners: any;
  loading?: boolean;
}>();
</script>

<template>
  <div class="two-banners-container">
    <div v-if="loading" class="banner" v-for="i in 2">
      <span class="two-banner-link loading skeleton-loader">
        <div class="two-banner-image"></div>
      </span>
    </div>
    <figure
      class="banner"
      v-else-if="banners && banners.length"
      v-for="banner in banners"
      :key="banner.id"
    >
      <NuxtLink
        :to="localePath(banner.url)"
        :aria-label="t('pages.links.single_category', { name: banner.image_alt })"
        class="two-banner-link"
      >
        <NuxtPicture
          format="avif,webp"
          densities="x1 x2"
          quality="80"
          height="130px"
          width="350px"
          sizes="350px sm:400 md:700px lg:400px xl:500px xxl:700px"
          :src="getUrl(banner.image_url)"
          :alt="banner.image_alt"
          :name="banner.image_alt"
          :imgAttrs="{ class: 'two-banner-image' }"
        />
      </NuxtLink>
    </figure>
  </div>
</template>

<style lang="scss">
.two-banners-container {
  display: flex;
  padding: 0 10px;
  padding-top: 40px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .banner {
    width: 100%;
    height: 35vw;
    @include md {
      width: calc(50% - 20px);
      height: 20vw;
      max-height: 300px;
    }
    // flex-basis: calc(25% - 60px);
  }
  @include md {
    padding: 50px 30px 10px;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    // gap: 0;
  }
}
.two-banner-link {
  display: block;
  width: 100%;
  height: 100%;
  &.loading {
    border-radius: 20px;
  }
  img {
    border: 1px solid transparent;
    border-radius: 20px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

/* img {
      width: 314px;
      border-radius: 16px;
  } */
</style>
