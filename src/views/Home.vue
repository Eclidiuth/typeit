<template>
  <div>
    <div id="play" class="container my-5">
      <div class="header">
        <template v-if="gameState === 'cleared'">
          <the-game-clear-panel :time="getGameClearTime()" v-on:click.native="restartGame" />
        </template>
        <template v-else-if="gameState === 'playing' || gameState === 'standby'">
          <the-word-display :word="word" :charCheckCollections="checkWordAndInput" />
          <the-word-input-field v-model="inputFieldValue" />
        </template>
      </div>
      <div class="main pb-3">
        <div class="container-90">
          <the-word-list-group :words="wordListWords" class="mt-3" />
          <the-ranking-list-group :records="timeRecords" class="mt-3 mb-3" /> 
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
      'gameState',
      'gameStartedAt',
      'gameClearedAt',
      'inputFieldValue',
      'word',
      'wordListWords',
      'wordListName',
      'wordListIndex'
    ]),

    ...mapGetters('ranking', ['findRecordByName']),

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
    inputFieldValue: {
      get(){      return this.$store.getters['play/inputFieldValue'] },
      set(value){ this.$store.dispatch('play/updateInputFieldValue', value) }
    }
  },
  methods: {
    restartGame(){
      this.$store.dispatch('play/resetWordListIndex')
      this.$store.dispatch('play/updateGameState', 'standby')
    },
    getGameClearTime(){
      const gameStartedAt = this.gameStartedAt
      const gameClearedAt = this.gameClearedAt
      const ms = gameClearedAt.getTime() - gameStartedAt.getTime()

      return Number((ms / 1000).toFixed(1))
    }
  },
  watch: {
    inputFieldValue(){
      const gameState = this.gameState

      if(gameState === 'standby'){
        this.$store.dispatch('play/updateGameStartedAt', new Date())
        this.$store.dispatch('play/updateGameState', 'playing')
      }

      if(this.word === this.inputFieldValue){
        const nextWordListIndex = this.wordListIndex + 1

        if(this.wordListWords[nextWordListIndex]){
          this.$store.dispatch('play/updateWordListIndex', nextWordListIndex)
        } else {
          this.$store.dispatch('play/updateGameClearedAt', new Date())
          this.$store.dispatch('play/updateGameState', 'cleared')

          const gameStartedAt = this.$store.getters['play/gameStartedAt']
          const year    = gameStartedAt.getFullYear()
          const month   = ('0' + gameStartedAt.getMonth() + 1).slice(-2)
          const date    = ('0' + gameStartedAt.getDate() + 1).slice(-2)
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
            recordName: this.$store.getters['play/wordListName'],
            newTimeRecords: records
          })
        }

        setTimeout(() => this.$store.dispatch('play/updateInputFieldValue', ''))
      }
    }
  }
}
</script>