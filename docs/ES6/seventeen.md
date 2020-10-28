## 17.module 的语法

1.export 用来提供对外的接口

export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import 命令也是如此。

2.import

模块整体加载到一个对象后，要调用导入的方法必须用对象前缀加方法名，如下:

```js
import * as mod from 'lib/package'
mod.foo()
```

3.export dafault

使用 export default 时，对应的 import 语句不需要使用大括号；不使用 export default 时，对应的 import 语句需要使用大括号。

导入默认的方法可以用任意函数名，其它方法必须用对应的名称。

```js
import customName, { foo } from './module.js'
```

注意：**整体加载的\*号不包含默认方法，默认方法要另外单独导入且可以用任意方法名**

```js
import * as mod from './module.js'
import exp from './module.js'
```

4.跨模块常量

和接口一样导出的写法就可以。

5.import()

- require 是运行时加载模块，import 命令无法取代 require 的动态加载功能。
- import()类似于 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载。
- import()返回一个 Promise 对象，导入之后可以使用 then()

```js
import('./module.js').then(module=>{module.loadPage()}).catch(err=>...)
```

- import()的适用场合：按需加载、条件加载、动态的模块路径。如果模块有 default 输出接口，可以用参数`default`直接获得。

```js
// moduleA.js
export default () => {
  console.log('function default')
}
// moduleB.js
export const one = () => {
  console.log('function one')
}
export const two = () => {
  console.log('function two')
}
// index.js
import('./moduleA.js').then(ret => {
  ret.default()
})
import('./moduleB.js').then((one, tow) => {
  one()
  two()
})
```

6.编程风格

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。

模块只有一个输出值，就使用 export default，如果模块有多个输出值，就不使用 export default，不要 export default 与普通的 export 同时使用。

函数名的首字母应该小写。对象名的首字母应该大写。

7.js 模块循环引用解决方案及原理 [链接](https://www.jianshu.com/p/5006083cf3fe)

[nodejs 中相互引用（循环引用）的模块分析](https://www.cnblogs.com/surfer/p/10272756.html)

```js
// a.js
module.exports.test = 'A'
const modB = require('./b.js')
console.log('modA:', modB.test)
module.exports.test = 'AA'
```

```js
// b.js
module.exports.test = 'B'
const modA = require('./a.js')
console.log('modB:', modA.test)
module.exports.test = 'BB'
```

```js
node a.js
modB:A
modA:BB
```
