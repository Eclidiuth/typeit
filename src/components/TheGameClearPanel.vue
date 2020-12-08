<template>
  <div>
    <p class="time text-align-center">Cleared! Time: 20 seconds</p>
    <p class="playAgain text-align-center">
      <font-awesome-icon icon="undo" />
      Play again
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  p {
    color: $text-white-primary;
    margin: 0;
    padding: 40px;

    &.time {
      background-color: $colors-green;
      font-size: $fsize-h4;
    }

    &.playAgain {
      background-color: $black;
      font-size: $fsize-h5;
    }
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

