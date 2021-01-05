## 9. 可视化体系课

1. 使用`v-charts`实现地图好处是无需应用百度地图库、无需类似使用`vue-charts`的如下方式引入`bmap`插件

```js
import 'echarts/extension/bmap/bmap'
```

2.可视化组件库

- 以下命令快速初始化生成`package.json`文件

```js
npm init -y
```

- es、commonjs 模块都可以实现 `tree-shaking`效果

```js
// es 实现方式
export const a = 1
export const b = 2
// commonjs 实现方式
exports.a = 1
exports.b = 2
```

- [rollup 配置打包.vue 文件过程碰到问题的解决方案](https://blog.csdn.net/kalrase/article/details/110186870)

- rollup 打包支持`async await`语法需安装`@babel/plugin-transform-runtime`

3. SVG 知识点

- SVG 基础知道了解 [SVG viewport、viewBox、preserveAspectRatio](https://blog.csdn.net/chy555chy/article/details/53538394)

* [SVG 动画相关例子](http://www.youbaobao.xyz/datav-docs/guide/libs/svgAnimation.html#svg-%E5%8A%A8%E7%94%BB%EF%BC%88smil%EF%BC%89)，常用的有`animate/set/animateTransform/animateMotion`

* symbol 相比 g 的有点是内部可以有独立的`viewBox`，外面使用的时候不需要设置`viewBox`属性

* 可以在`svg`标签中通过`defs`标签定义一些类似 js 中变量的图形，通过`use`标签配置`href`属性使用

- `#id`的这种用法有`mask、fill、href`属性，具体区别看代码

```html
<svg :width="400" :height="400">
  <defs>
    <path id="fly-box-path" d="M5 5 L 395 5 L 395 395 L 5 395 Z" fill="none"></path>
    <radialGradient id="fly-box-radial" cx="50%" cy="50%" r="50%" fx="100%" fy="50%"></radialGradient>
    <mask id="fly-box-mask">
      <circle r="50%" fill="url(#fly-box-radial)"></circle>
    </mask>
  </defs>
  <use href="#fly-box-path" :stroke="starColor" stroke-width="3" mask="url(#fly-box-mask)"></use>
</svg>
```

4. MutationObserver

实际使用，[相关的 API 看 MDN 介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)

```js
const initMutationObserver = () => {
  observer = new window.MutationObserver(onReize)
  observer.observe(containerEle, {
    attributes: true,
    attributeOldValue: true,
    // attributeFilter: ['style'],
    // subtree: true,
  })
}
```
