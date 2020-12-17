<template>
  <the-content id="editList">
    <div class="container-90">
      <the-page-title>Edit list "{{ $route.params.id }}"</the-page-title>
      <template v-if="words">
        <div class="wordList">
          <div class="wordList-header">
            <div class="wordList-word">Word</div>
            <div class="wordList-wordLength">Length</div>
            <div class="wordList-delete">Delete</div>
          </div>
          <div v-for="(word, index) in words" :key="index" class="wordList-item">
            <div class="wordList-word">{{ word }}</div>
            <div class="wordList-wordLength">{{ word.length }}</div>
            <div class="wordList-delete" @click="deleteWord(index)">Delete</div>
          </div>
          <div class="wordList-addWordForm">
            <input v-model="addWordFormInputValue" type="text">
            <p>Length : {{ addWordFormInputValue.length }}</p>
          </div>
        </div>
        <div>
          <button>Save changes</button>
          <button>Cancel</button>
        </div>
      </template>
      <template v-else>
        <p>Error!</p>
        <p>Word list "{{ $route.params.id }}" no found.</p>
      </template>
    </div>
  </the-content>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
#editList {
  padding: 48px 0;

  .wordList {
    & > div:nth-child(odd) {
      background-color: $white-secondary;
    }
    
    .wordList-header {
      display: flex;
    }

    .wordList-item {
      display: flex;
    }

    .wordList-word,
    .wordList-wordLength,
    .wordList-delete {
      padding: 16px;
    }

    .wordList-word {
      flex: 1;
    }

    .wordList-wordLength {
      width: 20%;
    }

    .wordList-delete {
      &:hover {
        text-decoration: underline;
      }
    }

  }
}
</style>

<script>
import TheContent from '../components/TheContent.vue'
import ThePageTitle from '@/components/ThePageTitle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'EditList',
  components: {
    TheContent,
    ThePageTitle
  },
  data(){
    return {
      addWordFormInputValue: "",
      words: this.originalWords
    }
  },
  computed: {
    ...mapGetters('play', ['wordLists', 'findWordListByName']),

    originalWords(){
      const wordList = this.findWordListByName(this.$route.params.id)
      return wordList ? wordList.words : null
    }
  },
  methods: {
    deleteWord(index){
      this.words.splice(index, 1)
    }
  },
  mounted(){
    this.words = this.originalWords
  }
}
</script>