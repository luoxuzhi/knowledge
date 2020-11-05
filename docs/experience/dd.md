## 18. 面试题

bigo 前端一面： 2. webpack 主要做了哪些优化  
DllPlugin Happypack uglify-parallel

3. Tree shaking 怎么做
   使用 es6 模块化语法和 webpack 的 uglifyJsPlugin 实现

4. 浏览器渲染过程
   浏览器将获取的 HTML 文档并解析成 DOM 树。

处理 CSS 标记，构成层叠样式表模型 CSSOM(CSS Object Model)。

将 DOM 和 CSSOM 合并为渲染树(rendering tree)将会被创建，代表一系列将被渲染的对象。

渲染树的每个元素包含的内容都是计算过的，它被称之为布局 layout。浏览器使用一种流式处理的方法，只需要一次 pass 绘制操作就可以布局所有的元素。

将渲染树的各个节点绘制到屏幕上，这一步被称为绘制 painting.

//简化并优化 CSS 选择器，尽量将嵌套层减少到最小
//尽量减少在 JavaScript 中进行 DOM 操作。
//修改元素样式时，更改其 class 属性是性能最高的方法。
//尽量用 transform 来做形变和位移

6. 怎么分析 webpakck 包大小, 如果过大怎么做  
   // 提取第三方库、使用 external

7. 真机调试怎么做
8. Vue nexttick 有什么作用
   Vue 是异步执行 dom 更新的，一旦观察到数据变化，Vue 就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher
   推送进这个队列。如果这个 watcher 被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOm 操作。
   而在下一个事件循环时，Vue 会清空队列，并进行必要的 DOM 更新。

9. html 遇到 js 脚本怎么处理

10. 埋点怎么做

11. 跨域脚本报错怎么处理
    方案一：
    将 js 内联到 HTML 中/将 js 文件与 HTML 放在同域下
    方案二：

为页面上 script 标签添加 crossorigin 属性/被引入脚本所在服务端响应头中，增加 Access-Control-Allow-Origin 来支持跨域资源共享

12. 跨域怎么做，怎么允许 cookie 跨域
    后端 'Access-Control-Allow-Origin'要设置具体域名，'Access-Control-Allow-Credentials'要设置 true，
    前端请求头要带上'withCredentials:true'

13. 说一下防抖节流以及应用场景
14. 实现一个防抖函数

bigo 前端二面：
介绍一下自己
团队情况怎么样
现在在深圳，是要回广州吗
介绍一下项目亮点
发布流程是怎么样的
技术难点在哪里
webpack 打包做了哪些优化
webpack 包太大你怎么处理

说下 vuex 的原理
vuex 在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了 vue 的数据响应化特性实现的，
它会利用 Vue 将 state 作为 data 对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

怎么去分析以及优化一个网站的性能

HTML 　
① 使用 HTML5 新标签，例如 header、footer、section、nav、article。因为它们语义化，速度快，结构合理，浏览器上识别能力强。　　
② 减少 HTML 标签嵌套深度，嵌套越深，在移动端的 Web 页面渲染速度以及滚动流畅度都会有所减低。　　
③ 为图片指定大小，减少重排。　　
④ 压缩 HTML。

CSS 　　
② 模块化、精简 css，提高复用率。　　
③ 减少渐变、阴影的使用。　　
④ 合理使用 CSS3 高性能动画，Translate3d 支持硬件加速。　　
⑤ 避免使用滤镜。　　
⑥ 不使用@import。　　
JavaScript 　　
① 暂缓 JavaScript 解析，暂缓解析不需要的 JavaScript（等到需要执行时再进行解析），可以提高网页的初始加载速度。　　
② 使用事件委托机制，避免频繁操作 DOM 节点。

