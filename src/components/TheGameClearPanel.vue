<template>
  <div>
    <div class="time text-align-center">Cleared! Time: {{ time }} seconds</div>
    <div class="playAgain d-flex justify-content-center">
      <p>
        <font-awesome-icon icon="undo" />
        Play again
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  div {
    color: $text-white-primary;
    margin: 0;

    p {
      margin: 0;
      padding: 0;
    }

    &.time {
      background-color: $colors-green;
      font-size: $fsize-h4;
      padding: 40px;
    }

    &.playAgain {
      background-color: $black;
      font-size: $fsize-h5;
      padding: 32px;

      p {
        border-radius: 8px;
        display: inline-block;
        flex: 0 1 auto;
        transition: background .15s;
        padding: 8px;

        &:hover {
          background-color: lighten($black, 5%);
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'TheGameClearPanel',
  props: {
    time: {
      type: Number,
      required: true
    }
  }
}
</script>

