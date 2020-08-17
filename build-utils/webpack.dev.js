// const { DefinePlugin } = require('webpack')
const Dotenv = require('dotenv-webpack')
module.exports = {
  mode: 'development', 
  devtool: 'eval-source-map',
  plugins: [
    // new DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('development')
    //   }
    // })
    new Dotenv({
      path: './.env.development'
    })
  ]
}