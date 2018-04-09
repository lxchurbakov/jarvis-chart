module.exports = (env) => {
  return {
    context: __dirname + "/src",
    entry: "./index.js",

    mode: 'development',

    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },

    module: {
      rules: [
        { test: /\.jsx?$/, loader: 'babel-loader' },
        { test: /\.html$/, loader: 'file-loader?name=[name].html' }
      ]
    }
  };
};
