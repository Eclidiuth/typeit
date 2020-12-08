<template>
  <div>
    <div id="play" class="container my-5">
      <div class="header">
        <p>{{ inputFieldValue ? inputFieldValue : 'none'}}</p>
        <p>Array: {{ checkWordAndInput }}</p>
        <template v-if="isGameEnded">
          <the-game-clear-panel time="20" v-on:click.native="restartGame" />
        </template>
        <template v-else>
          <the-word-display :word="word" :charCheckCollections="checkWordAndInput" />
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
import TheGameClearPanel    from '@/components/TheGameClearPanel.vue'
import TheWordDisplay       from '@/components/TheWordDisplay.vue'
import TheWordInputField    from '@/components/TheWordInputField.vue'
import TheWordListGroup     from '@/components/TheWordListGroup.vue'
import TheRankingListGroup  from '@/components/TheRankingListGroup.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TheGameClearPanel,
    TheWordDisplay,
    TheWordInputField,
    TheWordListGroup,
    TheRankingListGroup
  },
  computed: {
    ...mapGetters('play', [
      'word', 'wordListWords', 'wordListIndex'
    ]),

    checkWordAndInput(){
      const word = this.word
      const input = this.inputFieldValue
      let result;

      if(input.length === word.length || input.length > word.length){
        result = word.split("").map((char, index) => char === input[index])
      } else if(input.length < word.length){
        result = input.split("").map((char, index) => char === word[index])
      }

      return result;
    },

    isGameEnded(){
      const wordListWordsLength = this.wordListWords.length
      const wordListIndex = this.wordListIndex
      const isGameEnded = (wordListWordsLength - 1 === wordListIndex)
        ? true : false

      return isGameEnded
    },
    isInputCorrect(){ return this.word === this.inputFieldValue },

    inputFieldValue: {
      get(){  return this.$store.getters['play/inputFieldValue'] },
      set(value){ this.$store.dispatch('play/updateInputFieldValue', value) }
    }
  },
  watch: {
    inputFieldValue(){
      const shouldUpdateWordListIndex = this.isInputCorrect

      if(shouldUpdateWordListIndex && !this.isGameEnded){
        const nextWordListIndex = this.wordListIndex + 1

        this.$store.dispatch('play/updateWordListIndex', nextWordListIndex)
        this.clearInputField()
      }
    }
  },
  methods: {
    clearInputField(){
      setTimeout(() => this.$store.dispatch('play/updateInputFieldValue', ''))
    },
    restartGame(){
      this.$store.dispatch('play/resetWordListIndex')
    }
  }
}
</script>