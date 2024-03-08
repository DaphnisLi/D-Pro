---
nav:
  title: 前言
  path: /preface
  order: 1
title: 介绍
---

# D-Pro

D-Pro 基于 Ant Design 5, 提供一系列高效、可定制的组件, 致力于优雅地应对中台系统中频繁出现的典型场景, 全面提升研发效率！

优势
- 使用简单, 高效的开发效率
- 基于 Ant Design 5 实现, 可以根据 token 便捷的自定义主题
- 基于 css in js 方案, 无需引入 css 文件
- 全面拥抱 TypeScript, 拥有完美的类型提示
- 按需加载

## 兼容性
Antd5 的样式方案为 css in js, 在此基础上应用 :where css selector 降低样式权重为开发者提供更好的样式覆盖体验, 但由于其兼容性, 导致一些浏览器是不可用的, 即使按照官网所提供的[样式兼容](https://ant.design/docs/react/compatible-style-cn), 其实也只是兼容那些标签类的组件, 比如弹出层类的组件, 由于是脱离了 root 节点之外插入, 所以基本类似 message、Tour、Modal 这种组件的样式还是会出现异常
因此, 目前更推荐使用 __Chrome 及 Edge__, 并且应是较新版本
