// webpack.config.js
module.exports = {
    // deine anderen Konfigurationen...
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/")
      }
    }
  };
  