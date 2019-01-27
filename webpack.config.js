//var ExtractTextPlugin = require('extract-text-webpack-plugin');

const Fiber = require('fibers');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    
    entry: {
        app: './scss/main.scss'
    },
    output: {
        filename: 'dist/main.bundle.css',
//        path: path.join(__dirname, 'dist')
    },
    
    
//    entry: ['./js/main.js', './scss/main.scss'],
//    output: {
//        filename: 'dist/bundle.js'
//    },
    module: {
//
        rules: [ 
//            {
//                test: /\.scss$/,
//                use: [
//                    { loader: "style-loader"}, 
//                    
//                    { 
//                        loader: "css-loader",
//                        options: {
//                            implementation: require("sass")
//                        } 
//                    },  //fim -- "css-loader"
//                    
//                    { 
//                        loader: "sass-loader",
//                        options: {
//                            includePaths: ["absolute/path/a", "absolute/path/b"]
//                        } 
//                    } //fim -- "sass-loader"
//                    
//                ]//fim -- use
//            },
            
            {
            test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
            
            /*
            your other rules for JavaScript transpiling go in here
            */
//            { // regular css files
//                test: /\.css$/,
//                loader: ExtractTextPlugin.extract({ loader: 'css-loader?importLoaders=1', }),
//            },
//            { // sass / scss loader for webpack
//                test: /\.(sass|scss)$/,
//                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
//            },
//            {
//                test: /\.(sass|scss)$/,
//                loaders: ['style-loader', 'css-loader', 'less-loader']
//            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "dist/bundle.css",
            allChunks: true
        })
//        new webpack.optimize.CommonsChunkPlugin({
//            names: ['vendor', 'manifest'],
//            filename: "'dist/.bundle.css'"
//        })
//        new ExtractTextPlugin({ // define where to save the file
//            filename: 'dist/[name].bundle.css',
//            allChunks: true,
//        })
    ],
};