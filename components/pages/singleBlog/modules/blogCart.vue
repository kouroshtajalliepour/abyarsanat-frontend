<script setup lang="ts">
// * imports
import jmoment from "jalali-moment";
import SvgCalender from "@/components/Svg/calender.vue";
import ReusableMyHtmlSanitizer from "@/components/reusable/myHtmlSanitizer.vue";

// * composables
const { t, locale } = useI18n();
const { getUrl } = useUrl();
// * props
const props = defineProps<{
  blog: any;
}>();
</script>

<template>
  <div class="blog-wrapper">
    <div class="blog-description-title">
      <h2>{{ blog.title }}</h2>
    </div>
    <div class="blog-creation-date-wrapper">
      <div class="blog-creation-date">
        <SvgCalender class="blog-date-icon" />
        <time :datetime="blog.created_at">{{
          jmoment(blog.created_at).locale(locale).calendar()
        }}</time>
      </div>
    </div>
    <div class="blog-image-wrapper">
      <NuxtPicture
        format="avif,webp"
        densities="x1 x2"
        quality="80"
        loading="eager"
        preload
        width="300px"
        height="180px"
        sizes="300px lg:750px"
        v-if="blog && blog.image_url"
        :src="getUrl(blog.image_url)"
        :alt="blog.image_alt"
        name="blog-picture"
        :imgAttrs="{ class: 'blog-image' }"
      />
    </div>
    <div class="blog-description-wrapper">
      <ReusableMyHtmlSanitizer :contents="blog?.description" />
    </div>
    <ReusableMyHtmlSanitizer :contents="blog?.content" />
    <div v-if="blog?.tags && blog?.tags?.length" class="blog-tags-wrapper">
      <h5>{{ t("pages.blogs.labels") }}:</h5>
      <div v-for="tag in blog.tags" class="blog-tag">
        <h6>{{ tag.name }}</h6>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog-wrapper {
  .blog-description-title {
    width: 100%;
    border-bottom: 1px solid $primary;
    padding: 12px 10px;
    margin-bottom: 10px;
    h2 {
      font-size: 1em;
      @include lg {
        font-size: 19px;
      }
    }
  }
  .blog-creation-date-wrapper {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    .blog-creation-date {
      display: flex;
      align-items: center;
      gap: 5px;
      .blog-date-icon {
        width: 24px;
        height: 24px;
        color: $primary;
      }
      p {
        font-size: 14px;
        color: black;
      }
    }
  }
  .blog-image-wrapper {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    .blog-image {
      display: flex;
      justify-content: center;
      width: 300px;
      height: 180px;
      object-fit: cover;
      @include lg {
        width: 750px;
        height: auto;
      }
    }
  }
  .blog-description-wrapper {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid $primary;
    p {
      font-size: 15px;
      line-height: 2;
    }
  }
  .single-blog-content-wrapper {
    padding: 20px;
    width: 100%;
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    img {
      margin-top: 5px;
    }
  }
  .blog-tags-wrapper {
    margin: 50px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    .blog-tag {
      padding: 7px 4px;
      background-color: $optional-bg;
      color: $primary;
      border: 1px solid $primary;
      border-radius: 8px;
      @include lg {
        padding: 7px 10px;
      }
      h6 {
        font-size: 12px;
        @include lg {
          font-size: 14px;
        }
      }
    }
    @include lg {
      padding: 0;
    }
  }
}
</style>
