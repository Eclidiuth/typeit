<template>
  <ti-sheet>
    <div class="w-11/12 mx-auto py-4">
      <the-page-title>Create</the-page-title>
      <v-text-field v-model="wordListName" label="Word list name"></v-text-field>
      <v-alert v-if="!isWordListNameEmpty && isWordListNameAvailable" color="green" dark>The word list name {{ wordListName }} is available.</v-alert>
      <v-alert v-else-if="isCreateButtonClicked && isWordListNameEmpty" color="pink" dark type="error">Please input word list name.</v-alert>
      <v-alert v-else-if="!isWordListNameAvailable" color="pink" dark type="error">The word list name {{ wordListName }} is already exist.</v-alert>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Word</th>
              <th>Length</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(word, index) in wordList" :key="index">
              <td>
                {{ word }}
              </td>
              <td>
                {{ word.length }}
              </td>
              <td>
                <v-btn @click="deleteWord(index)" text>Delete</v-btn>
              </td>
            </tr>
            <tr>
              <td>
                <v-text-field v-model="inputFieldValue" label="Input word here"></v-text-field>
              </td>
              <td>
                {{ inputFieldValue.length }}
              </td>
              <td>
                <v-btn @click="addWord()" text>Add</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="my-3">
        <v-alert v-if="isCreateButtonClicked && isWordListEmpty" color="pink" dark type="error">You should have a word at least.</v-alert>
        <v-btn @click="handleClickCreateButton()">Create</v-btn>
      </div>
    </div>
  </ti-sheet>
</template>

<script>
import TiSheet from '@/components/atoms/TiSheet.vue'
import ThePageTitle from '@/components/atoms/ThePageTitle.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Create',
  components: {
    'ti-sheet': TiSheet,
    ThePageTitle
  },
  data: () => ({
    wordList: [],
    wordListName: "",
    inputFieldValue: "",
    isCreateButtonClicked: false,
  }),
  computed: {
    ...mapGetters(['wordLists']),

    isWordListEmpty(){
      return this.wordList.length === 0
    },
    isWordListNameEmpty(){
      return this.wordListName.trim().length === 0
    },
    isWordListNameAvailable(){
      return this.wordLists.map(wordList => wordList.name).includes(this.wordListName)
        ? false : true
    }
  },
  methods: {
    ...mapActions(['addWordList']),

    addWord(){
      if(this.inputFieldValue.trim() !== ""){
        this.wordList.push(this.inputFieldValue)
        this.inputFieldValue = ""
      }
    },
    deleteWord(index){
      this.wordList.splice(index, 1)
      this.isCreateButtonClicked = false
    },
    handleClickCreateButton(){
      this.isCreateButtonClicked = true

      if(this.isWordListNameAvailable && !this.isWordListEmpty){
        this.addWordList({
          name: this.wordListName,
          words: this.wordList
        })

        localStorage.setItem("wordLists", JSON.stringify(this.wordLists))
      }
    }
  }
}
</script>