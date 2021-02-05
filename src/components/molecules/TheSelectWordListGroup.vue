<template>
  <div class="the-select-word-list-group">
    <h3 class="py-4">Play</h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Length</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wordList, index) in wordLists" :key="index">
            <td>{{ wordList.name }}</td>
            <td>{{ wordList.words.length }}</td>
            <td>
              <span @click="selectWordList(wordList.name)">
                {{ wordList.name === wordListName ? 'Selected' : 'Play' }}
              </span>
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
import { mapGetters } from 'vuex'

export default {
  name: 'TheSelectWordListGroup',
  props: {
    wordLists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('play', ['wordListName'])
  },
  methods: {
    selectWordList(wordListName){
      this.$store.dispatch('play/updateWordListName', wordListName)
      this.$store.dispatch('play/updateWordListIndex', 0)
      this.$store.dispatch('play/updateGameState', 'standby')
    }
  }
}
</script>