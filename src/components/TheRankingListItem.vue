<template>
  <li>
    <span class="rankingList-recordNumber">
      {{ number }}
    </span>
    <span class="rankingList-recordTime">
      {{ time }} seconds
    </span>
    <span class="rankingList-recordDate">
      {{ date }}
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
  name: 'TheRankingListItem',
  props: {
    number: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
  }
}
</script>