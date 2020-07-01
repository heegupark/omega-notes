const path = require('path');

const clientPath = path.join(__dirname, 'client/');
const publicPath = path.join(__dirname, 'public/');
const serverPath = path.join(__dirname, 'src/');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watchOptions: {
    ignored: serverPath
  },
  entry: clientPath,
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3002,
    proxy: {
      '/api': {
        target: "http://0.0.0.0:4001/",
        onError(err) {
          console.log('Suppressing WDS proxy upgrade error:', err)
        }
      }
    },
    stats: 'minimal',
    watchContentBase: true
  }
};
