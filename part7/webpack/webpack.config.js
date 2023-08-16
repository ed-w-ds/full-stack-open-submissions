import PromisePolyfill from 'promise-polyfill'
const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv.mode', argv.mode)

    // polyfill for Internet Explorer since it doesn't support Promises
    // suppyou ort other browser's older versions as well 
    if (!window.Promise) {
        window.Promise = PromisePolyfill
    }

    // development and production configuration
    const backend_url = argv.mode === 'production'
        // remember to go to the build directory before running npx static-server
        ? 'https://notes2023.fly.dev/api/notes'
        : 'http://localhost:3001/notes'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        // shows the original code in the browser and error messages, not the transpiled code
        devtool: 'source-map',
        // webpack dev server
        // reloads the page when changes are made and allows us to use localhost
        // when dev-server is used, the code is not bundled in main.js but is
        // stored in memory and served from there
        devServer: {
            static: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        
        module: {
            rules: [
                {
                    // to transpile JSX and ES6
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [ '@babel/preset-react', {"runtime": "automatic"}]
                        ]
                    },
                },
                {
                    // to load css
                    "test": /\.css$/,
                    "use": ['style-loader', 'css-loader'],
                }
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
