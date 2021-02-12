<template>
  <ti-sheet>
    <div class="w-11/12 mx-auto py-4">
      <the-page-title>Create new word list</the-page-title>
      <template v-if="!isWordListCreated">
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="wordListName"
            counter="50"
            filled
            label="Word list name"
            :rules="wordListNameRules"
          ></v-text-field>
          <v-alert v-if="!isWordListNameAvailable" color="pink" dark type="error">The word list name {{ wordListName }} is already exist.</v-alert>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Word Length</th>
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
                    <v-text-field
                      v-model="word"
                      class="mt-4"
                      counter="155"
                      dense
                      label="Input word here"
                      outlined
                      :rules="wordRules"
                    ></v-text-field>
                  </td>
                  <td>
                    {{ word.length }}
                  </td>
                  <td>
                    <v-btn @click="addWord()" outlined>Add</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="my-3">
            <v-alert v-if="isCreateButtonClicked && isWordListEmpty" color="pink" dark type="error">You should have a word at least.</v-alert>
            <v-btn @click="handleClickCreateButton()">Create</v-btn>
          </div>
        </v-form>
      </template>
      <template v-else>
        <v-alert color="success" dark type="success">The word list "{{ wordListName }}" has been created sucessfully.</v-alert>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>No.</th>
                <th>Word</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(word, index) in wordList" :key="index">
                <td>{{ index }}</td>
                <td>{{ word }}</td>
                <td>{{ word.length }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
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
    wordListNameRules: [
      v => !!v || "Word list name is required.",
      v => v.length <= 51 || "Word list name must be less than 51 characters",
    ],
    word: "",
    wordRules: [
      v => !!v || "Word is required.",
      v => v.length <= 155 || "Word must be less than 156 characters"
    ],
    isCreateButtonClicked: false,
    isWordListCreated: false,
  }),
  computed: {
    ...mapGetters(['wordLists']),

    isWordListEmpty(){
      return this.wordList.length === 0
    },
    isWordListNameEmpty(){
      return this.wordListName.trim() === ""
    },
    isWordListNameAvailable(){
      return this.wordLists.map(wordList => wordList.name).includes(this.wordListName)
        ? false : true
    }
  },
  methods: {
    ...mapActions(['addWordList']),

    addWord(){
      if(this.word.trim() !== ""){
        this.wordList.push(this.word)
        this.word = ""
      }
      this.$refs.form.resetValidation()
    },
    deleteWord(index){
      this.wordList.splice(index, 1)
      this.isCreateButtonClicked = false
    },
    handleClickCreateButton(){
      this.isCreateButtonClicked = true
      this.$refs.form.validate()

      if(this.isWordListNameAvailable && !this.isWordListNameEmpty && !this.isWordListEmpty){
        this.addWordList({
          name: this.wordListName,
          words: this.wordList
        })

        this.isWordListCreated = true
        localStorage.setItem("wordLists", JSON.stringify(this.wordLists))
      }
    }
  }
}
</script>