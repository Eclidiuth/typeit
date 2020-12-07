<template>
  <div>
    <h3>Words | JavaScript</h3>
    <ul>
      <the-word-list-item class="mr-1">webpack.config.js</the-word-list-item>
      <the-word-list-item class="mr-1">postcss.config.js</the-word-list-item>
      <the-word-list-item class="mr-1">vue.config.js</the-word-list-item>
      <the-word-list-item class="mr-1">jsconfig.js</the-word-list-item>
      <the-word-list-item class="mr-1">babel.config.js</the-word-list-item>
      <the-word-list-item class="mr-1">.babelrc</the-word-list-item>
      <the-word-list-item class="mr-1">.eslintrc</the-word-list-item>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>

<script>
import TheWordListItem from '@/components/TheWordListItem.vue'

export default {
  name: 'TheWordListGroup',
  components: {
    TheWordListItem
  }
}
</script>