<template>
  <div>
    <h3>Words | JavaScript</h3>
    <ul>
      <the-word-list-item v-for="word in words" :key="word" class="mr-1 mb-1">
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
  props: {
    words: {
      type: Array,
      required: true
    }
  }
}
</script>