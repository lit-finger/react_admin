const  { createProxyMiddleware } = require("http-proxy-middleware");
module.exports=function(app){
    app.use(createProxyMiddleware(`/api`,{
        target:"http://192.168.50.89:1234",
        changeOrigin:true,
        pathRewrite: {
            "^/api": ""
          }
    }))
}