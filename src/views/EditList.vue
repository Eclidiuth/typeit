<template>
  <ti-sheet id="editList">
    <div class="w-11/12 mx-auto py-4">
      <the-page-title>Edit list "{{ $route.params.id }}"</the-page-title>
      <template v-if="words">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Word</th>
                <th class="text-left">Length</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in words" :key="index">
                <td>{{ word }}</td>
                <td>{{ word.length }}</td>
                <td>
                  <v-btn @click="deleteWord(index)" text>Delete</v-btn>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field v-model="addWordFormInput" label="Input word here"></v-text-field>
                </td>
                <td>
                  <span>{{ addWordFormInput.length }}</span>
                </td>
                <td>
                  <v-btn @click="addWord()" text>Add</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="my-3">
          <p v-if="isWordListWordsEmpty">Error! You shoud add 1 word at least.</p>
          <v-btn @click.native="saveChanges()" class="mr-2">Save changes</v-btn>
          <v-btn @click.native="backToEditPage()">Cancel</v-btn>
        </div>
      </template>
      <template v-else>
        <p>Error!</p>
        <p>Word list "{{ $route.params.id }}" no found.</p>
      </template>
    </div>
  </ti-sheet>
</template>

<script>
import TiSheet from '../components/atoms/TiSheet.vue'
import ThePageTitle from '@/components/atoms/ThePageTitle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'EditList',
  components: {
    'ti-sheet': TiSheet,
    ThePageTitle,
  },
  data(){
    return {
      addWordFormInput: "",
      words: null,
    }
  },
  computed: {
    ...mapGetters('play', ['wordLists', 'findWordListByName']),

    originalWords(){
      const wordList = this.findWordListByName(this.$route.params.id)
      return wordList ? wordList.words : null
    },
    isWordListWordsEmpty(){
      return this.words.length === 0
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
      if(!this.isWordListWordsEmpty){
        const wordListName = this.$route.params.id
        this.$store.dispatch('play/updateWordListWords', {
          wordListName: wordListName,
          wordListWords: this.words
        })
  
        localStorage.setItem('play/wordLists', JSON.stringify(this.wordLists))
      }
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