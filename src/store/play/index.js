export default {
  namespaced: true,

  state: () => ({
    gameState: 'standby',
    gameStartedAt: null,
    gameClearedAt: null,

    inputFieldValue: '',

    wordListName: 'JavaScript config files',
    wordListIndex: 0,
    wordLists: [
      {
        name: 'テスト用データ1',
        words: ['a', 'b', 'c']
      },
      {
        name: 'テスト用データ2',
        words: ['ab', 'cd', 'ef']
      },
      {
        name: 'JavaScript config files',
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
    gameState: state => state.gameState,
    gameStartedAt: state => state.gameStartedAt,
    gameClearedAt: state => state.gameClearedAt,
    inputFieldValue: state => state.inputFieldValue,

    wordLists: state => state.wordLists,
    wordListName: state => state.wordListName,
    wordListIndex: state => state.wordListIndex,
    wordList: (state, getters) => {
      const wordList = getters.wordLists.filter(list => list.name === getters.wordListName)
      return wordList ? wordList[0] : null
    },
    wordListWords: (state, getters) => getters.wordList.words,
    word: (state, getters) => getters.wordListWords[getters.wordListIndex],

    findWordListByName: (state, getters) => wordListName => {
      const wordList = getters.wordLists.filter(list => list.name === wordListName)
      return wordList ? wordList[0] : null
    }
  },
  mutations: {
    setGameState    : (state, gameState) => state.gameState = gameState,
    setGameStartedAt: (state, time)      => state.gameStartedAt = time,
    setGameClearedAt: (state, time)      => state.gameClearedAt = time,
    
    setInputFieldValue: (state, value) => state.inputFieldValue = value,

    setWordListIndex: (state, index)     => state.wordListIndex = index,
    setWordLists    : (state, wordLists) => state.wordLists = wordLists,

    setWordListWords: (state, payload) => state.wordLists[payload.index].words = payload.wordListWords
  },
  actions: {
    updateGameState    : ({ commit }, gameState) => commit('setGameState', gameState),
    updateGameStartedAt: ({ commit}, time)       => commit('setGameStartedAt', time),
    updateGameClearedAt: ({ commit}, time)       => commit('setGameClearedAt', time),

    updateInputFieldValue: ({ commit }, value) => commit('setInputFieldValue', value),

    updateWordListIndex: ({ commit }, index)         => commit('setWordListIndex', index),
    updateWordLists    :     ({ commit }, wordLists) => commit('setWordLists', wordLists),
    resetWordListIndex : ({ commit })                => commit('setWordListIndex', 0),

    updateWordListWords: ({ commit, getters}, payload) => {
      const wordList = getters.findWordListByName(payload.wordListName)
      const wordListIndex = getters.wordLists.findIndex(wordList => wordList.name === payload.wordListName)
      wordList
      ? commit('setWordListWords', { index: wordListIndex, wordListWords: payload.wordListWords })
      : new Error('Word list not found')
    }
  }
}