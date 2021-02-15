<template>
  <div>
    <h3 class="my-2">Words | {{ wordListName }}</h3>
    <v-chip-group column>
      <v-chip
        v-for="(word, index) in words"
        :key="index"
        :color="index + 1<= wordListIndex ? 'green' : ''"
        :text-color="index + 1<= wordListIndex ? 'white' : ''" 
      >{{ word }}</v-chip>
    </v-chip-group>
  </div>
</template>

<style lang="scss" scoped>
div {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>

<script>
export default {
  name: 'TheWordListGroup',
  props: {
    words: {
      type: Array,
      required: true
    },
    wordListName: {
      type: String,
      required: true
    },
    wordListIndex: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    panel: [0]
  })
}
</script>