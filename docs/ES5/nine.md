## 9. function对象

1. `call`,`apply`的作用都是改变函数内部的`this`指向，如果函数内部没有使用`this`，第一个参数可以随便定义，`apply` 参数传递并且展开`arguments`参数数组
```js
function applyLearn (a,b,c) {
  return a+b+c
}
function anoter (d,e,f) {
  let args = arguments
  return applyLearn.apply(null, args) 
}
let result = anoter(5,5,9)// 19
```
