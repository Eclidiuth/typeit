<template>
  <the-content id="rankings">
    <div class="container-90">
      <the-page-title>Rankings</the-page-title>
      <div class="mb-3" v-for="(record, index) in records" :key="index">
        <h2>{{ record.name }}</h2>
        <table>
          <tr>
            <td class="timeRecord-no">No.</td>
            <td class="timeRecord-time">Time</td>
            <td class="timeRecord-date">Date</td>
          </tr>
          <tr v-for="(timeRecord, index) in record.timeRecords" :key="index">
            <td class="timeRecord-no">{{ index + 1}}</td>
            <td class="timeRecord-time">{{ timeRecord.time }} seconds</td>
            <td class="timeRecord-date">{{ timeRecord.date }}</td>
          </tr>
        </table>
      </div>
    </div>
  </the-content>
</template>

<style lang="scss" scoped>
@import '@/scss/utilities.scss';
</style>
<style lang="scss" scoped>
#rankings {
  padding: 48px 0;

  h2 {
    font-size: $fsize-body-1;
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
          flex: 0 1 48px;
          text-align: center;
        }

        &.timeRecord-time {
          flex: 1 1 auto;
        }

        &.timeRecord-date {
          flex: 0 1 20%;
        }
      }
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import ThePageTitle from '../components/ThePageTitle.vue'
import TheContent from '../components/TheContent.vue'

export default {
  components: {
    TheContent,
    ThePageTitle
  },
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