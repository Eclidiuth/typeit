module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import '@/scss/_variables.scss';`
      }
    }
  },

  outputDir: 'docs/',

  publicPath: process.env.NODE_ENV === 'production'
  ? '/typeit/'
  : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
