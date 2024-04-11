---
nav:
  title: 前言
  path: /preface
  order: 1
title: 介绍
---

## 主要技术栈
- React
- Antd5
- 样式: antd-style, [css or css in js ?](/preface#css-or-css-in-js-)
- Monorepo: pnpm(安装依赖、workspace、速度快、无幽灵依赖) + lerna(发布、lerna run)
- 构建 Rollup

## 我的思考
中后台主要面向企业内部人员, 通常 __页面重复率高、业务复杂度高、开发复杂度高__, 因此用户需要学习, 我们也可以对用户提一些要求, 基于这个前提可以做到 __开发体验和用户体验的双赢__, 所以我们一般都会关注以下几点:
- 样式: 注重 __标准化__, 减少书写样式, 或者尽量用现有方案代替样式, 如 Space、Row、Col
- 功能: __沉淀最佳实践, 高效、可复用__, 如表单的复用、常见业务组件(如表格页)的封装, 部分场景使用 __低代码__ (给产品/运营使用)提效
- 技术栈统一

#### Antd-Pro 的不足
在业界, Antd-Pro 通过 umi、antd 的强大能力可以从 0～1 快速生成一个新的项目, 但这就是中后台的全部了吗? 不, 这只是最简单的一步, 与此系统项目的各种基建配套(构建、发布、多环境开发等等)才是令人头疼的。

退一步讲, 真正用到 Antd-Pro 的又都是哪些项目呢? 恐怕大部分都是一些老项目吧! 那在此前提下, 再看 Antd-Pro, 它还是这么完美吗? 我认为它还有缺点的, 最令我无法忍受的是 __完全没有考虑开发者的痛点__, 前面提到中后台的场景大部分难度较高, 而 __框架本质本来就应该是提升开发体验、提高开发效率__, 可 Antd-Pro 无论是开发还是配置, 都逐渐复杂。

## 我的愿景
- 开发简单
- API 符合直觉
- 使用灵活
  - 不要过度封装, 思考 __开、闭__ 的界限
- __提效显著__
  - 降低心智负担 (将状态抽象)
  - 减少代码量 (大概 __减少 200 行__)
  - 完善的样式
  - 综上: __提效 50%~90%__, 页面越简单提升越大
- 方便定制化
  - 依靠 antd5 token

## css or css in js ?
css in js 库有很多种, 比较著名的就是 emotion, 但通过 [Sam Magura 的文章](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) 可知这类库的优缺点都很明显

__优点__
- css 模块化 (重要功能)
- 与 js 代码合在一起 (不用单独写 css 文件, 感觉可能更难维护...)
- 能将 js 变量应用到样式上 (React 也能做到, 不过只能是 inline-style)

__缺点__
- 性能问题 (忍不了)
- 样式权重问题 (影响样式覆盖, 基础库不能容忍此缺点)
- 增加了包体积 8kb (略微牵强, 可忽略)

__为什会有性能问题 ?__

css in js 会将 css 转换为 hash 值, 每次页面更新都需要重新序列化得到 css 后再次计算 hash, 因此增加了额外的性能开销, 例如下面的 style

```html | pure
<style data-emotion="css mj4qsp" data-s>
.css-mj4qsp {
  display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display: flex;-webkit-align-items: center;
  -webkit-box-align: center;-ms-flex-align:center;align-items: center;border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  padding-inline: 24px! important;height: 48px; line-height: 48px; background: transparent! important;
}
</style>
```

__怎么解决 ?__

将 hash 缓存起来, 不就好了? 因此 [antd](https://ant.design/docs/blog/css-in-js-cn#%E8%AE%A1%E7%AE%97-hash) 给出了方案, 通过缓存的方法去减少序列化 css 的次数, 只关注 antd version 和 token, 当二者改变时才重新计算 hash

__如果样式是受控的怎么办 ?__

这个问题其实很简单, 每个组件都是一个独立的存在, 无论怎么受控, 样式都是存在于组件内的, 因此我们给组件做缓存即可。(props.style 不是 css in js)


__最后的选择: antd-style__

但 antd-style 就是完美的吗 ? antd-style 基于 emotion, 但它有一下优缺点

__优点__
- 性能好
- 兼容 antd5 token
- 更适合基于 antd 二次封装的组件库, createInstance 发挥了重要作用
- 样式覆盖优秀 (:where)

__缺点__
- 组件级: 需要独特的 key
- 不能直接复写样式, 需要先传 className, 如果组件不支持 className 就难受了
- 兼容性差 [:where 兼容性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)
- 综上: 只适合组件库


## 兼容性
Antd5 的样式方案为 css in js, 在此基础上应用 :where css selector 降低样式权重为开发者提供更好的样式覆盖体验, 但由于其兼容性, 导致一些浏览器是不可用的, 即使按照官网所提供的[样式兼容](https://ant.design/docs/react/compatible-style-cn), 其实也只是兼容那些标签类的组件, 比如弹出层类的组件, 由于是脱离了 root 节点之外插入, 所以基本类似 message、Tour、Modal 这种组件的样式还是会出现异常
因此, 目前更推荐使用 __Chrome 及 Edge__, 并且应是较新版本
