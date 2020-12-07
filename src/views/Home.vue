<template>
  <div>
    <div id="play" class="container my-5">
      <div class="header">
        <the-word-display word="webpack" />
        <the-word-input-field />
      </div>
      <div class="main pb-3">
        <div class="container-90">
          <the-word-list-group :words="['webpack.config.js', 'postcss.config.js']" class="mt-3" />
          <the-ranking-list-group class="mt-3 mb-3" /> 
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
  min-width: 640px;
}
</style>

<script>
import TheWordDisplay       from '@/components/TheWordDisplay.vue'
import TheWordInputField    from '@/components/TheWordInputField.vue'
import TheWordListGroup     from '@/components/TheWordListGroup.vue'
import TheRankingListGroup  from '@/components/TheRankingListGroup.vue'

export default {
  name: 'Home',
  components: {
    TheWordDisplay,
    TheWordInputField,
    TheWordListGroup,
    TheRankingListGroup
  },
}
</script>