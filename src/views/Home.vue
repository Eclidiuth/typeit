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
        <the-word-display :word="word" :charCheckCollections="checkWordAndInput" />
        <the-word-input-field v-model="inputFieldValue" />
      </template>
    </div>
    <div class="main pb-3">
      <div class="w-11/12 mx-auto">
        <the-word-list :words="wordListWords" :wordListName="wordListName" />
        <div class="xl:flex">
          <div class="xl:w-1/2">
            <the-ranking-list :records="timeRecords" class="md:w-11/12" />
          </div>
          <div class="xl:w-1/2">
            <the-select-word-list @wordListSelect="handleWordListSelect"
              :wordLists="wordLists" :wordListName="wordListName" class="md:w-11/12"
            />
          </div>
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
    ...mapGetters(['wordLists']),
    ...mapGetters('ranking', ['findRecordByName']),

    word(){
      return this.wordListWords[this.wordListIndex]
    },
    wordList(){
      const wordList = this.wordLists.filter(list => list.name === this.wordListName)
      return wordList ? wordList[0] : null
    },
    wordListWords(){
      return this.wordList.words
    },
    timeRecords(){
      const record = this.findRecordByName(this.wordListName)
      return record ? record.timeRecords.sort((a, b) => a.time > b.time ? 1 : -1) : null
    },
    checkWordAndInput(){
      const word = this.word
      const input = this.inputFieldValue

      return (input.length >= word.length)
        ? word.split("").map((char, index) => char === input[index])
        : input.split("").map((char, index) => char === word[index])
    },
  },
  methods: {
    restartGame(){
      this.wordListIndex = 0
      this.gameState = GAME_STATE.STAND_BY
    },
    getGameClearTime(){
      const gameStartedAt = this.gameStartedAt
      const gameClearedAt = this.gameClearedAt
      const ms = gameClearedAt.getTime() - gameStartedAt.getTime()

      return Number((ms / 1000).toFixed(1))
    },
    handleWordListSelect(wordListName){
      this.gameState = GAME_STATE.STAND_BY
      this.wordListName = wordListName
      this.wordListIndex = 0
    }
  },
  watch: {
    inputFieldValue(){
      const gameState = this.gameState

      if(gameState === 'standby'){
        this.gameStartedAt = new Date()
        this.gameState = GAME_STATE.PLAYING
      }

      if(this.word === this.inputFieldValue){
        const nextWordListIndex = this.wordListIndex + 1

        if(this.wordListWords[nextWordListIndex]){
          this.wordListIndex = nextWordListIndex
        } else {
          this.gameClearedAt = new Date()
          this.gameState = GAME_STATE.CLEARED

          const gameStartedAt = this.gameStartedAt
          const year    = gameStartedAt.getFullYear()
          const month   = ('0' + gameStartedAt.getMonth() + 1).slice(-2)
          const date    = ('0' + gameStartedAt.getDate()).slice(-2)
          const hour    = ('0' + gameStartedAt.getHours()).slice(-2)
          const minute  = ('0' + gameStartedAt.getMinutes()).slice(-2)
          const seconds = ('0' + gameStartedAt.getSeconds()).slice(-2)
          const gameClearedAt_str = `${year}/${month}/${date} ${hour}:${minute}:${seconds}`

          const records = this.timeRecords ? this.timeRecords : []
          records.push({
            time: this.getGameClearTime(),
            date: gameClearedAt_str
          })

          this.$store.dispatch('ranking/updateTimeRecord', {
            recordName: this.wordListName,
            newTimeRecords: records
          })

          localStorage.setItem('ranking/records', JSON.stringify(this.$store.getters['ranking/records']))
        }

        setTimeout(() => this.inputFieldValue = "")
      }
    }
  },
  mounted(){
    const records = localStorage.getItem('ranking/records')
    if(records){
      this.$store.dispatch('ranking/updateRecords', JSON.parse(records))
    }
  }
}
</script>