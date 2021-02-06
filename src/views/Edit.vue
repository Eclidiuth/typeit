<template>
  <ti-sheet id="edit">
    <div class="w-11/12 mx-auto py-4">
      <the-page-title>Edit</the-page-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">No.</th>
              <th class="text-left">Time</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(wordList, index) in wordLists" :key="index">
              <td>{{ wordList.name }}</td>
              <td>{{ wordList.words.length }}</td>
              <td>
                <router-link :to="`/edit/${wordList.name}`">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </ti-sheet>
</template>


<style lang="scss" scoped>
#edit {
  .wordList {
    display: flex;
    flex-wrap: wrap;

    .wordList-item {
      display: flex;
      align-items: stretch;
      width: 100%;

      &:nth-child(odd) {
        background-color: $white-secondary;
      }

      .wordList-name span,
      .wordList-length span,
      .wordList-edit span {
        display: block;
        padding: 16px;
      }

      .wordList-name {
        width: 70%;
      }

      .wordList-length {
        width: 20%;
      }


      .wordList-editLink {
        display: flex;
        width: 10%;
        
        a {
          color: $text-black-primary;
          display: block;
          text-decoration: none;
          padding: 16px;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

<script>
import TiSheet from '../components/atoms/TiSheet.vue'
import ThePageTitle from '@/components/atoms/ThePageTitle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: {
    'ti-sheet': TiSheet,
    ThePageTitle
  },
  computed: {
    ...mapGetters('play', ['wordLists'])
  },
  mounted(){
    if(localStorage.getItem('play/wordLists')){
      this.$store.dispatch('play/updateWordLists', JSON.parse(localStorage.getItem('play/wordLists')))
    }
    this.words = this.originalWords.slice()
  }
}
</script>