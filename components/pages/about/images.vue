<script lang="ts" setup>
defineProps<{
  images: string[];
}>();
const { getUrl } = useUrl();
</script>

<template>
  <div class="about-description-wrapper">
    <div class="about-us-images-wrapper">
      <NuxtImg
        format="avif,webp"
        densities="x1 x2"
        quality="80"
        width="330"
        height="220"
        v-if="images[0]"
        :src="getUrl(images[0])"
        name="primary-about-us"
        alt="primary-about-us"
        class="about-us-image"
      />
      <NuxtImg
        format="avif,webp"
        densities="x1 x2"
        quality="80"
        width="330"
        height="220"
        v-if="images[1]"
        :src="getUrl(images[1])"
        name="secondary-about-us"
        alt="secondary-about-us"
        class="about-us-image"
      />
    </div>
  </div>
</template>

<style lang="scss">
.about-description-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;

  .about-us-images-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;

    .about-us-image {
      object-fit: cover;
      border-radius: 12px;
      filter: drop-shadow(28px 29px 16px rgba(0, 0, 0, 0.02))
        drop-shadow(16px 16px 14px rgba(0, 0, 0, 0.08))
        drop-shadow(7px 7px 10px rgba(0, 0, 0, 0.13))
        drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.15))
        drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.15));
    }

    & .about-us-image:first-child {
      display: none;
    }
  }
  @include lg {
    .about-us-images-wrapper {
      margin-bottom: 200px;
      .about-us-image {
        width: 590px;
        height: 390px;
      }
      & .about-us-image:first-child {
        display: initial;
        margin-bottom: -270px;
        margin-left: -40px;
      }
    }
  }
}
</style>
