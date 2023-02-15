## 经典编程题

1.

注意第一个例子，具名的立即执行函数不能被重新赋值，所以 b=20 无效

```js
var b = 10
;(function b() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了。发现了具名函数 function b(){}，拿此b做赋值；
  // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20
  console.log(b) // [Function b]
  console.log(window.b) // 10，不是20
})()
-------------------------------------------------------------------------------------
var b = 10
;(function() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，此时的b是全局的b，拿此b做赋值；
  // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20
  console.log(b) // 20
  console.log(window.b) // 20
})()
-------------------------------------------------------------------------------------
var b = 10
;(function b() {
  var b = 20
  console.log(b) // 20
  console.log(window.b) // 10，不是20
})()
```

2.  事件循环、作用域

b 在`window`上

```js
let i
for (i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
function demo() {
  let x = (b = 0)
  return x
}
demo()
console.log(typeof x) // undefined
console.log(typeof b) // number
// 3 3 3
```

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
function demo() {
  let x = (b = 0)
  return x
}
demo()
console.log(typeof x) // undefined
console.log(typeof b) // number
// 0 1 2
```

3.  new Boolean()

`if` 括号里面包裹的内容如果非`boolean`类型都会调用 `new Boolean()` 后通过 `valueOf()`取值，所以下面`if`括号实际执行的是 `(new Boolean(c)).valueOf()`,`new Boolean()`返回的值（通过`valueOf()`取）为`false` 的情况：`null/NaN/undefined/0/-0/''/false`，[链接 1](https://blog.csdn.net/weixin_33770878/article/details/93558751)，[链接 2](https://bbs.csdn.net/topics/392285331)

```js
let c = new Boolean(false)
console.log(c, typeof c) // Boolean {false} 'object'
let d = new Boolean(c)
console.log(d, typeof d) // Boolean {true} 'object'
if (c) {
  console.log(55)
} // 55
```

4. 原型链，[具体分析](https://blog.csdn.net/cc18868876837/article/details/81211729)

分析：`test` 为 `string` 时候的 `constructor` 为 `String`，`String` 的 `constructor` 的 `Function`，`Function` 的 `constructor` 的本身，所以后面多少`[test]`返回的都是同一个方法

```js
let test = 'constructor'
console.log(test[test][test](`console.log(test)`))
//       ƒ anonymous(
// ) {
// console.log(test)
// }
test[test][test][test](`console.log(test)`)() // constructor

Function.prototype.__proto__ === Object.prototype // true
```

5. js 比较

包含`boolean`类型的比较规则：[详细见链接](https://www.cnblogs.com/zhaoyl9/p/11313714.html)

- 如果比较的两者中有 boolean，会把 boolean 先转换为对应的 number，即 0 和 1
- 如果比较的双方中有一方为 number 一方为 string，会把 string 转换为数字
- 把 string 直接转换为 boolean 的时候，空字符串‘'转换为 false，除此外的一切字符串转换为 true

`instanceof` 类型一致才为`true`

```js
1 < 2 < 3 //true,分解为 (1 < 2) < 3 -> true <  3
3 > 2 > 1 // false 分解为 (3 > 2) > 1 -> true > 1

1 instanceof Number // false
'' instanceof String // false
```
