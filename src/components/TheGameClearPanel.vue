<template>
  <div>
    <p class="text-align-center">Game clear!</p>
    <p class="time text-align-center">Time: {{ time }} seconds</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  p {
    background-color: $text-black-primary;
    color: $text-white-primary;
    font-size: $fsize-h5;
    font-weight: $fweight-h3;
    margin: 0;
    padding: 40px;
  }
}
</style>

<script>
export default {
  name: 'TheGameClearPanel',
  props: {
    time: {
      type: String,
      required: true
    }
  }
}
</script>

