const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  publicPath: '/',

  assetsDir: 'static',

  lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },

  productionSourceMap: true,

  devServer: {
    before(app) {
      app.get('/userinfo', async (req, res) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        res.json({
          errno: 0,
          errmsg: '获取权限成功',
          result: [
            {
              name: 'message',
              title: '国服上单',
              icon: 'iconfont icon-duanxinguanli',
              path: '/home/message',
              component: 'message',
              children: [
                {
                  name: 'ok',
                  path: '/home/addMessage',
                  component: 'addMessage'
                }
              ]
            }
          ]
        })
      })
    }
  }
}
