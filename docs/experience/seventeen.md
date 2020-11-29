## 17. 面试

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

typeof 类型 `number undefined string boolean object function` [js 中的值类型和引用类型的区别](https://www.cnblogs.com/leiting/p/8081413.html)

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

### 5.腾讯视频 1 面

```js
编程题一：
function Page() {
  return this.hosts
}
Page.hosts = ['h1']
Page.prototype.hosts = ['h2']

const p1 = new Page()
const p2 = Page()

console.log(p1.hosts) // undefined
// p1通过new 创建，因此可以获取到原型链上的hosts返回p1= ['h2'],p1没有hosts属性所以返回undefined

console.log(p2.hosts) // Cannot read property 'hosts' of undefined
// p2 为函数直接执行结果，此时this指向window，返回p2为undefined

题目二：

var value = 20
(function () {
  console.log(name) // undefined

  console.log(value) // Cannot access 'value' before initialization
  var name = 'local value'
  let value = 21
})();

题目三：
1、腾讯行政MM请求程序员小哥哥帮忙：提前一天能收到某间会议室预定的全部开始和结束时间，
要求根据时间列表编排会议室日程，为了使得会议室资源最大化利用，希望能尽量多的安排当天会议场次。

要求实现一个方法，输入场次列表，输出最多能安排的会议，例如输入数组：

[{start:'9:00',end:'10:00'},{start:'10:00',end:'11:00'},{start:'9:30',end:'12:00'},
{start:'9:00',end:'11:30'},{start:'11:00',end:'11:30'},{start:'14:30',end:'16:00'},
{start:'17:00',end:'18:00'},{start:'19:30',end:'21:00'},{start:'19:00',end:'20:00'},
{start:'11:00',end:'12:00'}]

输出：
[{start:'9:00',end:'10:00'},{start:'10:00',end:'11:00'},
{start:'11:00',end:'12:00'},{start:'14:30',end:'16:00'},
{start:'17:00',end:'18:00'}，{start:'19:00',end:'20:00'}]

题目四：请实现函数log()，将一个对象扁平化的输出到控制台。如：
log({
  foo : 'test',
  bar : {
      id : 123,
      name : 'tx'
  }
})
输出：
foo=test
bar.id=123
bar.name=tx


```

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

编程题：

```js
// 第一题,两个打印的结果
var a = function() {
  this.b = 3
}
var c = new a()
a.prototype.b = 9
var b = 7
a()
console.log(b) // 3
console.log(c.b) // 3

// 第二题，实现add(1,2)(5)、add(1)(2)(5)、add(1)(2,5) 等于8
function sum(a, ...args) {
  let sum = [a, ...args].reduce((a, b) => a + b)
  function s(b, ...args1) {
    let sum1 = [b, ...args1].reduce((c, d) => c + d)
    sum += sum1
    return s
  }
  s.toString = () => sum
  return s
}

// 第三题：实现中文一二三四五六七八九十代表的亿以下的数转化为阿拉伯数字，
// 如五百七十万零二十，输出5700020
let chnNumChar = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
}
let chnNameValue = {
  十: { value: 10, secUnit: false },
  百: { value: 100, secUnit: false },
  千: { value: 1000, secUnit: false },
  万: { value: 10000, secUnit: true },
  亿: { value: 100000000, secUnit: true },
}
function transChineseToNumer(chineseStr) {
  let rtn = 0
  let section = 0
  let number = 0
  let secUnit = false
  let str = chineseStr.split('')
  for (let i = 0; i < str.length; i++) {
    let num = chnNumChar[str[i]]
    if (typeof num !== 'undefined') {
      number = num
      if (i === str.length - 1) {
        section += number
      }
    } else {
      let unit = chnNameValue[str[i]].value
      secUnit = chnNameValue[str[i]].secUnit
      if (secUnit) {
        section = (section + number) * unit
        rtn += section
        section = 0
      } else {
        section += number * unit
      }
      number = 0
    }
  }
  return rtn + section
}
```

### 头条 2 面

编程题:

```js
// 第一题：写出以下代码的打印顺序
async function async1() {
  console.log('async1 start') // 2
  await async2()

  console.log('async1 end') // 6
}

async function async2() {
  console.log('async2') // 3
}

console.log('script start') //1
setTimeout(function() {
  console.log('setTimeout') // 9
}, 0)

requestAnimationFrame(function() {
  console.log('requestAnimationFrame') // 8
})

async1()
new Promise(function(resolve) {
  console.log('promise1') // 4
  resolve()
}).then(function() {
  console.log('promise2') // 7
})

console.log('script end') // 5

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// requestAnimationFrame
// setTimeout
```

```js
// 第二题：给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格，
// 可以在第i天买进，它后面的天数卖出。设计一个算法来计算你所能获取的最大利润。
// 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 如 [5, 3, 3, 5, 6, 9, 8] 最大的利润为9-3 = 6 [5, 4, 3, 2, 1]
// 输出为0，[5, 8, 8, 5, 6, 10, 13, 9, 11, 9] 输出13

// 思路，画波形图，低点买入高点卖出
function getMaxProfile(arr) {
  let len = arr.length
  let result = []

  let j, k
  for (let i = 0; i < len; i++) {
    j = k = i
    while (arr[i] < arr[i + 1]) {
      k = ++i
    }
    if (arr[j] !== arr[k]) {
      result.push(arr[k] - arr[j])
    }
  }
  return result.length ? result.reduce((a, b) => a + b) : 0
}

console.log(getMaxProfile([5, 8, 8, 5, 6, 10, 13, 9, 11, 9]))
```

### 7.腾讯 CSIG-企业安全方向

Q1. 常见的 web 漏洞？怎么防范

xss、csrf

Q2. nodejs 在什么场景下使用？是阻塞还是非阻塞的？

非阻塞的，采用事件机制。NodeJS 适合运用在高并发、I/O 密集、少量业务逻辑的场景。

Q3. canvas 和 svg 什么区别？echarts 和 g6 不能满足需求的情况下怎么处理？

1. svg 绘制出来的每一个图形的元素 zhi 都是独立的 DOM 节点，能够方便的绑定事件或用来回修改。canvas 输出的是一整幅答画布。

2. svg 输出的图形是矢量图形，后期可以修改参数来自由放大缩小，不会失真和锯齿。

canvas 输出标量画布，就像一张图片一样，放大会失真或者锯齿。

3. canvas 适用场景：canvas 提供的功能更原始，适合像素处理，动态渲染和大数据量绘制。

   svg 适用场景：svg 功能更完善，适合静态图片展示，高保真文档查看和打印的应用场景。

Q4. Vue 中父子、非父子组件的通信方式？
