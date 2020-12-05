<template>
  <div>
    <div id="play" class="container mt-5">
      <div class="header">
        <the-word-display :word="currentWord" />
        <the-word-input-field />
      </div>
      <div class="main">
        <div class="container-90">
          <the-word-list-group class="m-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
#play {
  background-color: $white;
}
</style>

<script>
import TheWordDisplay from '@/components/TheWordDisplay.vue'
import TheWordInputField from '@/components/TheWordInputField.vue'
import TheWordListGroup from '@/components/TheWordListGroup.vue'

export default {
  name: 'Home',
  components: {
    TheWordDisplay,
    TheWordInputField,
    TheWordListGroup
  },
  data(){
    return ({
      wordList: [
        'webpack', 'babel'
      ],
      wordInputFieldValue: ''
    })
  },
  computed: {
    currentWord(){
      return this.wordList[0]
    }
  }
}
</script>