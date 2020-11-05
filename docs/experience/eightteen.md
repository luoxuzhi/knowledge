## 18. 面试

### 1.有赞

Q1. css 盒模型的理解

Q2. 怎么理解 js 中的原型？原型有什么作用？js 怎么实现继承

每个函数都是一个对象。每个函数都有一个 `prototype` 属性，这个属性是一个指针，指向一个对象，
而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法，即原型对象。通过子类原型指向父类实例实现继承

Q3. 了解 js 的作用域吗？var、let、const 区别？

Q4. 了解浏览器的同源策略吗？跨域的解决方式？

Q5. http 和 https 协议的区别？http2 多路复用的作用？https 加密过程？对称加密和非对称加密？缓存机制？

Q6. 有用过 nodejs 吗

Q7. 有了解过 Vue3 吗？Vue3 响应式和 Vue2 的区别？Proxy 实现有什么好处？Proxy 性能提升体现在什么地方？除了响应式其他的新特性？

Q8. 前端安全了解吗？csrf 的原理和处理方式？

Q9. 对前端工程化 webpack 的了解？

### 2.bigo 一面

Q1. tcp3 次握手和 4 次挥手

Q2. https 原理、为什么是安全的？非对称和对称加密区别

Q3. http1.1 和和 http2 区别，http2 除了字节传输、多路复用还有什么其他特性？有多路复用了多张图片还需要拼接吗？

Q4. xss、csrf 危害、防止手段

Q5. Vue2 双向绑定原理、和 Vue3 响应式原理区别、Vue3 的 Proxy 优势

Q6. Vue2 的 diff 算法原理

Q7. 怎么理解 vnode

编程题：

打印出一个 String 串中所有字母的所有可能的排列，假定字母不重复
例如 “han” → "han" "hna" "nah" "nha" "ahn" “anh"
function allOrderOfString(str) { }

```js
// 关键：不停的调换相邻元素的位置
function swap(arr, i, j) {
  if (i != j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

function perm(str) {
  let res = []
  let arr = str.split('')
  function fn(n) {
    //为第n个位置选择元素
    for (var i = n; i < arr.length; i++) {
      swap(arr, i, n)
      //判断数组中剩余的待全排列的元素是否大于1个
      if (n + 1 < arr.length - 1) {
        //从第n+1个下标进行全排列
        fn(n + 1)
      } else {
        res.push(arr.join(''))
      }
      swap(arr, i, n)
    }
  }
  fn(0)
  return res
}

console.log(perm('abc')) //  ["abc", "acb", "bac", "bca", "cba", "cab"]

// 解法二
function getMaxCompose(arr, num) {
  let _arr = []

  function getRet(target, num, result) {
    let len = target.length
    if (num === 1) {
      for (let i = 0; i < len; i++) {
        let temp = result.slice()
        temp.push(target[i])
        _arr.push(temp)
      }
    } else {
      num--
      for (let j = 0; j < len; j++) {
        let temp = result.slice()
        let newTarget = target.slice()
        temp.push(target[j])
        newTarget.splice(j, 1)
        getRet(newTarget, num, temp)
      }
    }
  }
  getRet(arr, num, [])
  return _arr
}
```

#### bigo 二面

Q1. 自我介绍

Q2. webpack 有哪些配置项，怎么配置多入口

Q3. Vue 比较高级的用法

Q4. Vue 写页面的性能优化方式有没有总结

Q5. 移动端适配和兼容有没有总结

Q6. 前后端配比

Q7. 写项目怎么测试的？是否写测试用例

Q8. 职业规划

Q9. 最有成就感的两个项目

编程题一：

```js
// 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
function longestValidParentheses(s) {}
console.log(longestValidParentheses('(()')) // 2
console.log(longestValidParentheses(')()())')) // 4
```

编程题二：

大数相加腾讯云+bigo 出现

