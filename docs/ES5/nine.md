## 9. function 对象

1. `call`,`apply`,`bind`的作用都是改变函数内部的`this`指向，如果函数内部没有使用`this`，第一个参数可以随便定义，`apply` 参数传递并且展开`arguments`参数数组。
   但是 call/apply 是直接进行相关函数调用；bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，并且不能再通过`call/apply`改变，开发者需要手动调用即可。

   :::danger
   bind 绑定的 this 不能通过 call、apply 改变

   箭头函数的 this 不能通过 call、apply、bind 改变

   对象的 key 如果是箭头函数，只要没被`function`包裹，无论层级多深，this 都是指向 window

   显示绑定 this 的优先级比隐式优先级高，显示绑定的优先级是：new>bind>apply/call

   :::

```js
function applyLearn(a, b, c) {
  return a + b + c
}
function anoter(d, e, f) {
  let args = arguments
  return applyLearn.apply(null, args)
}
let result = anoter(5, 5, 9) // 19

let test = {
  a: 88,
  b: function() {
    console.log(this.a)
  },
  c: () => {
    console.log(this.a) // this 指向window
  },
}

var pp = { a: 99 }
let q = { a: 100 }

test.b.bind(pp).call(q) //99,bind绑定的this不能通过call、apply改变
test.c.bind(pp).call(q) //undefined,箭头函数的this不能通过call、apply、bind改变

function foo(a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) //2
var baz = new bar(3)
console.log(baz.a) //3  // new 的优先级比bind高
```

2.`this`的指向问题

在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。

```js
var Factory = function() {
  // console.log(this)
  this.a = 'a'
  this.b = 'b'
  this.c = {
    a: 'a+',
    b: function() {
      return this.a
    },
  }
}

var obj = {
  a: () => {
    console.log(this)
  },
  b: function() {
    console.log(this)
  },
}

console.log(new Factory().c.b()) // a+,此时this指向{
//   a: 'a+',
//   b: function() {
//     return this.a
//   },
// }

obj.a() // window
obj.b() // obj

let c = obj.b
c() // window
```
