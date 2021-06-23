// let glob = require('glob');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path'); //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
    publicPath: '/',
    outputDir: process.env.VUE_FOLDER,
    devServer: {
        // open: true, //  npm run serve 自动打开浏览器
        host: 'www.gkvue.com',
        port: 8038,
        proxy:  {            
            '/api':  {
                // target: 'http://192.168.1.138:8000',
                target: 'http://api.donglu.xyz',
                changeOrigin:  true,
            },
                 
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
        config.resolve.alias.set("static", resolve("public/static"));
    },
    productionSourceMap: true,
}