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

3. SVG 知识点

- SVG 基础知道了解 [SVG viewport、viewBox、preserveAspectRatio](https://blog.csdn.net/chy555chy/article/details/53538394)

* [SVG 动画相关例子](http://www.youbaobao.xyz/datav-docs/guide/libs/svgAnimation.html#svg-%E5%8A%A8%E7%94%BB%EF%BC%88smil%EF%BC%89)，常用的有`animate/set/animateTransform/animateMotion`

* symbol 相比 g 的有点是内部可以有独立的`viewBox`，外面使用的时候不需要设置`viewBox`属性
