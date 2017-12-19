var path = require('path')
var webpack = require('webpack')
var Copy = require('copy-webpack-plugin')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const fs = require('fs-extra')

var bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})

//  文件拷贝插件,将图片和字体拷贝到dist目录
var copyPlugin = new Copy([
  { from: './src/assets/images', to: './images' },
  { from: './src/assets/font', to: './font' }
])

function getEntryFileContent (entryPath, vueFilePath) {
  let relativePath = path.relative(path.join(entryPath, '../'), vueFilePath)
  // relativePath = relativePath.replace(/\/ig/, '/')
  relativePath = relativePath.replace(/\\/g, '\\\\')
  return `
import route from 'router/page'
import mixins from 'mixins'

const App = require('${relativePath}')

Vue.mixin(mixins)

App.el = '#root'
new Vue(App)
`
}

const entry = {}

function walk (dir) {
  dir = dir || '.'
  const directory = path.join(__dirname, './src', dir)
  const entryDirectory = path.join(__dirname, './src/entry')
  fs.readdirSync(directory)
    .forEach(file => {
      const fullpath = path.join(directory, file)
      const stat = fs.statSync(fullpath)
      const extname = path.extname(fullpath)
      if (stat.isFile() && extname === '.vue') {
        const entryFile = path.join(entryDirectory, dir, path.basename(file, extname) + '.js')
        fs.outputFileSync(entryFile, getEntryFileContent(entryFile, fullpath))
        // let name = path.join('build', dir, path.basename(file, extname))
        const name = path.join(dir, path.basename(file, extname))
        entry[name] = entryFile + '?entry=true'
        // && file !== 'components'
      } else if (stat.isDirectory()) {
        const subdir = path.join(dir, file)
        walk(subdir)
      }
    })
}

walk('views')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

// 生成webpack配置
function getBaseConfig () {
  const config = {
    entry: entry,
    output: {
      path: path.resolve(__dirname, './dist')
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'src': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets/'),
        'components': path.resolve(__dirname, './src/components'),
        'constants': path.resolve(__dirname, './src/constants/'),
        'api': path.resolve(__dirname, './src/api/'),
        'router': path.resolve(__dirname, './src/router/'),
        'store': path.resolve(__dirname, './src/store/'),
        'views': path.resolve(__dirname, './src/views/'),
        'mixins': path.resolve(__dirname, './src/mixins'),
        'config': path.resolve(__dirname, './config'),
        'services': path.resolve(__dirname, './src/services'),
        'filters': path.resolve(__dirname, './src/filters'),
        'utils': path.resolve(__dirname, './src/utils/'),
        'packages': path.resolve(__dirname, './packages/')
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loaders: []
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }, {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: [resolve('src/plugins/i18n/vue-i18n.min.js')],
        options: {
          formatter: eslintFriendlyFormatter
        }
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=50000&name=[name].[ext]'
      }]
    },
    plugins: [bannerPlugin, copyPlugin]
  }
  // 生产环境压缩jsbundle
  if (process.env.NODE_ENV === 'prod') {
    const optimizePlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      // 保留banner
      comments: /{ "framework": "Vue" }/,
      sourceMap: true
    })
    config.plugins.push(optimizePlugin)
  }

  return config
}

//* .web.js
const webConfig = getBaseConfig()
webConfig.entry = {
  entry: path.resolve('./src/entry.js')
}
webConfig.output = {
  path: path.resolve(__dirname, './dist/web'),
  filename: '[name].js',
  publicPath: '/dist/web/'
}
webConfig.module.rules[1].loaders.push('vue-loader')

// *.weex.js
const nativeConfig = getBaseConfig()
nativeConfig.output = {
  path: path.resolve(__dirname, './dist/weex'),
  filename: '[name].js'
}
nativeConfig.module.rules[1].loaders.push('weex-loader')

module.exports = [webConfig, nativeConfig]
