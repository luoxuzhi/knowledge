## 8.console对象

1.console对象的方法

console对象提供的各种方法，用来与控制台窗口互动。`log()，info()，debug()`

`count()`count方法用于计数，输出它被调用了多少次。

`assert()` 

assert方法接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。

`time()`

timeEnd()这两个方法用于计时，可以算出一个操作所花费的准确时间。操作方法被这两个方法包裹

`profile()、profileEnd()`  

console.profile方法用来新建一个性能测试器（profile），它的参数是性能测试器的名字。

2.console.log方法支持以下占位符，不同格式的数据必须使用对应格式的占位符。占位符写在第一个参数里面。

`%s` 字符串

`%d` 整数

`%i` 整数

`%f` 浮点数

`%o` 对象的链接

`%c` CSS格式字符串

3.debugger语句

debugger语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。如果没有除错工具，debugger语句不会产生任何结果，JavaScript引擎自动跳过这一句。

4.属性描述对象
```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```
`enumerable`默认为`true`，如果设为`false`，会使某些操作（`for...in`循环、`Object.keys()`）跳过该属性

`Object.defineProperty`方法和`Object.defineProperties`方法，都有性能损耗，会拖慢执行速度，不宜大量使用。