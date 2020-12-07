export default {
  namespaced: true,

  state: () => ({
    currentWordListName: 'js',
    currentWordIndex: 0,
    wordLists: [
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

  },
  mutations: {},
  actions: {}
}