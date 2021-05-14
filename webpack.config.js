// 导入 内置莫奎 path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // 入口 引出的js文件
    entry: './src/js/home.js',

    // 出口  生成的js文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: './'
    },
    //编译器 loader
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.jpg|png|gif$/, loader: 'url-loader', options: { name: '[hash:8].[ext]', limit: 20 * 1024, esModule: false, outputPath: 'img' } },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/page/home.html'         //以哪个html文件作为打包的模板
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 环境

    mode: process.env.NODE_ENV,
    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器

}