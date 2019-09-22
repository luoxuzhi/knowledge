## 14.Iterator和for...of循环

1.`Iterator`（遍历器）的作用

* 为各种数据结构，提供一个统一的、简便的访问接口
* 使得数据结构的成员能够按某种次序排列
* 创造新的遍历命令`for...of`循环，Iterator接口主要供`for...of`消费

在ES6中，有三类数据结构原生具备Iterator接口：`数组、某些类似数组的对象（如字符串）、Set和Map结构`。

2.调用`Iterator`接口的场合

* 解构赋值：对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。
* 扩展运算符：扩展运算符（...）也会调用默认的iterator接口。
```js
let [first,...last] = new Set().add('a').add('b').add('c')
console.log(last) // [b,c]
```
* yield*：yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
* 其他场合：数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。如：
`for...of,Array.from(),Map(), Set(), WeakMap(), WeakSet(),Promise.all(),Promise.race()`

3.遍历器对象的`return()，throw()`

`return`方法的使用场合:如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句或`continue`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法。

4.`for...of`循环

`for...of`循环可以使用的范围包括`数组、Set 和 Map 结构、某些类似数组的对象`（比如arguments对象、DOM NodeList 对象、字符串）、后文的 Generator 对象。

5.`for...in`与`for...of`的区别

* `for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。
* `for...of`不同用于`forEach`方法，它可以与`break、continue`和`return`配合使用。
```js
let one = [1,2,3,4,5,6,7]
for (let n of one) {
  if (n>5) {
    break;
    // continue;
  }
  console.log(n)
}
```

* `for...of`提供了遍历所有数据结构的统一操作接口。
* `for...in`读取键名，`for...of`读取键值。如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法。另外要注意`forEach`的区别

```js
arr.forEach((ele,index)=>{...})
```
* es6给类通过`Object.assign`添加的方法的方法名才能被`for...in`当作键名遍历出来，如果方法直接写在Class里面不能被`for...in`遍历出来，es5只能通过类似`Objec.assign`的写法添加方法（上边），右边写法的`describe()`也归属在`Person.prototype`里面。（即`class`一章第`1`大项，`class`的语法中`d`小点）

```js
// ES5
class Personone  {
  constructor(name) {
    this.name = name
  }
}
let personone = new Personone('lxz')
Object.assign(Personone.prototype,{
  describe(){console.log('find the difference')}
})
for (let key in personone) {
  console.log(key) // name describe
}

// ES6
class Personone  {
  constructor(name) {
    this.name = name
  }
  describe(){console.log('find the difference')}
}
let personone = new Personone('lxz')
for (let key in personone) {
  console.log(key) // name
}
```
