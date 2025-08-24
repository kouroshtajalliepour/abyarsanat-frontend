<script setup lang="ts"></script>
<template>
  <div class="slogan-animation-wrapper">
    <div>
      <div class="animation-text-wrapper">
        <p>The <strong>Book</strong> For Life</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.slogan-animation-wrapper {
  max-height: 150px;
  .animation-text-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    transform: scale(1);
    opacity: 1;

    p {
      font-size: 40px;
      color: #fbfffe;
      text-shadow: 2px 2px 0px rgb(63, 63, 63), -2px -2px 0px rgb(63, 63, 63),
        2px -2px 0px rgb(63, 63, 63), -2px 2px 0px rgb(63, 63, 63);

      @include sm {
        font-size: 60px;
      }

      @include md {
        font-size: 80px;
      }

      @include lg {
        font-size: 110px;
      }

      @include xl {
        font-size: 128px;
      }

      strong {
        color: rgba(14, 155, 133, 1);
      }
    }
  }
  @include lg {
    max-height: 180px;
  }
}
</style>
