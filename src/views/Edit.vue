<template>
  <the-content id="edit">
    <div class="container-90">
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
  </the-content>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
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
import TheContent from '../components/TheContent.vue'
import ThePageTitle from '@/components/ThePageTitle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: {
    TheContent,
    ThePageTitle
  },
  computed: {
    ...mapGetters('play', ['wordLists'])
  }
}
</script>