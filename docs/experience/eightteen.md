## 18. 面试

#### 1.有赞

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

#### 2.bigo

##### 一面

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
```