pwa 了解吗?[离线缓存怎么做?](https://segmentfault.com/a/1190000012353473)

PWA 的优势
可以将 app 的快捷方式放置到桌面上，全屏运行，与原生 app 无异
能够在各种网络环境下使用，包括网络差和断网条件下，不会显示 undefind
推送消息的能力
其本质是一个网页，没有原生 app 的各种启动条件，快速响应用户指令

PWA 存在的问题
支持率不高:现在 ios 手机端不支持 pwa，IE 也暂时不支持
Chrome 在中国桌面版占有率还是不错的，安卓移动端上的占有率却很低
各大厂商还未明确支持 pwa
依赖的 GCM 服务在国内无法使用
微信小程序的竞争
尽管有上述的一些缺点，PWA 技术仍然有很多可以使用的点。

service worker 技术实现离线缓存，可以将一些不经常更改的静态文件放到缓存中，提升用户体验。
service worker 实现消息推送，使用浏览器推送功能，吸引用户
渐进式开发，尽管一些浏览器暂时不支持，可以利用上述技术给使用支持浏览器的用户带来更好的体验。

你有什么规划吗？
做题 数组转树

关于算法，一面让实现一个比较基础的前端功能， 二面是一个数据结构的转换。都超简单

2.一个数组，中间有一个数字重复，找到它。要求时间复杂度为 O(n)

3.实现方法 Roll(1,2)(3)(5) //11

```js
function add(a, ...args) {
  let sum = [a, ...args].reduce((prev, current) => prev + current, 0)
  function s(c, ...args1) {
    let sum1 = [c, ...args1].reduce((p, c) => p + c, 0)
    sum += sum1
    return s
  }
  s.toString = function() {
    return sum
  }
  return s
}
```

柯里化主要有 3 个作用：参数复用、提前返回和 延迟执行

4.用 Promise async await 实现异步加载图片的方法

```js
loadImg(src).then()
loadImg([src1, src2, src3]).then()

function loadImg(url) {
  let img = new Image()
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(url)
    img.onerror = e => reject(e)
  })
}

function loadAll(arr) {
  let promiseArr = arr.map(url => loadImg(url))
  return Promise.all(promiseArr)
}
```

5.一些填空题，给一段代码，问执行结果（变量提升、作用域、promise 执行顺序等）

腾讯看点：

1. 二分法查找数据 [-1,0,5,7,9,21]

2. node 事件循环机制
   浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。
   而在 Node.js 中，microtask 会在事件循环的各个阶段之间（timer、I/O、check quene、close quene）执行，也就是一个阶段执行完毕,会去执行 NextTick Quene，最后去执行 microtask 队列的任务。[参考](https://www.imooc.com/article/79674)

3. node 程序内存监控

4. https 原理,加密过程，为什么是安全的？ https 调试

5. 浏览器内存释放 标记清除

6. 通过原型链实现继承

一句话总结，让子类的原型等于父类的实例。

详细来说，其实利用了原型的性质，即在 JavaScript 中所有被实例化对象具有相同的原型属性和方法，每一个被实例化对象的原型指针均指向同一个地址，通过改变原型指针指向的位置来实现继承。

7. 多个包含 async 的 script 标签的加载过程

- 由于浏览器会先解析完不使用 defer 属性的<script> 元素中的代码，然后再解析后面的内容，所以一般应该把<script>
  元素放在页面最后，即主要内容后面， </body> 标签前面。
- 使用 defer 属性可以让脚本在文档完全呈现之后再执行,延迟脚本总是按照指定它们的顺序执行。
- 使用 async 属性可以表示当前脚本不必等待其他脚本，也不必阻塞文档呈现。不能保证异步脚本按照它们在页面中出现的顺序执行

8. html 加载过程触发的事件 readstatechange、DOMContentLoaded（DOM 树渲染完成）、load（DOM/CSS/JS 加载完成）

性能优化：

文件压缩，减小资源大小
异步组件，按需加载
小图片转 base64，减少请求
雪碧图，减少请求
选择合适的图片格式和尺寸
懒加载，按需加载
css 放最上面，js 放在 body 最下面，渲染优化
事件节流，减少操作
减少 Dom 操作和避免回流，渲染优化
浏览器缓存，减少请求次数或响应数据
减少 cookie 的使用，减少请求携带大小

① 使用 HTML5 新标签，例如 header、footer、section、nav、article。因为它们语义化，速度快，结构合理，浏览器上识别能力强。　　
② 减少 HTML 标签嵌套深度，嵌套越深，在移动端的 Web 页面渲染速度以及滚动流畅度都会有所减低。　　
③ 为图片指定大小，减少重排。　　
④ 压缩 HTML。

CSS 　　
② 模块化、精简 css，提高复用率。　　
③ 减少渐变、阴影的使用。　　
④ 合理使用 CSS3 高性能动画，Translate3d 支持硬件加速。　　
⑤ 避免使用滤镜。　　
⑥ 不使用@import。　　
JavaScript 　　
① 暂缓 JavaScript 解析，暂缓解析不需要的 JavaScript（等到需要执行时再进行解析），可以提高网页的初始加载速度。　　
② 使用事件委托机制，避免频繁操作 DOM 节点。

bigo 一二面问题：

1. tcp3 次握手和 4 次挥手
2. https 原理、为什么是安全的？非对称和对称加密区别
3. http1.1 和和 http2 区别，http2 除了字节传输、多路复用还有什么其他特定？有多路复用了多张图片还需要拼接吗？
4. xss、csrf 危害、防止手段
5. Vue2 双向绑定原理、和 Vue3 响应式原理区别、Vue3 的 Proxy 优势
6. Vue2 的 diff 算法原理
7. 怎么理解 vnode

二面

1. 自我介绍
2. webpack 有哪些配置项，怎么配置多入口
3. Vue 比较高级的用法
4. Vue 写页面的性能优化方式有没有总结
5. 移动端适配和兼容有没有总结
6. 前后端配比
7. 写项目怎么测试的？是否写测试用例
8. 职业规划
9. 最有成就感的两个项目

顺丰保险模块：

1. event bus 缺点
2. Vue 多层级数据传输方式
3. 事件委托捕获
4. for in 和 Object. keys 区别
5. es6 遍历对象的方式
6. for 输出 012345 的原因
7. 创建对象的方式？为什么要有 Object. create

8. Object.prototype.toString.call() //这个方法是最好了，可以明确的区分各种类型
9. typeof //这个区分不出来数组和对象和 null。
10. Array.isArray() //这个用来区分数组
11. instanceof //无法区分 null 和 undefined

<!-- 字节1面 -->

Vue 自定义指令 insert 和 bind 的区别？
insert 是插入到父节点的时候执行，bind 是第一次绑定到节点的时候执行

less sass 跳过 scoped 样式穿透
less sass 的/deep/穿透，使用 stylus 的时候>>>穿透

css 选择器权重
important>行内>id>类、伪类、属性选择器>标签、伪元素

浏览器渲染元素过程中那些元素会被提升到合成层？
[请看链接](http://www.360doc.com/content/20/0506/03/36367108_910463065.shtml)

Vue3 的 setup 在什么阶段执行
在组件的 beforeCreate 之前执行

import 文件是什么时候执行？ commonjs 和 es 模块的区别？
window.requestAnimationFrame 什么时候执行？
webpack 打包过程中主要的执行流、构建流程是怎么样的？做了哪些事情
