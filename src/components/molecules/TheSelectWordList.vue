<template>
  <div class="the-select-word-list-group">
    <h3 class="py-4">Play</h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">List Length</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wordList, index) in wordLists" :key="index">
            <td>{{ wordList.name }}</td>
            <td>{{ wordList.words.length }}</td>
            <td>
              <v-btn
                v-if="wordList.name !== wordListName"
                @click="selectWordList(wordList.name)"
                outlined
              >
                {{ wordList.name === wordListName ? 'Selected' : 'Play' }}
              </v-btn>
              <span v-else>SELECTED</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<style lang="scss" scoped>
.the-select-word-list-group {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }
}
</style>

<script>
export default {
  name: 'TheSelectWordListGroup',
  props: {
    wordLists: {
      type: Array,
      required: true
    },
    wordListName: {
      prop: String,
      required: true
    }
  },
  methods: {
    selectWordList(wordListName){
      this.$emit('wordListSelect', wordListName)
    }
  }
}
</script>