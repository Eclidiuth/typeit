<template>
  <div>
    <template v-if="gameState === 'cleared'">
      <the-game-clear-panel
        :time="gameClearTime"
        v-on:click.native="restartGame"
      />
    </template>
    <template v-else-if="gameState === 'playing' || gameState === 'stand_by'">
      <the-word-display
        :gameState="gameState"
        :word="word"
        :inputCheckResult="checkWordAndInput"
      />
      <the-word-input-field v-model="inputFieldValue" />
    </template>
  </div>
</template>

<script>
import TheWordDisplay from '@/components/atoms/TheWordDisplay.vue'
import TheGameClearPanel from '@/components/atoms/TheGameClearPanel.vue'
import TheWordInputField from '@/components/atoms/TheWordInputField.vue'

const GAME_STATE = {
  STAND_BY: 'stand_by',
  PLAYING: 'playing',
  CLEARED: 'cleared'
}

export default {
  name: 'ti-game-panel',
  components: {
    TheWordDisplay,
    TheGameClearPanel,
    TheWordInputField
  },
  props: {
    wordList: {
      type: Object,
      required: true
    },
    wordListIndex: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    gameState: GAME_STATE.STAND_BY,
    gameStartedAt: null,
    gameClearedAt: null,
    inputFieldValue: ''
  }),
  computed: {
    word(){ return this.wordList.words[this.wordListIndex] },
    checkWordAndInput(){
      return (this.inputFieldValue.length >= this.word.length)
        ? this.word.split("").map((char, index) => char === this.inputFieldValue[index])
        : this.inputFieldValue.split("").map((char, index) => char === this.word[index])
    },
    gameClearTime(){
      if(this.gameStartedAt !== null && this.gameClearedAt !== null){
        const ms = this.gameClearedAt.getTime() - this.gameStartedAt.getTime()
        return Number((ms / 1000).toFixed(1))
      }

      return "none"
    }
  },
  methods: {
    restartGame(){
      this.gameState = GAME_STATE.STAND_BY
      this.inputFieldValue = ""
      this.$emit('updateWordListIndex', 0)
    },
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
          this.$emit('updateWordListIndex', nextWordListIndex)
        } else {
          const lastWordListIndex = this.wordListIndex + 1
          this.$emit('updateWordListIndex', lastWordListIndex)

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
            wordListName: this.wordList.name,
            timeRecord: {
              time: this.gameClearTime,
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