<script setup lang="ts">
// * imports
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import SvgXMark from "@/components/Svg/xMark.vue";
import ReusableMySlider from "@/components/reusable/mySlider.vue";
import ReusableMyCarousel from "@/components/reusable/myCarousel.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import ReusableMyModalFooterSubmitButton from "@/components/reusable/myModal/footer/submitButton.vue";
import ReusableMyProductControls from "@/components/reusable/myProduct/controls.vue";
import PagesSingleProductModulesModelsTable from "./modelsTable.vue";
import PagesSingleProductModulesSidebarInfo from "./sidebarInfo.vue";
import PagesSingleProductModulesMobileFooter from "./mobileFooter.vue";
// * props & emits
const props = defineProps<{
  categoryName: string;
  product: any;
  selectedModel: any;
  loading: boolean;
}>();
const emit = defineEmits([]);

// * composables
const { t } = useI18n();
const localePath = useLocalePath();
const { getUrl } = useUrl();

// * data
const currentSlide = ref(0);
const productImageModalIsOpen = ref(false);
const productModelsModalIsOpen = ref(false);

// * functions
function slideTo(val: number) {
  currentSlide.value = val;
}
function handleKeyDown(event: any) {
  if (!productImageModalIsOpen.value) return;

  if (event.key === "ArrowLeft") {
    // Do something when left arrow is pressed
    if (currentSlide.value + 1 != props.product?.images.length) {
      slideTo(currentSlide.value + 1);
    }
  } else if (event.key === "ArrowRight") {
    // Do something when right arrow is pressed
    if (currentSlide.value != 0) {
      slideTo(currentSlide.value - 1);
    }
  }
}

// * hooks
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// * exposed functions
function openImageModal(index: number) {
  slideTo(index);
  productImageModalIsOpen.value = true;
}
function openModelsModal() {
  productModelsModalIsOpen.value = true;
}
function closeImageModal() {
  productImageModalIsOpen.value = false;
}

defineExpose({
  openImageModal,
  closeImageModal,
  openModelsModal,
});
</script>

<template>
  <!-- modals -->
  <ReusableMyModal
    v-model="productImageModalIsOpen"
    class="app-default-modal-wrapper fullscreen-modal"
  >
    <ReusableMyModalBodyDefault class="product-image-modal">
      <div class="product-image-modal-header">
        <button
          class="modal-close-button"
          name="close-button"
          type="button"
          @click="closeImageModal"
        >
          <SvgXMark />
        </button>
      </div>
      <div class="product-image-modal-body">
        <ReusableMySlider
          alt="image_alt"
          quality="100"
          staticAlt
          v-model="currentSlide"
          url_field="image_url"
          width="100vw"
          height="100vw"
          sizes="100vw md:550px"
          v-if="product.images && product.images.length"
          :slides="product.images"
          :pagination="!!product.images.length"
          :navigation="!!product.images.length"
        />
      </div>
      <div class="product-image-modal-footer">
        <div class="product-image-modal-footer-container">
          <ReusableMyCarousel
            class="product-image-list-carousel-items"
            :scrollAmount="200"
            :gap="10"
          >
            <div
              v-for="(image, index) in product.images"
              :class="[
                'product-image-list-carousel-item-wrapper',
                index == currentSlide ? 'active-image' : '',
                index == 0
                  ? 'first-image'
                  : index + 1 == product.images.length
                  ? 'last-image'
                  : '',
              ]"
            >
              <NuxtPicture
                format="avif,webp"
                densities="x1 x2"
                quality="80"
                width="70px"
                height="70px"
                sizes="70px"
                @click="slideTo(index)"
                loading="lazy"
                :src="getUrl(image.image_url)"
                :alt="image.alt"
                :name="image.alt"
                :imgAttrs="{ class: 'product-image-list-carousel-item-image' }"
              />
            </div>
          </ReusableMyCarousel>
        </div>
      </div>
    </ReusableMyModalBodyDefault>
  </ReusableMyModal>

  <ReusableMyModal
    v-model="productModelsModalIsOpen"
    class="app-default-modal-wrapper info-modal product-models-modal"
  >
    <ReusableMyModalHeaderDefault
      :title="
        t('pages.singleProduct.productModels', {
          priceBasedOn: product.price_based_on,
        })
      "
      @close="productModelsModalIsOpen = false"
    />
    <ReusableMyModalBodyDefault>
      <PagesSingleProductModulesModelsTable
        :productId="product.id"
        :productName="product.name"
        :categoryName="categoryName"
        :has_multiple_types="product.has_multiple_types"
        :models="product?.models"
      />
    </ReusableMyModalBodyDefault>
    <ReusableMyModalFooterSubmitButton
      :title="`${t('pages.products.review')} ${t('pages.cart.cart')}`"
      @submit="navigateTo(localePath('/cart'))"
    />
  </ReusableMyModal>
  <!-- layout -->
  <section class="single-product-page-wrapper">
    <div class="single-product-page-section">
      <div>
        <slot />
      </div>
    </div>
    <section class="single-product-page-side-bar">
      <PagesSingleProductModulesSidebarInfo
        :loading="loading"
        :weight="product.weight"
        :selectedModel="selectedModel"
      />
      <ReusableMyProductControls
        :selectedModel="selectedModel"
        :loading="loading"
        :productId="product.id"
        :productName="product.name"
        :categoryName="categoryName"
        :has_multiple_types="product.has_multiple_types"
        :models="product.models"
        @openModal="openModelsModal"
      />
    </section>
  </section>
  <PagesSingleProductModulesMobileFooter
    :loading="loading"
    :productId="product.id"
    :productName="product.name"
    :categoryName="categoryName"
    :has_multiple_types="product.has_multiple_types"
    :models="product.models"
    :selectedModel="selectedModel"
    @openModal="openModelsModal"
  />
