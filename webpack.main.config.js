
const {BytenodeWebpackPlugin} =  require('@herberttn/bytenode-webpack-plugin')


module.exports = {
  // mode: 'production',
  // devtool: false,
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: ['./src/main.js', './src/workers.js'],
  // entry: ['./src/main.js'],
  externals:["puppeteer"],
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    // new WebpackObfuscator({
    //   rotateStringArray: true
    //   }, ['excluded_bundle_name.js']),
    //new BytenodeWebpackPlugin({ compileForElectron: true}),
  ],
};
//"puppeteer", "puppeteer-extra"