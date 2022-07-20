## 11. this 汇总

<img :src="$withBase('/assets/this.png')">

#### 1. this 到底指向谁？

调用函数会创建新的属于函数自身的执行上下文。执行上下文的调用创建阶段会决定 this 的指向。因此，
this 的指向，是在调用函数时根据执行上下文所动态确定的。具体环节和规则，大概有以下几条规律：

- 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下 this 绑定到 undefined，否则绑定到全局对象 window／global；
- 一般构造函数 new 调用，绑定到新创建的对象上；
- 一般由 call/apply/bind 方法显式调用，绑定到指定参数的对象上；
- 一般由上下文对象调用，绑定在该对象上；
- 箭头函数中，根据外层上下文绑定的 this 决定 this 指向。

#### 2. 全局环境中的 this

这种情况相对简单直接，函数在浏览器全局环境中被简单调用，

```js
function f1() {
  console.log(this)
}
function f2() {
  'use strict'
  console.log(this)
}
f1() // window
f2() // undefined
// 非严格模式下 this 指向 window；在 use strict 指明严格模式的情况下就是 undefined。

const foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  },
}
var fn1 = foo.fn
fn1() // window undefined,这里 this 指向的是 window。虽然 fn 函数在 foo 对象中作为方法被引用，
//但是在赋值给 fn1 之后，fn1 的执行仍然是在 window 的全局环境中。因此输出 window 和 undefined

const foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  },
}
foo.fn() // {bar: 10, fn: ƒ} 10
// 因为这个时候 this 指向的是最后调用它的对象，在 foo.fn() 语句中 this 指向 foo 对象。在执行函数时，
// 如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。
```

#### 3. 上下文对象调用中的 this

如上结论，面对下题时我们便不再困惑：

```js
const student = {
  name: 'Lucas',
  fn: function() {
    return this
  },
}
console.log(student.fn() === student) // true

const person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function() {
      return this.name
    },
  },
}
console.log(person.brother.fn())
// Mike,在这种嵌套的关系中，this 指向 最后 调用它的对象，因此输出的是：Mike。

const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  },
}
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn()
  },
}
const o3 = {
  text: 'o3',
  fn: function() {
    var fn = o1.fn
    return fn()
  },
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1  最终还是调用 o1.fn()，因此答案仍然是 o1。
console.log(o3.fn()) // undefined ,进行 var fn = o1.fn 赋值之后，是“裸奔”调用，
// 因此这里的 this 指向 window，答案是 undefined。

//如果需要让console.log(o2.fn())输出 o2，可做以下改造

const o2 = {
  text: 'o2',
  fn: o1.fn,
}
console.log(o2.fn()) // o2
```

#### 4. bind/call/apply 改变 this 指向

都是用来改变相关函数 this 指向的，但是 call/apply 是直接进行相关函数调用；bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，开发者需要手动调用即可。

```js
const foo = {
  name: 'lucas',
  logName: function() {
    console.log(this.name)
  },
}
const bar = {
  name: 'mike',
}
console.log(foo.logName.call(bar)) //mike
```

#### 5. 构造函数和 this

new 操作符调用构造函数，具体做了什么？ ：

- 创建一个新的对象；
- 将构造函数的 this 指向这个新对象；
- 为这个对象添加属性、方法等；
- 最终返回新对象。

如果在构造函数中出现了显式 return 的情况，那么需要注意分为两种场景：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。

```js
function Foo() {
  this.user = 'Lucas'
  const o = {}
  return o
}
const instance = new Foo()
console.log(instance.user) //
// 将会输出 undefined，此时 instance 是返回的空对象 o,o没有user属性。
function Foo() {
  this.user = 'Lucas'
  return 1
}
const instance = new Foo()
console.log(instance.user) // Lucas
```

#### 6.箭头函数中的 this 指向

箭头函数使用 this 不适用以上标准规则，而是根据外层（函数或者全局）上下文来决定。

```js
const foo = {
  fn: function() {
    setTimeout(function name() {
      console.log(this)
    })
  },
}
console.log(foo.fn())
//this 出现在 setTimeout() 中的匿名函数里，因此 this 指向 window 对象。
// 如果需要 this 指向 foo 这个 object 对象，可以巧用箭头函数解决：
const foo = {
  fn: function() {
    setTimeout(() => {
      console.log(this)
    })
  },
}
console.log(foo.fn()) // {fn: ƒ}
```

#### 7. this 的优先级相关

```js
function foo(a) {
  console.log(this.a)
}
const obj1 = {
  a: 1,
  foo: foo,
}
const obj2 = {
  a: 2,
  foo: foo,
}
obj1.foo.call(obj2)
obj2.foo.call(obj1)
// 输出分别为 2、1，也就是说 call、apply 的显式绑定一般来说优先级更高。

function foo(a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2
// 上述代码通过 bind，将 bar 函数中的 this 绑定为 obj1 对象。执行 bar(2) 后，obj1.a 值为 2。
// 即经过 bar(2) 执行后，obj1 对象为：{a: 2}。

var baz = new bar(3)
console.log(baz.a) // 3
// 当再使用 bar 作为构造函数时：将会输出 3。 bar 函数本身是通过 bind 方法构造的函数，其内部已
// 经对将 this 绑定为 obj1，它再作为构造函数，通过new 调用时，返回的实例已经与 obj1 解绑。
// 也就是说：new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高。

function foo() {
  return a => {
    console.log(this.a)
  }
}
const obj1 = { a: 2 }
const obj2 = { a: 3 }
const bar = foo.call(obj1)
console.log(bar.call(obj2)) //2
//由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）的 this
// 也会绑定到 obj1，箭头函数的绑定无法被修改。

// 如果将 foo 完全写成箭头函数的形式：
var a = 123
const foo = () => a => {
  console.log(this.a)
}
const obj1 = { a: 2 }
const obj2 = { a: 3 }
var bar = foo.call(obj1)
console.log(bar.call(obj2)) // 123

// 用const定义a变量
const a = 123
const foo = () => a => {
  console.log(this.a)
}
const obj1 = { a: 2 }
const obj2 = { a: 3 }
var bar = foo.call(obj1)
console.log(bar.call(obj2)) // undefined
// 使用 const/let 声明的变量不会挂载到 window 全局对象当中。
// 因此 this 指向 window 时找不到 a 变量。
```
