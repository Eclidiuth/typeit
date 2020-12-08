export default {
  namespaced: true,

  state: () => ({
    isGameEnded: false,
    inputFieldValue: '',
    wordListName: 'test2',
    wordListIndex: 0,
    wordLists: [
      {
        name: 'test',
        words: ['a', 'b', 'c']
      },
      {
        name: 'test2',
        words: ['ab', 'cd', 'ef']
      },
      {
        name: 'js',
        words: [
          'webpack.config.js',
          'postcss.config.js',
          'vue.config.js',
          'jsconfig.js',
          'babel.config.js',
          '.babelrc',
          '.eslintrc'
        ]
      }
    ]
  }),
  getters: {
    inputFieldValue: state => state.inputFieldValue,

    wordLists: state => state.wordLists,
    wordListName: state => state.wordListName,
    wordListIndex: state => state.wordListIndex,
    wordList: (state, getters) => {
      const wordList = getters.wordLists.filter(list => list.name === getters.wordListName)
      return wordList ? wordList[0] : null
    },
    wordListWords: (state, getters) => getters.wordList.words,
    word: (state, getters) => getters.wordListWords[getters.wordListIndex]
  },
  mutations: {
    setInputFieldValue: (state, value) => state.inputFieldValue = value,
    setWordListIndex: (state, index) => state.wordListIndex = index,
  },
  actions: {
    updateInputFieldValue: ({ commit }, value) => commit('setInputFieldValue', value),
    updateWordListIndex: ({ commit }, index) => commit('setWordListIndex', index),
    resetWordListIndex: ({ commit }) => commit('setWordListIndex', 0)
  }
}