var webpack= require('webpack')
var path = require('path')

module.exports = {
    entry: {
        firstComp: './src/js/firstComp/index.js',
        vendor: ['react']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,
            'public/js/components')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules:false}]
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
              // This prevents stylesheet resources with the .css or .scss extension
              // from being moved from their original chunk to the vendor chunk
              if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                return false;
              }
              return module.context && module.context.includes('node_modules');
            }
          })],
}