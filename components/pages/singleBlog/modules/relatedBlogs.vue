<script lang="ts" setup>
// * imports
import ReusableMyPageSmallTitle from "@/components/reusable/myPageSmallTitle.vue";
import ReusableMyCarousel from "@/components/reusable/myCarousel.vue";
import ReusableMySlide from "@/components/reusable/mySlide.vue";
import ReusableMyPageButton from "@/components/reusable/myPageButton.vue";

// * props
const props = defineProps<{
  blogs: any;
  loading: any;
  title: any;
  buttonLink?: string;
}>();

// * composables
const localePath = useLocalePath();
const { t } = useI18n();
const { getUrl } = useUrl();
</script>

<template>
  <div class="blog-list-carousel-wrapper">
    <ReusableMyPageSmallTitle v-if="title" :title="title" />
    <ReusableMyCarousel class="blog-list-carousel" :scrollAmount="250" :gap="10">
      <ReusableMySlide v-for="blog in blogs">
        <NuxtLink
          class="blog-cart-wrapper"
          :to="localePath(`/blog/${blog.slug}`)"
          :aria-label="t('pages.links.single_blog', { name: blog.title })"
        >
          <article>
            <figure>
              <NuxtPicture
                format="avif,webp"
                densities="x1 x2"
                quality="80"
                width="300px"
                height="180px"
                sizes="300px"
                v-if="blog && blog.image_url"
                :src="getUrl(blog.image_url)"
                :alt="blog.image_alt"
                name="blog-picture"
                :imgAttrs="{ class: 'mobile-blog-image' }"
              />
              <figcaption class="blog-description">{{ blog.title }}</figcaption>
            </figure>
          </article>
        </NuxtLink>
      </ReusableMySlide>
    </ReusableMyCarousel>
    <div v-if="buttonLink"></div>
    <ReusableMyPageButton
      v-if="buttonLink"
      :to="buttonLink"
      :ctx="t('pages.links.seeAllBlogs')"
    />
  </div>
</template>

<style lang="scss">
.blog-list-carousel-wrapper {
  width: 100%;
  align-items: center;
  position: relative;
  padding: 0 10px;

  .blog-list-carousel {
    height: 300px;
    margin-bottom: 20px;
  }
  .blog-cart-wrapper {
    background-color: $optional-bg;
    border: 1px solid $primary;
    display: block;
    padding: 20px;
    border-radius: 10px;
    width: 340px;
    height: 300px;

    .mobile-blog-image {
      align-self: center;
      object-fit: cover;
      border-radius: 10px;
      width: 300px;
      height: 180px;
      display: block;
      object-fit: cover;
    }
    .blog-description {
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 1em;
      margin: 40px 20px;
      height: 26px;
      &.loading {
        width: calc(100% - 40px);
      }
    }

    &:hover {
      filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.2));
    }
  }

  @include lg {
    padding: 50px 30px 0;
    position: static;
  }
}
</style>
