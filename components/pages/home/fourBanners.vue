<script lang="ts" setup>
// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();
// * props
const props = defineProps<{
  banners: any;
  loading?: boolean;
}>();
</script>

<template>
  <div class="banners-container">
    <div v-if="loading" class="banner" v-for="i in 4">
      <span class="banner-link">
        <div class="banner-image loading skeleton-loader"></div>
      </span>
    </div>
    <figure
      v-else-if="banners && banners.length"
      class="banner"
      v-for="banner in banners"
      :key="banner.id"
    >
      <NuxtLink
        :to="localePath(banner.url)"
        :aria-label="t('pages.links.single_category', { name: banner.image_alt })"
        class="banner-link"
      >
        <NuxtPicture
          format="avif,webp"
          densities="x1 x2"
          quality="80"
          height="93px"
          width="150px"
          sizes="150px sm:200px md:350px lg:235px xl:300px xxl:350px"
          :src="getUrl(banner.image_url)"
          :alt="banner.image_alt"
          :name="banner.image_alt"
          :imgAttrs="{ class: 'banner-image' }"
        />
      </NuxtLink>
    </figure>
  </div>
</template>

<style lang="scss">
.banners-container {
  display: flex;
  padding: 40px 10px;
  // padding-top: 40px;
  flex-wrap: wrap;
  row-gap: 20px;
  gap: 10px;
  justify-content: space-between;
  .banner {
    flex-basis: calc(50% - 10px);
    @include xl {
      flex-basis: calc(25% - 10px);
    }
  }
  @include md {
    padding: 0 30px;
    padding-top: 50px;
  }
}
.banner-link {
  .loading {
    border-radius: 20px;
  }
  img {
    border: 1px solid transparent;
    border-radius: 20px;
    max-height: 270px;
    object-fit: cover;
  }
}
.banner-image {
  width: 100%;
  height: 25vw;
  @include xl {
    height: 18vw;
  }
}

/* img {
    width: 314px;
    border-radius: 16px;
} */
</style>
