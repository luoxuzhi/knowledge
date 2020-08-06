## 13. 手写篇

### 1. 数值转换,一元运算符 +

```js
const age = +'22' // 22
let text2 = '1' + 2 // "12"
let text3 = 1 + '2' // "12"
let text4 = 1 + 2 + '3' // "33"
let num = +text1 //  12 转换为 Number 类型
```

### 2. es5 实现 promise

### 3. 栈内存、堆内存理解

```js
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }

a.x // --> undefined
b.x // --> {n: 2}
```

1. 优先级。.的优先级高于=，所以先执行 a.x，堆内存中的{n: 1}就会变成{n: 1, x: undefined}，改变之后相应的 b.x 也变化了，因为指向的是同一个对象。
2. 赋值操作是从右到左，所以先执行 a = {n: 2}，a 的引用就被改变了，然后这个返回值又赋值给了 a.x，需要注意的是这时候 a.x 是第一步中的{n: 1, x: undefined}那个对象，其实就是 b.x，相当于 b.x = {n: 2}

### 4. 手写实现 new

```js
function create() {
  // 创建一个空的对象
  var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments)
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments)
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj
}
```

### 5. 简单的深拷贝实现

深拷贝可以拆分成 2 步，浅拷贝+递归，浅拷贝时判断属性值是否是对象，如果是对象就进行递归操作，两个一结合就实现了深拷贝。

```js
function cloneDeep1(source) {
  var target = {}
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = cloneDeep1(source[key]) // 注意这里
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
```

一个简单的深拷贝就完成了，但是这个实现还存在很多问题。

1、没有对传入参数进行校验，传入 null 时应该返回 null 而不是 {}

2、对于对象的判断逻辑不严谨，因为 typeof null === 'object'

3、没有考虑数组的兼容
