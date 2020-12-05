<template>
  <div>
    <p class="text-align-center">{{ word }}</p>
  </div>
</template>

<script>
export default {
  name: 'TheWordDisplay',
  props: {
    word: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  background-color: $text-black-primary;
  padding: 40px;

  p {
    color: $text-white-primary;
    font-size: $fsize-h5;
    font-weight: $fweight-h3;
    margin: 0;
  }
}
</style>