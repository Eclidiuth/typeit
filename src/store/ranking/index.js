export default {
  namespaced: true,

  state: () => ({
    records: [
      {
        name: 'test2',
        timeRecords: [
          {
            time: 10,
            date: '2020/12/11 00:00:00'
          },
          {
            time: 15,
            date: '2020/12/11 00:00:30'
          },
          {
            time: 25,
            date: '2020/12/11 00:01:00'
          },
          {
            time: 20,
            date: '2020/12/11 00:01:00'
          },
        ]
      }
    ]
  }),
  getters: {
    records: state => state.records,

    findRecordByName: state => name => {
      const result = state.records.filter(record => record.name === name)
      return result ? result[0] : null
    },
  },
  mutations: {
    setRecords: (state, newRecords) => state.records = newRecords,
    setTimeRecord: (state, { recordName, newTimeRecords }) => {
      console.log(recordName, newTimeRecords)
      const index = state.records.findIndex(record => record.name === recordName)
      state.records[index]
        ? state.records[index].newTimeRecords = newTimeRecords
        : new Error(`state.records[index] not found.`)
    }
  },
  actions: {
    updateRecords: ({ commit }, newRecords) => commit('setRecords', newRecords),
    updateTimeRecord: ({ commit }, payload) => commit('setTimeRecord', payload)
  }
}