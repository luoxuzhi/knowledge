## 2.数组

1.Array实例的方法

`valueOf()` 返回数组本身。

`toString()` 返回数组的字符串形式。

`push()` 在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。该方法会改变原数组。

`pop()`   pop方法用于删除数组的最后一个元素,并返回该元素。注意，该方法会改变原数组。

`join()`   以参数作为分隔符

`concat()`  concat方法用于多个数组的合并  array.concat(arrayb,arrayc)

`shift()`     shift方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

`unshift()`   unshift方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

`reverse()`    reverse方法用于颠倒数组中元素的顺序,该方法会改变原数组，即原数组顺序颠倒

`slice()`   slice方法用于提取原数组的一部分，返回一个新数组，原数组不变，参数为0开始算起的索引，新数组`包括开头不包括结尾`

`splice()` splice方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。`灵活运用：可以用这个方法直接替换数组中的某元素`

`sort()`  sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

`filter()`  返回新数组，不改变原来的数组，会遍历整个数组并且可能返回多个值

`map()`  map方法对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。map方法不仅可以用于数组，还可以用于字符串，用来遍历字符串的每个字符。但是，不能直接使用，而要通过函数的call方法间接使用，跳过数组的空位

`forEach()`  forEach方法一般不返回值，只用来操作数据。如果需要有返回值，一般使用map方法，跳过数组的空位


`find()`返回查找到的第一个元素后立即中断遍历，只返回一个值

`some()`，`every()`   这两个方法类似“断言”（assert），用来判断数组成员是否符合某种条件。some方法是只要有一个数组成员的返回值是true，则整个some方法的返回值就是true，否则false。every方法则是所有数组成员的返回值都是true，才返回true，否则false。

```js
let arr = [2,3,4]
arr.some(item=>item>5) // false
arr.every(item=>item>1) // true
```


`indexOf()`   indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

`lastIndexOf()` lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

`reduce()，reduceRight() `reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。reduce接收第二个参数，第二个参数为累计值的初始值，如
```js
let arr = [2,3,4]
let result = arr.reduce((current,prev)=>{return current*prev},4)
console.log(result) // 96 即4*2*3*4
```

2.链式使用数组的方法

```js
let users = [
  {name:'tom',email:'tom@example.com'},
  {name:'perter',email:'perter@example.com'}
]

users.map(user => {
  return user.email
}).filter(email => {
  return /^t/.test(email)
}).forEach(console.log)  // tom@example.com
```

3.变异方法

`pop、push、shift、unshift、reverse、sort、splice`都是变异方法，会改变原数组

`filter()、 concat()、 slice() 、map()`为非变异(non-mutating method)方法。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

