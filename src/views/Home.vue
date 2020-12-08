<template>
  <div>
    <div id="play" class="container my-5">
      <div class="header">
        <p>{{ inputFieldValue ? inputFieldValue : 'none'}}</p>
        <template v-if="isGameEnded">
          Game cleared!
        </template>
        <template v-else>
          <the-word-display :word="word" />
          <the-word-input-field v-model="inputFieldValue" />
        </template>
      </div>
      <div class="main pb-3">
        <div class="container-90">
          <the-word-list-group :words="wordListWords" class="mt-3" />
          <the-ranking-list-group class="mt-3 mb-3" /> 
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
#play {
  background-color: $white;
  min-width: 640px;
}
</style>

<script>
import TheWordDisplay       from '@/components/TheWordDisplay.vue'
import TheWordInputField    from '@/components/TheWordInputField.vue'
import TheWordListGroup     from '@/components/TheWordListGroup.vue'
import TheRankingListGroup  from '@/components/TheRankingListGroup.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TheWordDisplay,
    TheWordInputField,
    TheWordListGroup,
    TheRankingListGroup
  },
  computed: {
    ...mapGetters('play', [
      'word', 'wordListWords', 'wordListIndex'
    ]),

    isGameEnded(){
      const wordListWordsLength = this.wordListWords.length
      const wordListIndex = this.wordListIndex

      console.log(wordListWordsLength, wordListIndex)
      const isGameEnded = (wordListWordsLength === wordListIndex)
        ? true : false

      return isGameEnded

    },
    isInputCorrect(){
      const word = this.word
      const input = this.inputFieldValue

      return (word === input)
    },

    inputFieldValue: {
      get(){
        return this.$store.getters['play/inputFieldValue']
      },
      set(value){
        this.$store.dispatch('play/updateInputFieldValue', value)
      }
    }
  },
  watch: {
    inputFieldValue(){
      const shouldUpdateWordListIndex = this.isInputCorrect

      if(shouldUpdateWordListIndex){
        const currentWordListIndex = this.wordListIndex
        const wordListIndex = currentWordListIndex + 1

        this.$store.dispatch('play/updateWordListIndex', wordListIndex)
        this.clearInputField()
      }
    }
  },
  methods: {
    clearInputField(){
      setTimeout(() => this.$store.dispatch('play/updateInputFieldValue', ''))
    }
  }
}
</script>