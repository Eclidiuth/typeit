<template>
  <ti-sheet id="editList">
    <div class="w-11/12 mx-auto py-4">
      <the-page-title class="flex justify-between">
        Edit the word list "{{ $route.params.id }}"
          <v-dialog v-model="wordListDeleteDialog" persistent max-width="550">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" dark outlined v-bind="attrs" v-on="on">
                Delete
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Delete word list "{{ this.$route.params.id }}"?
              </v-card-title>
              <v-card-text>
                This operation deletes the word list "hoge" and its time record and cannot be undone.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="wordListDeleteDialog = false"
                >
                  Disagree
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="handleClickDeleteWordListButton()"
                >
                  Agree
                </v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>  
      </the-page-title>
      <template v-if="words">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Word</th>
                <th class="text-left">Word Length</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in words" :key="index">
                <td>
                  <v-text-field v-model="words[index]" :key="index"></v-text-field>
                </td>
                <td>{{ word.length }}</td>
                <td>
                  <v-btn outlined @click="deleteWord(index)">Delete</v-btn>
                </td>
              </tr>
              <tr>
                <td>
                  <v-text-field
                    v-model="addWordFormInput"
                    label="Input word here"
                  ></v-text-field>
                </td>
                <td>
                  <span>{{ addWordFormInput.length }}</span>
                </td>
                <td>
                  <v-btn outlined @click="addWord()">Add</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="my-3">
          <v-alert color="pink" dark type="error" v-if="isWordListEmpty">You shoud have a word at least.</v-alert>
          <v-btn :disabled="isWordListEmpty" @click="saveChanges()" class="mr-2">Save</v-btn>
          <v-btn :disabled="isWordListEmpty" @click="backToEditPage()">Cancel</v-btn>
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
import { mapActions, mapGetters } from 'vuex'

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
      wordListDeleteDialog: false,
    }
  },
  computed: {
    ...mapGetters(['wordLists']),

    originalWords(){
      const wordList = this.wordLists.filter(wordList => wordList.name === this.$route.params.id)[0]
      return wordList ? wordList.words : null
    },
    isWordListEmpty(){
      return this.words.length === 0
    }
  },
  methods: {
    ...mapActions(['deleteWordList']),

    deleteWord(index){
      this.words.splice(index, 1)
    },
    addWord(){
      const inputValue = this.addWordFormInput.trim()

      if(inputValue!== "") this.words.push(inputValue)
      this.addWordFormInput = ""
    },
    saveChanges(){
      if(!this.isWordListEmpty){
        const wordListName = this.$route.params.id
        this.$store.dispatch('updateWordListWords', {
          wordListName: wordListName,
          words: this.words
        })
  
        localStorage.setItem('wordLists', JSON.stringify(this.wordLists))
      }
    },
    backToEditPage(){
      this.$router.push('/edit/')
    },
    handleClickDeleteWordListButton(){
      this.wordListDeleteDialog = false
      this.deleteWordList(this.$route.params.id)
      localStorage.setItem('wordLists', JSON.stringify(this.wordLists))
      this.$router.push('/edit/')
    },
    handleInputAddWordForm(e){
      console.log(e)
    }
  },
  mounted(){
    const wordList = this.wordLists.filter(wordList => wordList.name === this.$route.params.id)
    if(wordList){
      this.words = wordList[0].words
    }
  }
}
</script>