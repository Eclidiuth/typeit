<template>
  <v-app id="app">
    <v-main>
      <the-nav />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import "tailwindcss/tailwind.css"
import TheNav from '@/components/molecules/TheNav.vue'
import '@/scss/style.scss'
export default {
  components: {
    TheNav
  },
  mounted(){
    if(localStorage.getItem('wordLists')){
      this.$store.dispatch('updateWordLists', JSON.parse(localStorage.getItem('wordLists')))
    }
  }
}
</script>