```js
//实现字符串大数相加
function plus(num1, num2) {}
```

#### bigo 三面编程题

```js
// 遍历一次找出数组中最小的三个元素
// 思路为先取三个元素放到一个新数组中，后面剩余的依次放进去，四个四个比较
```

### 3.顺丰保险经纪公司

Q1. event bus 缺点

Q2. Vue 多层级数据传输方式

Q3. 事件委托捕获

Q4. for in 和 ObjecQt. keys 区别

for in 会遍历出原型链上的属性

Q5. es6 遍历对象的方式

Q6. for 输出 012345 的原因

Q7. 创建对象的方式？为什么要有 ObjecQt. create

Object.create 创建的通过原型链访问，Vue2 底层重写数组方法有利用这个 api

Q8.数组排序的方法

冒泡排序、快速排序、选择排序、计数排序等

Q9. 判断数据类型的方法？

- Object.prototype.toString.call() //这个方法是最好了，可以明确的区分各种类型
- typeof //这个区分不出来数组和对象和 null。
- Array.isArray() //这个用来区分数组
- instanceof //无法区分 null 和 undefined

### 4.腾讯看点

Q1. 二分法查找数据 [-1,0,5,7,9,21]

Q2. node 事件循环机制

浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。
而在 Node.js 中，microtask 会在事件循环的各个阶段之间（timer、I/O、check quene、close quene）执行，也就是一个阶段执行完毕,会去执行 NextTick Quene，最后去执行 microtask 队列的任务。[参考](https://www.imooc.com/article/79674)

Q3. node 程序内存监控

Q4. https 原理,加密过程，为什么是安全的？ https 调试

Q5. 浏览器内存释放 标记清除

Q6. 通过原型链实现继承

一句话总结，让子类的原型等于父类的实例。详细来说，其实利用了原型的性质，即在 JavaScript 中所有被实例化对象具有相同的原型属性和方法，每一个被实例化对象的原型指针均指向同一个地址，通过改变原型指针指向的位置来实现继承。

Q7. 多个包含 async 的 script 标签的加载过程

- 由于浏览器会先解析完不使用 defer 属性的`<script>`元素中的代码，然后再解析后面的内容，所以一般应该把`<script>`
  元素放在页面最后，即主要内容后面， `</body>` 标签前面。
- 使用 defer 属性可以让脚本在文档完全呈现之后再执行,延迟脚本总是按照指定它们的顺序执行。
- 使用 async 属性可以表示当前脚本不必等待其他脚本，也不必阻塞文档呈现。不能保证异步脚本按照它们在页面中出现的顺序执行

Q8. html 加载过程触发的事件

readstatechange、DOMContentLoaded（DOM 树渲染完成）、load（DOM/CSS/JS 加载完成）

Q9. 跨域怎么做，怎么允许 cookie 跨域

后端 'Access-Control-Allow-Origin'要设置具体域名，'Access-Control-Allow-Credentials'要设置 true，
前端请求头要带上'withCredentials:true'

### 6.头条 1 面

Q1. Vue 自定义指令 insert 和 bind 的区别？

insert 是插入到父节点的时候执行，bind 是第一次绑定到节点的时候执行

Q2. less sass 跳过 scoped 样式穿透

less sass 的/deep/穿透，使用 stylus 的时候>>>穿透

Q3. css 选择器权重

important>行内>id>类、伪类、属性选择器>标签、伪元素

Q4. 浏览器渲染元素过程中那些元素会被提升到合成层？[请看链接](http://www.360doc.com/content/20/0506/03/36367108_910463065.shtml)

Q5.Vue3 的 setup 在什么阶段执行

在组件的 beforeCreate 之前执行

Q6. import 文件是什么时候执行？ commonjs 和 es 模块的区别？

Q7. window.requestAnimationFrame 什么时候执行？

Q8. webpack 打包过程中主要的执行流、构建流程是怎么样的？做了哪些事情
