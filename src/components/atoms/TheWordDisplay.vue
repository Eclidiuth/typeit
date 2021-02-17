<template>
  <div>
    <the-game-state-label :gameState="gameState" />
    <p class="text-4xl text-center mb-0 p-10">
      <span
        v-for="(char, index) in word"
        :key="index"
        :class="hilightClassNames[index]"
      >{{ char }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
div {
  background-color: $text-black-primary;

  p {
    color: $text-white-primary;

    .word--correct {color: green; }

    .word--incorrect { color: red; }
  }
}
</style>

<script>
import TheGameStateLabel      from '@/components/atoms/TheGameStateLabel.vue'

export default {
  name: 'TheWordDisplay',
  components: {
    TheGameStateLabel,
  },
  props: {
    inputCheckResult: {
      type: Array,
      required: true,
    },
    gameState: {
      props: {
        type: String,
        required: true
      }
    },
    word: {
      type: String,
      required: true
    }
  },
  computed: {
    hilightClassNames(){ return this.inputCheckResult.map(el => el ? 'word--correct' : 'word--incorrect') }
  }
}
</script>