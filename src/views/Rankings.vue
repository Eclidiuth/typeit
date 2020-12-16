<template>
  <div>
    <div id="rankings" class="container my-5">
      <div class="container-90">
        <h1>Rankings</h1>
        <div class="mb-3" v-for="(record, index) in records" :key="index">
          <h2>{{ record.name }}</h2>
          <table>
            <tr>
              <td class="timeRecord-no">No.</td>
              <td class="timeRecord-time">Time</td>
              <td class="timeRecord-date">Date</td>
            </tr>
            <tr v-for="(timeRecord, index) in record.timeRecords" :key="index">
              <td class="timeRecord-no">{{ index }}</td>
              <td class="timeRecord-time">{{ timeRecord.time }} seconds</td>
              <td class="timeRecord-date">{{ timeRecord.date }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
#rankings {
  background-color: $white;
  padding: 48px 0;
  min-width: 640px;

  h1 {
    font-weight: normal;
    margin: 0;
    margin-bottom: 48px;
  }

  h2 {
    font-size: $fsize-body-2;
    font-weight: normal;
  }

  table {
    border-collapse: collapse;
    width: 100%;

    tr {
      display: flex;

      &:nth-child(odd) {
        background: $white-secondary;
      }

      td {
        padding: 16px;

        &.timeRecord-no {
          flex: 0 1 56px;
        }

        &.timeRecord-time {
          flex: 1 1 auto;
        }

        &.timeRecord-date {
          flex: 0 1 15%;
        }
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Rankings',
  computed: {
    ...mapGetters('ranking', ['records'])
  },
  mounted(){
    const records = localStorage.getItem('ranking/records')
    if(records){
      this.$store.dispatch('ranking/updateRecords', JSON.parse(records))
    }
  }
}
</script>