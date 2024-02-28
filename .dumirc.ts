// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

  const logo = 'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png'
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
