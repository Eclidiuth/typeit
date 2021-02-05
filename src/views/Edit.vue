<template>
  <ti-sheet id="edit">
    <div class="w-11/12 mx-auto">
      <the-page-title>Edit</the-page-title>
      <div class="wordList">
        <div class="wordList-item">
          <div class="wordList-name">
            <span>Name</span>
          </div>
          <div class="wordList-length">
            <span>List length</span>
          </div>
          <div class="wordList-edit">
            <span>Action</span>
          </div>
        </div>
        <div v-for="(wordList, index) in wordLists" :key="index" class="wordList-item">
          <div class="wordList-name">
            <span>{{ wordList.name }}</span>
          </div>
          <div class="wordList-length">
            <span>{{ wordList.words.length }}</span>
          </div>
          <div class="wordList-editLink">
            <router-link :to="`/edit/${wordList.name}`">Edit</router-link>
          </div>
        </div>
      </div>
    </div>
  </ti-sheet>
</template>


<style lang="scss" scoped>
#edit {
  padding: 48px 0;

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
import ThePageTitle from '@/components/ThePageTitle.vue'
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