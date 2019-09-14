## 6.数组的扩展

1.Array.from()

* `Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（*包括ES6新增的数据结构Set和Map*）。

```js
let arrayLike = {
  0:'a',
  1:'b',
  2:'c'
  length:3
}
let arr2 = Array.from(arrayLike)
console.log(arr2) // ['a','b','c']

let newSet = new Set(['a','b'])
console.log(Array.from(newSet)) // ["a", "b"]
```

常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的`arguments`对象。
`Array.from`都可以将它们转为真正的数组。

```js
let parray = document.querySelector('p')
Array.from(parray).forEach(p=>console.log(p))
```

* `Array.from`还可以接受**第二个参数，作用类似于数组的map方法，用来对每个元素进行处理**，将处理后的值放入返回的数组。

```js
let parray = [1,2,3]
console.log(Array.from(parray,x=>x*x)) // [1,4,9]
console.log(Array.from(parray).map(x=>x*x)) // [1,4,9]
```


* `Array.from`的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。

2.Array.of()

Array.of方法用于将一组值，转换为数组。Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载，它的行为非常统一。

3.Array.prototype.copyWithin()

数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。下面代码表示将从4号位直到数组结束的成员（5），复制到从0号位开始的位置，结果覆盖了原来的1。
Array.prototype.copyWithin(target, start = 0, end = this.length)它接受三个参数。

target（必需）：从该位置开始替换数据。

start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。

end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
let another = [1,2,3,4,5]
console.log(another.copyWithin(0,4)) // [5,2,3,4,5]
```


4.Array.prototype.find()、Array.prototype.findIndex()

`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。


`findIndex`方法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1，indexOf找不到符合在值也返回-1。这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。**这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足**。

```js
let another = [1,2,3,4,5]
console.log(another.findIndex((n)=>{return n>1}))// 1

console.log([NaN].indexOf(NaN)) // -1
console.log([NaN].findIndex(y=>Object.is(NaN,y))) // 0
```


5.Array.prototype.fill()

`fill`方法使用给定值，填充一个数组。fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。


6.数组实例的entries()，keys()和values()

ES6提供三个新的方法：entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用`for...of`循环进行遍历，entries()是对键值对的遍历。**values的遍历不成功,babel的兼容性不好，推荐使用entries**

```js
let another = [1,2,3,4,5]
for (let [index,element] of another.entries()) {
  console.log(index,element)
}
```


7.Array.prototype.includes()

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。

Map和Set数据结构有一个has方法，需要注意与includes区分。

Map结构的has方法，是用来**查找键名**的，比如Map.prototype.has(key)、

Set结构的has方法，是用来**查找值**的，比如Set.prototype.has(value)、

8.数组的空位

数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。ES6则是明确将空位转为undefined。

entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。由于空位的处理规则非常不统一，所以建议避免出现空位。

9.数组的合并
```js
let a=[1,2,4]
let b = [5,6,7]
let c=a.concat(b) let c=b.concat(a)  let c=[...a,...b]
```

对象的合并
```js
let c={name:'make',age:28}
let f={...c,...{address:'heilongjiang'}}
let f=Object.assign({},c,{address:'heilongjiang'})
```

