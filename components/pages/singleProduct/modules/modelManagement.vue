<script lang="ts" setup>
// * imports
import SvgColon from "@/components/Svg/colon.vue";
import ReusableMyInputsSelect from "@/components/reusable/myInputs/select.vue";
// * props and emits
const props = defineProps<{
  hasMultipleTypes: any;
  priceBasedOn: any;
  selectedModel: any;
  showModelsAsRadio: any;
  models: any;
}>();
const emit = defineEmits(["update:selectedModel", "changeModel"]);

// * data
const SelectedModel = ref(props.selectedModel);

const SelectedModelId = ref(props.selectedModel.id);

// * watchers
watch(
  () => SelectedModelId.value,
  () => {
    SelectedModel.value = props.models.filter(
      (model: any) => model.id == SelectedModelId.value
    )[0];
  }
);
watch(
  () => SelectedModel.value,
  () => {
    emit("changeModel", SelectedModel.value);
  }
);
watch(
  () => props.selectedModel,
  () => {
    SelectedModel.value = props.selectedModel;
    SelectedModelId.value = props.selectedModel.id;
  }
);
// * functions

function format(str: string) {
  return `${props.priceBasedOn} : ${str}`;
}
</script>

<template>
  <div
    class="product-models-radio-inputs-wrapper-management-wrapper"
    v-if="hasMultipleTypes"
  >
    <div v-if="showModelsAsRadio">
      <span class="selected-model-wrapper">
        {{ priceBasedOn }}
        <SvgColon class="selected-model-icon" />
        <span class="selected-model-value">{{ SelectedModel.name }}</span>
      </span>
      <div class="product-models-radio-inputs-wrapper">
        <button
          v-for="model in models"
          :key="model.id"
          @click="emit('changeModel', model)"
          :class="[
            'product-model-radio-input',
            SelectedModel && SelectedModel.id == model.id ? 'active-model' : '',
          ]"
          :style="`background-color:#${model.slug};`"
          :name="model.name"
        >
          <span class="name-on-hover">{{ model.name }}</span>
        </button>
      </div>
    </div>
    <div v-else class="product-models-radio-inputs-wrapper-input-select-wrapper">
      <ReusableMyInputsSelect
        class="product-models-radio-inputs-wrapper-input-select"
        v-model="SelectedModelId"
        :options="models"
        :labelFormat="format"
        :optionsAsObject="{
          key: 'id',
          value: 'name',
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.product-models-radio-inputs-wrapper-management-wrapper {
  padding: 0 20px;

  .selected-model-wrapper {
    align-items: center;
    display: flex;
    font-weight: 600;
    font-size: 0.8em;
    margin-bottom: 10px;
    .selected-model-icon {
      color: $primary;
      width: 15px;
      height: 20px;
      &.dash-icon {
        margin-left: 5px;
      }
    }
    .selected-model-value,
    &.single-key {
      font-weight: 100;
    }
  }
  .product-models-radio-inputs-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    background: white;
    cursor: pointer;
    .product-model-radio-input {
      border-radius: 50%;
      width: 25px;
      height: 25px;
      position: relative;
      border: 3px solid white;
      outline: 1px solid $border-color;
      display: flex;
      justify-content: center;
      align-items: center;

      background: white;
      .name-on-hover {
        opacity: 0;
        position: absolute;
        top: 0px;
        background-color: $gray-bg;
        border-radius: 5px;
        border: 1px solid $border-color;
        padding: 3px 5px;
        transition: all 0.3s ease-out;
        font-size: 0.7em;
      }
      &:hover {
        .name-on-hover {
          display: block;
          top: 30px;
          opacity: 1;
        }
      }

      &.active-model {
        border: 3px solid $gray-600;
      }
    }
  }

  @include lg {
    .product-models-radio-inputs-wrapper-input-select-wrapper {
      .product-models-radio-inputs-wrapper-input-select {
        width: 200px;
      }
    }
  }
}
</style>
