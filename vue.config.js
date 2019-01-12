const webpack = require('webpack')

module.exports = {
  baseUrl: '/',
  outputDir: 'server/public',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/token': {
        target: 'https://account.kkbox.com/oauth2/token',
        changeOrigin: true,
        pathRewrite: {
          '^/token': ''
        }
      }
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  }
}
