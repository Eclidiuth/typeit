<template>
  <the-content id="editList">
    <div class="container-90">
      <the-page-title>Edit list "{{ $route.params.id }}"</the-page-title>
      <template v-if="words">
        <ul class="wordList">
          <li class="wordList-header wordList-item">
            <div class="wordList-item-word">
              <span>Word</span>
              </div>
            <div class="wordList-item-wordLength">
              <span>Length</span>
              </div>
            <div class="wordList-item-wordDelete">
              <span>Action</span>
              </div>
          </li>
          <li v-for="(word, index) in words" :key="index" class="wordList-item">
            <div class="wordList-item-word">
              <span>{{ word }}</span>
            </div>
            <div class="wordList-item-wordLength">
              <span>{{ word.length }}</span>
            </div>
            <div class="wordList-item-wordDelete">
              <span @click="deleteWord(index)">Delete</span>
            </div>
          </li>
          <li class="wordList-addWord wordList-item">
            <div class="wordList-item-wordInputForm">
              <input v-model="addWordFormInput" type="text" placeholder="Input word here">
            </div>
            <div class="wordList-item-wordLength">
              <span>{{ addWordFormInput.length }}</span>
            </div>
            <div class="wordList-item-addWord">
              <span @click="addWord()">Add</span>
            </div>
          </li>
        </ul>
        <div class="my-3">
          <t-button @click.native="saveChanges()" class="mr-2">Save changes</t-button>
          <t-button @click.native="backToEditPage()">Cancel</t-button>
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
    margin: 0;
    padding: 0;
    list-style: none;

    .wordList-item {
      display: flex;

      &:nth-child(odd) {
        background-color: $white-secondary;
      }

      .wordList-item-word span,
      .wordList-item-wordLength span,
      .wordList-item-wordDelete span,
      .wordList-item-wordInputForm input,
      .wordList-item-addWord span {
        display: block;
        padding: 16px;
      }

      .wordList-item-word,
      .wordList-item-wordInputForm {
        width: 70%;
      }

      .wordList-item-wordLength {
        width: 20%;
      }

      .wordList-item-wordDelete,
      .wordList-item-addWord {
        width: 10%;

        span {
          &:hover {
            text-decoration: underline;
          } 
        }
      }

      .wordList-item-wordInputForm {
        input {
          background: transparent;
          box-sizing: border-box;
          border: 0;
          margin: 8px;
          padding: 8px;
          width: calc(100% - 16px);
        }
      }
    }
  }
}
</style>

<script>
import TheContent from '../components/TheContent.vue'
import ThePageTitle from '@/components/ThePageTitle.vue'
import TButton from '@/components/TButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'EditList',
  components: {
    TheContent,
    ThePageTitle,
    TButton,
  },
  data(){
    return {
      addWordFormInput: "",
      words: null
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
    },
    addWord(){
      const inputValue = this.addWordFormInput.trim()

      if(inputValue!== "") this.words.push(inputValue)
      this.addWordFormInput = ""
    },
    saveChanges(){
      const wordListName = this.$route.params.id
      const words = this.words
      this.$store.dispatch('play/updateWordListWords', {
        wordListName: wordListName,
        wordListWords: words
      })

      localStorage.setItem('play/wordLists', JSON.stringify(this.wordLists))
    },
    backToEditPage(){
      this.$router.push('/edit/')
    }
  },
  mounted(){
    if(localStorage.getItem('play/wordLists')){
      this.$store.dispatch('play/updateWordLists', JSON.parse(localStorage.getItem('play/wordLists')))
    }
    this.words = this.originalWords.slice()
  }
}
</script>