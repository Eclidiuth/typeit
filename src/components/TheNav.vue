<template>
  <nav class="d-flex align-items-center">
    <div class="container d-flex align-items-center justify-content-space-between">
      <h1>
        <router-link to="/">TypeIt</router-link>
      </h1>
      <ul>
        <li :class="{active: this.$route.path === '/'}">
          <router-link to="/">Play</router-link>
        </li>
        <li :class="{active: this.$route.path === '/rankings'}">
          <router-link to="/rankings">Rankings</router-link>
        </li>
        <li>
          <router-link to="/edit">Edit</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';

nav {
  background-color: $text-black-primary;
  height: 60px;
  min-width: 640px;

  h1 {
    font-size: $fsize-h6;
    font-weight: $fweight-h1;
    margin: 0;

    a {
      color: $text-white-primary;
      text-decoration: none;
    }
  }
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: block;

      &.active {
        a {
          color: $text-white-primary;
        }
      }

      a {
        color: $text-white-secondary;
        display: block;
        font-size: $fsize-body-2;
        text-decoration: none;
        padding: 16px;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'TheNav'
}
</script>