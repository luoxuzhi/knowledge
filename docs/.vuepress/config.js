module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  base: '/knowledge/',
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}