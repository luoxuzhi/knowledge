## 9. function 对象

1. `call`,`apply`的作用都是改变函数内部的`this`指向，如果函数内部没有使用`this`，第一个参数可以随便定义，`apply` 参数传递并且展开`arguments`参数数组

```js
function applyLearn(a, b, c) {
  return a + b + c
}
function anoter(d, e, f) {
  let args = arguments
  return applyLearn.apply(null, args)
}
let result = anoter(5, 5, 9) // 19
```

2.`this`的指向问题

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

console.log(new Factory().c.b()) // a+

obj.a() // window
obj.b() // obj

let c = obj.b
c() // window
```
