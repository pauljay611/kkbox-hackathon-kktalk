const webpack = require('webpack')

module.exports = {
  baseUrl: '/',

  // 将构建好的文件输出到哪里
  outputDir: 'server/public',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
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
