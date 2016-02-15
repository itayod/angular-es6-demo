var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './public/entry.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  plugins: [
    //create the html file and inject the bundle js file
    new HtmlWebpackPlugin({
      title: 'Angular with Webpack and Redux',
      template: './public/index.html',
      inject: 'body'
    }),
    //define a global dev environment variable
    new webpack.DefinePlugin({
      '__DEV__': false,
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    //buble loader for es6 support
    loaders: [
      {
        test: /\.js$/, loader: "babel", exclude: /node_modules/,
        query:
        {
          presets:['es2015','react','stage-1']
        }
      },

      {test: /\.html$/, exclude: /node_modules/, loader: 'html'},

      {test: /\.json$/, exclude: /node_modules/, loader: 'json'},

      //use less loader for every css and less file
      {test: /\.(less|css)$/, exclude: /node_modules/, loader: "style!css!less"},

      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },

      //if the woff file is higher then 10kb decode it with uri
      { test: /\.woff(2)?$/, loader: "url?limit=10000&minetype=application/font-woff"}
    ]
  },
  devtool: 'eval'
};
