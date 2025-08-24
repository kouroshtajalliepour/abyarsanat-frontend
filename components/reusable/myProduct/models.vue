<script lang="ts" setup>
const props = defineProps<{
  models: string[];
  colorBased?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="['product-models-preview']">
    <div
      v-if="colorBased"
      v-for="model in models"
      :class="['product-model-radio-input']"
      :style="`background-color:#${model};`"
    ></div>
    <p class="product-model-length" v-else>
      {{ t("pages.products.getModelsLength", { length: models.length }) }}
    </p>
  </div>
</template>

<style lang="scss">
.product-models-preview {
  display: flex;
  align-items: center;
  //   gap: 10px;
  bottom: calc(100% - 150px);
  left: 10px;
  flex-wrap: wrap;
  flex-direction: column;
  background: white;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  // width: 100%;
  justify-content: center;
  background: transparent;
  max-height: 140px;
  .product-model-radio-input {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: relative;
    border: 1px solid black;
    margin: 1px 0;
    // outline: 1px solid $border-color;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }
  .product-model-length {
    font-size: 0.6em;
    border: 1px solid $primary;
    background: $optional-bg;
    padding: 1px 3px;
    border-radius: 5px;
    color: black;
  }
}
</style>
