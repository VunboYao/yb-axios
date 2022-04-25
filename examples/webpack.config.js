const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  /*
  * 在 examples 目录下建多个子目录
  * 会将不同的章节 demo 放到不同的子目录中
  * 每个子目录下会创建一个 app.ts
  * app.ts 作为 webpack 构建的入口文件
  * entries 收集了多个目录入口文件，并且每个入口还引用了一个用于热更新的文件
  * entries 是一个对象，key为目录名
  * */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir) // 获取文件当前路径
    const entry = path.join(fullDir, 'app.ts') // 拼接app.ts的路径
    const bool = fs.statSync(fullDir).isDirectory() && fs.existsSync(entry) // 判断是文件目录且app.ts存在
    if (bool) {
      // 热更新配置
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, '__build__'),
    filename: '[name].js', // 以入口名称命名 simple error等
    publicPath: '/__build__/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre', // 前置执行
        use: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
