<template>
  <div>
    <v-expansion-panels accordion flat multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="pt-6 pb-4">Rankings</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-if="!records || records.length === 0">
            <p class="p-4">None</p>
          </template>
          <template v-else>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">No.</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in records" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ record.time }} seconds</td>
                    <td>{{ record.date }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<style lang="scss" scoped>
div {
  h3 {
    color: $text-black-primary;
    font-size: $fsize-h6;
    font-weight: $fweight-h3;
  }
}
</style>

<script>

export default {
  name: 'TheRankingListGroup',
  props: {
    records: {
      type: Array || null
    }
  },
  data: () => ({
    panel: [0]
  })
}
</script>