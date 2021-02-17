<template>
  <div>
    <div class="green darken-3 text-4xl p-10 text-center">Clear time: {{ time }} seconds</div>
    <div class="playAgain flex justify-center p-8">
      <p class="inline-block text-2xl mb-0 px-4 py-2">
        <font-awesome-icon icon="undo" />
        Play again
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div {
    color: $text-white-primary;

    &.playAgain {
      background-color: $black;

      p {
        flex: 0 1 auto;
        transition: background .15s;

        &:hover {
          background-color: lighten($black, 5%);
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

