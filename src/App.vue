<template>
  <v-app id="app">
    <the-nav />
    <v-main>
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
  }
}
</script>