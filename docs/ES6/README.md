## 1. let / const 

1. let 
  * let所声明的变量，只在let命令所在的代码块内有效。 

  * let所声明的变量一定要在声明后使用，否则报错。

  * ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。
  * let不允许在相同作用域内，重复声明同一个变量。

2.块级作用域
块级作用域的出现，使得获得广泛应用的立即执行函数表达式（`IIFE`）不再必要。

```js
// IIFE写法
(function(){
  var tem=...
})()
// 块级作用域写法
{
  let tem = ...
}
```

3. function
* 允许在块级作用域内声明函数。
* 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
* 同时，函数声明还会提升到所在的块级作用域的头部。
* 应该避免在块级作用域内声明函数。如确实需要，也应该写成函数表达式，而不是函数声明语句。
```js
// 声明
{
  let a = 'secret'
  function f(){
    return a
  }
  coonsole.log(f()) // 'secret'
}
// 表达式
{
  let a = 'secret'
  let f = function(){
    return a
  }
  console.log(f()) // 'secret'
}
```

4.`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

5. 变量声明方法
  
* ES5 ： var、function
* ES6：var、function、let、const、import、class