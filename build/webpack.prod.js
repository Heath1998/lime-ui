const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
  /* 
  source-map是一种映射，当打包后运行在浏览器上出错
  只会定位在打包后的位置，若用source-map在开发时出错
  就会显示打包前，开发的文件位置
  */
  devtool: 'source-map',
  mode: "production",
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'lime-ui.min.js',
    library: 'lime-ui',      //配置导出库的名称
    libraryTarget: 'umd',    //配置以何种方式导出库，，commonjs、commonjs2、amd，可以在浏览器、node中通用。保证所有环境都可以用。
    umdNamedDefine: true   //设置amd前置名称使用library设置的变量
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
});
