<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  background-color: $white-secondary;
  box-shadow: 0 0 4px rgba(0, 0, 0, .25);
  border: 0;
  border-radius: 4px;
  color: $text-black-primary;
  display: inline-block;
  font-size: 12px;
  transition: box-shadow .15s;
  padding: 8px 16px;

  &:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, .5);
  }
}
</style>

<script>
export default {
  name: 't-button'
}
</script>