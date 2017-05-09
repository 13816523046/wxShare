// 引入必要的模块
var express = require('express')
const proxy = require('http-proxy-middleware');//引入代理中间件
var webpack = require('webpack')
var config = require('./webpack.dev.config')

// 创建一个express实例
var app = express()

// 调用webpack并把配置传递过去
var compiler = webpack(config)

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)


// Add middleware for http proxying
const apiProxy = proxy('/static', {
    target: 'https://test-mhis-siapp.pingan.com.cn:57443', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/open' : '/open',     // rewrite path
    },
    router: {
        'dev.localhost:3000' : 'http://localhost:8000'
    }

});//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/static/*', apiProxy);//api子·目录下的都是用代理

// 监听 8888端口，开启服务器
app.listen(8888, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8888')
})
