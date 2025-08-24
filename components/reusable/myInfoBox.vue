<script lang="ts" setup>
// * composables
const { t } = useI18n();
defineProps<{
  info: string;
  as?: "html" | "text";
}>();
</script>

<template>
  <div>
    <div class="information-box-wrapper">
      <div class="information-box">
        <p v-if="!as || as == 'text'" class="information-context">{{ t(info) }}</p>
        <p v-else class="information-context" v-html="t(info)"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.information-box-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0px;

  .information-box {
    width: calc(90vw + 5px);
    background-color: $optional-bg;
    border: 1px solid $primary;
    border-radius: 12px;
    padding: 25px 15px;
    .information-context {
      font-size: 15px;
    }
  }
  @include lg {
    margin: 50px 0px;
    .information-box {
      padding: 40px;
      width: calc(45vw + 120px);
      .information-context {
        font-size: 18px;
      }
    }
  }
}
</style>
