module.exports={
  //关闭eslint语法检查
  lintOnSave:false,

  productionSourceMap:false,
  //publicPath:process.env.NODE_ENV==='production'?'./':'/',
  //代理解决跨域
  devServer:{
    proxy:{
      '/api':{
        //调试日记  2022-02-19
        //  1.target一定要写完整，http://[ip]:[port]，否则会报无法转发的错。
        target:'http://127.0.0.1:3000',
        //pathRewrite:{'^/api':''},
      },
    },
  },
}
