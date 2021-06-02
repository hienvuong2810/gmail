const rules = require('./webpack.rules');
const {BytenodeWebpackPlugin} =  require('@herberttn/bytenode-webpack-plugin')
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new BytenodeWebpackPlugin({ compileForElectron: true }),
  ],
};
