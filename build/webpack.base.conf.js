var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
// const webpack = require('webpack')
// var autoprefixer = require('autoprefixer');
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    entry: {
        app: ["babel-polyfill", "./src/main.js"]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'vendor': resolve('src/vendor'),
            'components': resolve('src/components'),
            'routePage': resolve('src/routePage'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin('common.js'),
    //     new webpack.ProvidePlugin({
    //         jQuery: "jquery",
    //         $: "jquery"
    //     })
    // ]
    // postcss: [ autoprefixer({ browsers: ['last 2 versions'] })]
};
