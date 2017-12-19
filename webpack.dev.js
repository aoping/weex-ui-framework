const configs = require('./webpack.config.js')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const ip = require('ip').address()
const pathTo = require('path')
const chalk = require('chalk')
var merge = require('webpack-merge')

fs.writeFileSync(path.resolve('assets/config.js'), `const CURRENT_IP = \'${ip}\'`)
fs.writeFileSync(path.resolve('config.js'), `export default \'${ip}\'`)

let config = Array.isArray(configs) ? configs[0] : configs
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['webpack-dev-server/client?http://localhost:8081/'].concat(config.entry[name])
})
console.log('server is running! Please open ' + chalk.green('http://' + ip + ':8081/web/index.html'))
module.exports = merge(config, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: pathTo.join(__dirname, ''),
    compress: true,
    hot: true,
    inline: true,
    port: 8081,
    host: '0.0.0.0',
    public: ip + ':8081'
    // publicPath: '/dist/web/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'development'
    })
  ]
})
