## 9.Symbol

1.ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：`Undefined`、`Null`、布尔值（`Boolean`）、字符串（`String`）、数值（`Number`）、对象（`Object`）。

2.作为属性名的Symbol

Symbol函数前不能使用new命令，否则会报错。Symbol函数可以接受一个字符串作为参数
```js
let sl = Symbol('foo')
console.log(sl) // Symbol(foo)
```

Symbol值不能与其他类型的值进行运算，会报错。但是，Symbol值可以显式转为字符串。

```js
let sl = Symbol('foo')
console.log(sl.toString()) // Symbol(foo)
```

Symbol值也可以转为布尔值，但是不能转为数值。
```js
let sym = Symbol()
console.log(Boolean(sym)) // true
console.log(!sym) // false
```

Symbol值作为对象属性名时，不能用点运算符。在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。

```js
let s = Symbol()
let obj = {
  // 属性名要用方括号
  [s]:(arg) => {...} 
}
obj[s](123) // 引用属性名要用方括号
```
**Symbol类型还可以用于定义一组常量，保证这组常量的值都不相等**。常量使用Symbol值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。
Symbol值作为属性名时，该属性还是公开属性，不是私有属性。

3.消除魔术字符串

4.属性名的遍历

Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。用`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有 `Symbol `属性名。

**`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名**。
```js
let obj = {}
let foo = Symbol('foo')
Object.defineProperty(obj, foo, {value:'footer'})

for (let i in obj) {
  console.log(i) // 无输出
}
let one = Object.getOwnPropertyNames(obj)
console.log(one) // []
let two = Object.getOwnPropertySymbols(obj)
console.log(two) // [Symbol(foo)]
let three = Reflect.ownKeys(obj)
console.log(three) // [Symbol(foo)]
```


5.Symbol.for()，Symbol.keyFor()

Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，调用Symbol.for("cat")30次，每次都会返回同一个 Symbol 值，调用Symbol("cat")30次，会返回30个不同的Symbol值。

Symbol.keyFor方法返回一个已登记的 Symbol 类型值(即用Symbol.for()方法产生的值)的key。

```js
let four = Symbol.for('four')
console.log(Symbol.keyFor(four)) // four

let five = Symbol('five')
console.log(Symbol.keyFor(five)) // undefined
```


6.内置的Symbol值

除了自定义使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。

`Symbol`对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。

