<template>
  <h1>
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: normal;
  margin: 0;
  margin-bottom: 48px;
}
</style>

<script>
export default {
  name: 'ThePageTitle'
}
</script>