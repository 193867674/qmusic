const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
const songList = 'https://api.bzqll.com/music/tencent/songListCategory?key=579621905';


module.exports =  {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target:"https://c.y.qq.com",
                    pathRewrite: {"^/api":""}
                }
            }
        }
    }
  }