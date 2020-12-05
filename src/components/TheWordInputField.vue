<template>
  <div>
    <input type="text" value="webpa">
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
div {
  input[type="text"] {
    background-color: $black;
    border: none;
    box-sizing: border-box;
    color: $text-white-primary;
    display: block;
    font-size: $fsize-h5;
    text-align: center;
    padding: 40px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>

<script>
export default {
  name: 'TheWordInputField'
}
</script>