## 10.set和map数据结构

1.Set

`Set`类似于数组，但是成员的值都是唯一的。Set 本身是一个构造函数，用来生成 Set 数据结构。
以下是一种去除数组重复成员的方法。
```js
console.log(new Set([1,2,3,4,3]))
```

向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。**需要注意的是在Set内部，两个NaN是相等，两个对象(无论是否为空)总是不相等的**。

2.Set实例的属性和方法

Set结构的实例有以下属性：`constructor、size`，`size`等同于数组的`length`

Set实例的方法分为两大类：操作方法和遍历方法。
* 操作方法：`add(value)、delete(value)、has(value)、clear()`
* 遍历方法:  `keys()、values()、entries()、forEach()`，其中forEach()可以写成箭头函数

Array.from方法可以将Set结构转为数组并去重

```js
let setarray = array => {
  return Array.from(new Set(array))
}
setarray([2,2,3,3,4,4]) // [2,3,4]
```

3.Map

需要“键值对”的数据结构，`Map`比`Object`更合适。
Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
只有对同一个对象的引用，Map结构才将其视为同一个键。扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

4.Map的实例属性和操作方法

* 操作方法：`size、set(key, value)、get(key)、has(key)、delete(key)、clear()`，**set方法返回的是Map本身**，因此可以采用链式写法，`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。
```js
let m = new Map().set('edition',6).set(262,'standard')
console.log(m.get(262))// standard
```

* 遍历方法:  `keys()、values()、entries()、forEach()`,Map的遍历顺序就是插入顺序。
新建map的方法如下：

```js
let m = new Map().set('edition',6).set(262,'standard')
let n = new Map([
  ['F','no'],
  ['T','yes']
])
```

5.WeakMap

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。WeakMap结构有助于防止内存泄漏。
WeakMap与Map在API上的区别主要是：WeakMap只有四个方法可用`get()、set()、has()、delete()`

WeakMap应用的典型场合就是DOM节点作为键名。

WeakMap 的另一个用处是部署私有属性。

6.`WeakSet` 只能添加对象，不能是其他都值，没有遍历` size clear`
