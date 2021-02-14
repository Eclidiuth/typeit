<template>
  <ti-sheet>
    <div class="header">
      <template v-if="gameState === 'cleared'">
        <the-game-clear-panel
          :time="getGameClearTime()"
          v-on:click.native="restartGame"
        />
      </template>
      <template v-else-if="gameState === 'playing' || gameState === 'standby'">
        <the-word-display :word="word" :inputCheckResult="checkWordAndInput" />
        <the-word-input-field v-model="inputFieldValue" />
      </template>
    </div>
    <div class="main mt-4 pb-3">
      <the-word-list :words="wordList.words" :wordListName="wordListName" class="w-11/12 mx-auto my-4 mt-8" />
      <div class="xl:flex w-11/12 mx-auto my-4">
        <div class="w-6/12 mx-auto">
          <the-ranking-list :records="timeRecords" class="md:w-11/12" />
        </div>
        <div class="w-6/12 mx-auto">
          <the-select-word-list @wordListSelect="handleWordListSelect"
            :wordLists="wordLists" :wordListName="wordListName" class="md:w-11/12"
          />
        </div>
      </div>
    </div>
  </ti-sheet>
</template>

<script>
import TiSheetVue             from '@/components/atoms/TiSheet.vue'
import TheGameClearPanel      from '@/components/atoms/TheGameClearPanel.vue'
import TheWordDisplay         from '@/components/atoms/TheWordDisplay.vue'
import TheWordInputField      from '@/components/atoms/TheWordInputField.vue'
import TheWordList       from '@/components/molecules/TheWordList.vue'
import TheRankingList    from '@/components/molecules/TheRankingList.vue'
import TheSelectWordList from '@/components/molecules/TheSelectWordList.vue'
import { mapGetters } from 'vuex'

const GAME_STATE = {
  STAND_BY: 'standby',
  PLAYING: 'playing',
  CLEARED: 'cleared'
}

export default {
  name: 'Home',
  components: {
    'ti-sheet': TiSheetVue,
    TheGameClearPanel,
    TheWordDisplay,
    TheWordInputField,
    TheWordList,
    TheRankingList,
    TheSelectWordList,
  },
  data(){
    return {
      gameState: GAME_STATE.STAND_BY,
      gameStartedAt: null,
      gameClearedAt: null,
      wordListIndex: 0,
      wordListName: 'JavaScript config files',
      inputFieldValue: ''
    }
  },
  computed: {
    ...mapGetters(['wordLists', 'findRecordByName']),

    word(){ return this.wordList.words[this.wordListIndex] },
    wordList(){
      const wordList = this.wordLists.filter(list => list.name === this.wordListName)
      return wordList ? wordList[0] : null
    },
    timeRecords(){
      const record = this.findRecordByName(this.wordListName)
      return record ? record.sort((a, b) => a.time > b.time ? 1 : -1) : null
    },
    checkWordAndInput(){
      return (this.inputFieldValue.length >= this.word.length)
        ? this.word.split("").map((char, index) => char === this.inputFieldValue[index])
        : this.inputFieldValue.split("").map((char, index) => char === this.word[index])
    },
  },
  methods: {
    restartGame(){
      this.gameState = GAME_STATE.STAND_BY
      this.inputFieldValue = ""
      this.wordListIndex = 0
    },
    getGameClearTime(){
      const ms = this.gameClearedAt.getTime() - this.gameStartedAt.getTime()
      return Number((ms / 1000).toFixed(1))
    },
    handleWordListSelect(wordListName){
      this.wordListName = wordListName
      this.restartGame()
    }
  },
  watch: {
    inputFieldValue(){
      if(this.gameState === GAME_STATE.STAND_BY){
        this.gameStartedAt = new Date()
        this.gameState = GAME_STATE.PLAYING
      }

      if(this.word === this.inputFieldValue){
        const nextWordListIndex = this.wordListIndex + 1

        if(this.wordList.words[nextWordListIndex]){
          this.wordListIndex = nextWordListIndex
        } else {
          this.gameClearedAt = new Date()
          this.gameState = GAME_STATE.CLEARED

          const gameStartedAt = this.gameStartedAt
          const year    = gameStartedAt.getFullYear()
          const month   = ('0' + (gameStartedAt.getMonth() + 1)).slice(-2)
          const date    = ('0' + gameStartedAt.getDate()).slice(-2)
          const hour    = ('0' + gameStartedAt.getHours()).slice(-2)
          const minute  = ('0' + gameStartedAt.getMinutes()).slice(-2)
          const seconds = ('0' + gameStartedAt.getSeconds()).slice(-2)

          this.$store.dispatch('addTimeRecord', {
            wordListName: this.wordListName,
            timeRecord: {
              time: this.getGameClearTime(),
              date: `${year}/${month}/${date} ${hour}:${minute}:${seconds}`
            }
          })
        }

        setTimeout(() => this.inputFieldValue = "")
      }
    }
  }
}
</script>