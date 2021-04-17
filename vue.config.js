//配置跨域请求
module.exports = {
    devServer:{
        open:false,
        port:8080,
        hotOnly:false,
        proxy:{
            '/api':{
                target: "http://127.0.0.1:8088/api",
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
