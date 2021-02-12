<template>
  <div>
    <v-expansion-panels accordion flat multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="pt-6 pb-4">Words | {{ wordListName }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-chip-group column>
            <v-chip v-for="(word, index) in words" :key="index">{{ word }}</v-chip>
          </v-chip-group>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    }
  },
  data: () => ({
    panel: [0]
  })
}
</script>