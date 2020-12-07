<template>
  <li>
    <span class="rankingList-recordNumber">
      <slot name="recordNumber" />
    </span>
    <span class="rankingList-recordTime">
      <slot name="recordTime" />
    </span>
    <span class="rankingList-recordDate">
      <slot name="recordDate" />
    </span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;

  .rankingList-recordNumber,
  .rankingList-recordTime,
  .rankingList-recordDate {
    display: block;
    padding: 16px;
  }

  .rankingList-recordNumber {
    font-size: $fsize-body-1;
    flex: 1 1 5%;
    text-align: center;
  }
  .rankingList-recordTime {
    font-size: $fsize-body-1;
    flex: 1 1 50%;
  }
  .rankingList-recordDate {
    color: $text-black-secondary;
    font-size: $fsize-body-2;
    flex: 1 1 45%;
  }
}
</style>

<script>
export default {
  name: 'TheRankingListItem'
}
</script>