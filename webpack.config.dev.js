import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';

// ENV variables
const dotEnvVars = dotenv.config();
const defines = {
    'process.env': {
        NODE_ENV: '"development"'
    },
    __DEV__: 'true',
    __NODE_ENV__: '"development"',
    __AUTH0_CLIENT_ID__: `'${dotEnvVars.AUTH0_CLIENT_ID}'`,
    __AUTH0_DOMAIN__: `'${dotEnvVars.AUTH0_DOMAIN}'`
};
// END ENV variables

export default {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    debug: true,
    devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: [
        // must be first entry to properly set public path
        './src/webpack-public-path',
        'webpack-hot-middleware/client?reload=true',
        './src/index'
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        // Note: Physical files are only output by the production build task `npm run build`.
        path: `${__dirname}/src`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin(defines),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            // Create HTML file that includes references to bundled CSS and JS.
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true,
            analytics: false
        }),
    ],
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]' },
            { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
            { test: /\.global\.css$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
            { test: /^((?!\.global).)*\.css$/,
                loaders: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' ] } // eslint-disable-line
        ]
    },
    postcss: () => [autoprefixer]
};
