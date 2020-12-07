<template>
  <div>
    <h3>Words | JavaScript</h3>
    <ul>
      <the-word-list-item v-for="word in words" :key="word" class="mr-1">
        {{ word }}
      </the-word-list-item>
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
  },
  data(){
    return ({
      words: [
        'webpack.config.js',
        'postcss.config.js',
        'vue.config.js',
        'jsconfig.js',
        'babel.config.js',
        '.babelrc',
        '.eslintrc'
      ]
    })
  }
}
</script>