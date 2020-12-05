<template>
  <div id="app">
    <the-nav />
    <router-view />
  </div>
</template>

<script>
import TheNav from '@/components/TheNav.vue'
import '@/scss/style.scss'

export default {
  components: {
    TheNav
  }
}
</script>