// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

const logo = 'https://common-1305245006.cos.ap-shanghai.myqcloud.com/orange.png'

export default defineConfig({
  title: 'D-pro',
  logo,
  favicons: [logo],
  outputPath: 'docs-dist',
  hash: true,
  devtool: 'eval',
  themeConfig: {
    socialLinks: {
      github: 'https://github.com/DaphnisLi/D-pro.git'
    }
  }
})
