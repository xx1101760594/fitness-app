// 导入 内置莫奎 path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist 
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    // 入口 引出的js文件
    entry: {
        // 公共的css
        commonCss: './src/js/commonCss.js',
        // 公共的js
        dom: './src/js/common/dom.js',
        http: './src/js/common/http.js',
        utils: './src/js/common/utils.js',
        // 第三方插件js
        captcha: './src/lib/captcha-mini.js',
        swiper: './src/lib/swiper/swiper-bundle.js',
        // 自己的js
        home: './src/js/home.js',
        login: './src/js/login.js',
        pref: './src/js/pref.js',
        advertising: './src/js/advertising.js',
        about: './src/js/about.js',
        exercise: './src/js/exercise.js'
    },

    // 出口  生成的js文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    //编译器 loader
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.jpg|png|gif$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:8].[ext]',
                    limit: 20 * 1024,
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts' //输出的目录
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/exercise.html', //以哪个html文件作为打包的模板
            filename: 'exercise.html',
            chunks: ['exercise', 'commonCss', 'dom', 'utils'] //该html文件使用了哪些入口js文件
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/about.html', //以哪个html文件作为打包的模板
            filename: 'about.html',
            chunks: ['about', 'commonCss', 'dom', 'utils'] //该html文件使用了哪些入口js文件
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/home.html', //以哪个html文件作为打包的模板
            filename: 'home.html',
            chunks: ['home', 'commonCss', 'dom', 'http', 'swiper', 'utils'] //该html文件使用了哪些入口js文件
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/login.html', //以哪个html文件作为打包的模板
            filename: 'login.html',
            chunks: ['login', 'commonCss', 'dom', 'http', 'utils']
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/pref.html', //以哪个html文件作为打包的模板
            filename: 'pref.html',
            chunks: ['pref', 'commonCss', 'dom', 'http', 'captcha', 'utils']
        }),
        new HtmlWebpackPlugin({ //配置html打包的插件
            template: './src/page/advertising.html', //以哪个html文件作为打包的模板
            filename: 'advertising.html',
            chunks: ['advertising', 'commonCss', 'dom']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    // 环境

    mode: process.env.NODE_ENV,
    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 10086, // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'advertising.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器

}