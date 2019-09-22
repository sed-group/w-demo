module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  }
  }