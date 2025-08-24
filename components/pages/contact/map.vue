<template>
  <div class="map-wrapper">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6474.870610912161!2d51.443774!3d35.764682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6aa78bd4b37712c8!2sAdelan%20tejarat%20jam!5e0!3m2!1sen!2sus!4v1667931080928!5m2!1sen!2sus"
      style="border: 0"
      allowfullscreen="true"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>
<style lang="scss">
.map-wrapper {
  width: 100%;
  margin-top: 50px;
  // margin: 30px 100px;
  height: 600px;
  iframe {
    width: 100%;
    height: 100%;
    border: 1px solid $primary !important;
    border-radius: 12px;
  }

  @include lg {
    // height: calc(118vh + 65px);
    width: 48%;
    margin-top: 0px;
  }
}
</style>
