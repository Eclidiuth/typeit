<template>
  <ti-sheet>
    <ti-game-panel 
      :wordList="wordList"
      :wordListIndex="wordListIndex"
      @updateWordListIndex="handleUpdateWordListIndex"
      ref="tiGamePanel"
    />
    <div class="main mt-4 pb-3">
      <the-word-list
        :words="wordList.words"
        :wordListName="wordListName"
        :wordListIndex="wordListIndex"
        class="w-11/12 mx-auto my-4 mt-8"
      />
      <div class="xl:flex w-11/12 mx-auto my-4">
        <div class="xl:w-6/12 mx-auto">
          <the-ranking-list :records="timeRecords" class="md:w-11/12" />
        </div>
        <div class="xl:w-6/12 mx-auto">
          <the-select-word-list
            @wordListSelect="handleWordListSelect"
            :wordLists="wordLists"
            :wordListName="wordListName"
            class="md:w-11/12"
          />
        </div>
      </div>
    </div>
  </ti-sheet>
</template>

<script>
import TiSheetVue             from '@/components/atoms/TiSheet.vue'
import TiGamePanel            from '@/components/atoms/TiGamePanel.vue'
import TheWordList       from '@/components/molecules/TheWordList.vue'
import TheRankingList    from '@/components/molecules/TheRankingList.vue'
import TheSelectWordList from '@/components/molecules/TheSelectWordList.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    'ti-sheet': TiSheetVue,
    TiGamePanel,
    TheWordList,
    TheRankingList,
    TheSelectWordList,
  },
  data(){
    return {
      wordListIndex: 0,
      wordListName: 'JavaScript config files',
    }
  },
  computed: {
    ...mapGetters(['wordLists', 'findRecordByName']),

    wordList(){
      const wordList = this.wordLists.filter(list => list.name === this.wordListName)
      return wordList ? wordList[0] : null
    },
    timeRecords(){
      const record = this.findRecordByName(this.wordListName)
      return record.sort((a, b) => a.time > b.time ? 1 : -1).slice(0, 5)
    },
  },
  methods: {
    handleWordListSelect(wordListName){
      this.wordListName = wordListName
      this.$refs.tiGamePanel.restartGame()
    },
    handleUpdateWordListIndex(value){
      this.wordListIndex = value
    }
  },
}
</script>