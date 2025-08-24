<script setup lang="ts">
// * imports
import SvgDash from "@/components/Svg/dash.vue";
import SvgColon from "@/components/Svg/colon.vue";
// * props
defineProps<{
  properties: any;
}>();
</script>

<template>
  <div v-if="properties" class="properties-wrapper">
    <p v-for="property in properties" :key="property.id" class="property-context">
      <span class="property-key single-key" v-if="property.value == 'true'">
        <SvgDash class="property-icon dash-icon" />
        {{ property.key }}
      </span>
      <span v-else class="property-key">
        {{ property.key }}
        <SvgColon class="property-icon" />
        <span class="property-value">{{ property.value }}</span>
      </span>
    </p>
  </div>
</template>

<style lang="scss">
.properties-wrapper {
  padding: 0 20px;
  .property-context {
    margin-bottom: 10px;
    font-size: 0.8em;

    .property-key {
      align-items: center;
      display: flex;
      font-weight: 600;
      .property-icon {
        color: $primary;
        width: 15px;
        height: 20px;
        &.dash-icon {
          margin-left: 5px;
        }
      }
      .property-value,
      &.single-key {
        font-weight: 100;
      }
    }
  }
}
</style>
