const path = require('path');

module.exports = (env) => {
  return {
    context: __dirname + "/src",
    entry: "./index.js",

    mode: 'development',

    devServer: {
      disableHostCheck: true,
    },

    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },

    module: {
      rules: [
        { test: /\.jsx?$/, loader: 'babel-loader' },
        { test: /\.html$/, loader: 'file-loader?name=[name].html' }
      ]
    },

    resolve: {
      alias: {
        lib: path.resolve(__dirname, './src/jarvis-chart/lib')
      }
    }
  };
};
