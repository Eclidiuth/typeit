<template>
  <nav class="flex items-center h-16">
    <div class="nav-container flex items-center justify-between w-9/12 mx-auto">
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
        <li :class="{active: this.$route.path.includes('/create')}">
          <router-link to="/create">Create</router-link>
        </li>
        <li :class="{active: this.$route.path.includes('/edit')}">
          <router-link to="/edit">Edit</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

nav {
  background-color: $text-black-primary;
  min-width: $content-min-width;

  .nav-container {
    max-width: $content-max-width;

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
}
</style>

<script>
export default {
  name: 'TheNav'
}
</script>