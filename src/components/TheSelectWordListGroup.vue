<template>
  <div class="the-select-word-list-group">
    <h3>Play</h3>
    <div class="wordList">
      <div class="wordList-item">
        <div class="wordList-listName">
          <span>Name</span>
        </div>
        <div class="wordList-listLength">
          <span>Length</span>
        </div>
        <div class="wordList-action">
          <span>Action</span>
        </div>
      </div>
      <div v-for="(wordList, index) in wordLists" :key="index" class="wordList-item">
        <div class="wordList-listName">
          <span>{{ wordList.name }}</span>
        </div>
        <div class="wordList-listLength">
          <span>{{ wordList.words.length }}</span>
        </div>
        <div class="wordList-action">
          <span>Play</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-select-word-list-group {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }

  .wordList {
    .wordList-item {
      display: flex;
  
      &:nth-child(odd) {
        background: $white-secondary;
      }
    }
  
    .wordList-listName {
      width: 60%;
    }
  
    .wordList-listLength {
      width: 20%;
    }

    .wordList-action {
      width: 20%;
    }
  
    .wordList-listName span,
    .wordList-listLength span,
    .wordList-action span {
      display: block;
      padding: 16px;
    }
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
    }
  }
}
</script>