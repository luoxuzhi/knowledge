## 8.对象的扩展

1.ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。

2.`Object.is()`

ES5比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与**严格比较运算符（===）的行为基本一致**。

3.`Object.assign()`

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象。

注意:**如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**。


Object.assign方法有很多用处。
（1）为对象添加属性
（2）为对象添加方法
```js
Object.assign(Someclass.prototype,{
  methodName(arg1,arg2){...}
})

Someclass.prototype.methodName() = function (arg1,arg2) {}
```

（3）合并多个对象,将多个对象合并到某个对象。
```js
const merge = (...source) => Object.assign({},...source)
```

（4）为属性指定默认值

4.属性的可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

描述对象的`enumerable`属性，称为”可枚举性“，如果该属性为`false`，就表示某些操作会忽略当前属性。
有4个操作会忽略`enumerable`为`false`的属性。

* `for...in`循环：只遍历对象自身的和继承的可枚举的属性
* `Object.keys()`：返回对象自身的所有可枚举的属性的键名(用法：把要操作都对象放到`keys`的括号里面)
* `JSON.stringify()`：只串行化对象自身的可枚举的属性
* `Object.assign()`: 只拷贝对象自身的可枚举的属性。