</template>

<style lang="scss">
// * modals
.product-models-modal {
  .modal-body {
    height: calc(100% - 62px - 62px);
    overflow-x: hidden;
  }
}
.product-image-modal {
  .product-image-modal-header {
    z-index: 5;
    .modal-close-button {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 50px;
      width: 50px;
      background-color: $gray-bg;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $secondary;
      border-radius: 5px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .product-image-modal-body {
    background: white;
    border-radius: 10px;
    width: 100vw;
    height: 100vw;
    max-width: 550px;
    max-height: 550px;
    border-radius: 10px;
    border: 1px solid $primary;
    overflow: hidden;
    .slider-wrapper {
      height: 100%;
    }
  }
  .product-image-modal-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    .product-image-modal-footer-container {
      border: 3px solid $primary;
      background-color: white;
      border-radius: 10px;
      .product-image-list-carousel-items {
        .product-image-list-carousel-item-wrapper {
          &.first-image {
            .product-image-list-carousel-item-image {
              border-radius: 0 7px 7px 0;
            }
          }
          &.last-image {
            .product-image-list-carousel-item-image {
              border-radius: 7px 0 0 7px;
            }
          }
          .product-image-list-carousel-item-image {
            width: 70px;
            height: 70px;
            object-fit: cover;
            cursor: pointer;
          }

          &.active-image {
            position: relative;
            &::before {
              content: "";
              background-color: $primary;
              border: 2px solid $border-color;
              border-radius: 50px;
              width: 18px;
              height: 9px;
              position: absolute;
              bottom: 0;
              right: calc(50% - 9px);
            }
          }
        }
      }
    }
  }
  @include lg {
    .product-image-modal-header {
      .modal-close-button {
        left: -20vw;
      }
    }
    .product-image-modal-body {
      max-width: 600px;
      max-height: 600px;
      .carousel__next,
      .carousel__prev {
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border-radius: 50%;
      }
      .selected-product-image-modal {
        width: 600px;
        height: 600px;
      }
    }
  }
}
// * page
.single-product-page-wrapper {
  .single-product-page-side-bar {
    margin: 20px;
    margin-right: 0;
    border-radius: 10px;
    border: 1px solid $primary;
    background-color: $optional-bg;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 280px;
    position: sticky;
    top: calc($top-of-the-window-lg + 5px);
    height: fit-content;
    height: 400px;
    padding: 20px;
    .product-price-wrapper {
      .discount-percentage {
        right: 20px;
        bottom: 92px;
      }
    }
  }
  .single-product-page-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @include md {
    .single-product-page-section {
      padding: 20px;
    }
  }

  @include lg {
    display: flex;
    flex-direction: row;
    .single-product-page-side-bar {
      display: flex;
    }
    .single-product-page-section {
      width: calc(100% - 300px);
      padding-right: 20px;
      margin: 0;
    }
  }
}
</style>
