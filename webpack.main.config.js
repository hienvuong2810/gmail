const nodeExternals = require('webpack-node-externals');
const {BytenodeWebpackPlugin} =  require('@herberttn/bytenode-webpack-plugin')
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: ['./src/main.js', './src/workers.js'],
  externals:["puppeteer", "workers-byte.jsc", "worker_threads"],
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new BytenodeWebpackPlugin({ compileForElectron: true }),
  ],
};
//"puppeteer", "puppeteer-extra"