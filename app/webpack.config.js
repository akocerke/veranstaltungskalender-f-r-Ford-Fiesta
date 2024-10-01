// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // oder der Pfad zu deinem Haupt-JS-Datei
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Verarbeitet .js und .jsx Dateien
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel Presets für React und ES6
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
