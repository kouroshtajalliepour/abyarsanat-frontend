<script setup lang="ts">
// * imports
import ReusableMyNotFound from "@/components/reusable/myNotFound.vue";

// * props
defineProps<{
  blogs: any;
  blogLoading: boolean;
}>();

// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();
</script>

<template>
  <div class="blogs-wrapper">
    <div v-if="blogLoading" class="blog-cart-wrapper" v-for="item in 12" :key="item">
      <div class="mobile-blog-image loading skeleton-loader"></div>
      <div class="blog-description loading skeleton-loader"></div>
    </div>
    <NuxtLink
      v-else-if="blogs && blogs.length"
      class="blog-cart-wrapper"
      v-for="(blog, index) in blogs"
      :to="localePath(`/blog/${blog.slug}`)"
      :aria-label="t('pages.links.single_blog', { name: blog.title })"
      :key="blog.id"
    >
      <article>
        <figure>
          <NuxtPicture
            format="avif,webp"
            densities="x1 x2"
            quality="80"
            sizes="300px"
            width="300px"
            height="180px"
            v-if="blog && blog.image_url"
            :src="getUrl(blog.image_url)"
            :loading="index ? 'lazy' : 'eager'"
            :preload="index == 0"
            :alt="blog.image_alt"
            name="blog-picture"
            :imgAttrs="{ class: 'mobile-blog-image' }"
          />
          <figcaption class="blog-description">{{ blog.title }}</figcaption>
        </figure>
      </article>
    </NuxtLink>
    <ReusableMyNotFound title="pages.notFound.blog" v-else />
  </div>
</template>
<style lang="scss">
.blogs-wrapper {
  // width: 100%;
  display: flex;
  flex-flow: row wrap;
  .blog-cart-wrapper {
    flex-basis: 100%;
    background-color: $optional-bg;
    border: 1px solid $primary;
    border-radius: 10px;

    .mobile-blog-image {
      align-self: center;
      object-fit: cover;
      margin: 10px;
      border-radius: 10px;
      width: calc(100% - 20px);
      height: 43vw;
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

  @include md {
    gap: 20px;
    .blog-cart-wrapper {
      flex-basis: calc(50% - 20px);
      .mobile-blog-image {
        height: 22vw;
      }
    }
  }
  @include lg {
    .blog-cart-wrapper {
      flex-basis: calc(33% - 20px);
      .mobile-blog-image {
        height: 13vw;
        max-height: 300px;
      }
    }
  }
}
</style>
