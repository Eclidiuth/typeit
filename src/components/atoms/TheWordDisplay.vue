<template>
  <div>
    <p class="text-center">
      <span v-for="(char, index) in word" :key="index" :class="hilightClassNames[index]">{{ char }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>

div {
  background-color: $text-black-primary;
  padding: 40px;

  p {
    color: $text-white-primary;
    font-size: $fsize-h4;
    font-weight: $fweight-h3;
    margin: 0;

    .word--correct {
      color: green;
    }

    .word--incorrect {
      color: red;
    }
  }
}
</style>

<script>
export default {
  name: 'TheWordDisplay',
  props: {
    charCheckCollections: {
      type: Array,
      required: true,
    },
    word: {
      type: String,
      required: true
    }
  },
  computed: {
    hilightClassNames(){
      return this.charCheckCollections.map(el => el ? 'word--correct' : 'word--incorrect')
    }
  }
}
</script>