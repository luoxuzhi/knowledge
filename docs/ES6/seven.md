## 7.函数的扩展

1.函数参数的默认值

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
```js
function essix (x,y='world') {
  console.log(x,y)
}
```


2.与解构赋值默认值结合使用，参数默认值可以与解构赋值的默认值，结合起来使用。


```js
function essix ({x,y='world'}) {
  console.log(x,y)
}
essix({x:1,y:2}) //注意参数要写成对象形式！！！
```

对象结构赋值默认值的另一个例子

```js
function fetchOne (url,{body='',method='GET',headers=''}) {
  console.log(url+method)
}
// 第二个参数没有设置默认值，所以调用不能省略第二个参数
fetchOne('baidu.com',{})

//下面的写法函数参数的默认值是空对象，但是设置了对象解构赋值的默认值,函数`fetchTwo`没有第二个参数时，
//函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。推荐使用第二种写法
function fetchTwo (url,{body='',method='GET',headers=''}={}) {
  console.log(url+method)
}
fetchTwo('baidu.com')
```


3.参数默认值的位置，通常情况下，定义了默认值的参数，应该是函数的尾参数，这样在调用函数的时候才能省略参数。

4.函数的 `length` 属性，指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真。另外，函数是`length`属性，不包括`rest`参数

5.应用，利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
```js
function throwIfMissing () {
  throw new Error('Missing parametre')
}
function football (mustProvided=throwIfMissing()) {
  return mustProvided
}
football() // Error:Missing parametre
```


6.rest参数

ES6 引入 rest 参数（形式为`...varible`），用于获取函数的多余参数，这样就不需要使用`arguments`对象。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
**rest 参数之后不能再有其他参数（只能是最后一个参数），否则会报错。**

下面是一个 rest 参数代替arguments变量的例子。
```js
const sortNumbers = (...numbers) => numbers.sort()
sortNumbers(1,5,2,0) //  [0, 1, 2, 5]
```

rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是利用` rest `参数改写数组`push`方法的例子。
```js
function pushNum (array,...items) {
  return array.push(...items)
}
let a=[]
pushNum(a,1,3,4,5)
console.log(a) //[1, 3, 4, 5]
```

7.扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。应用如下:

```js
function addDemo (x,y) {
  return x + y
}
console.log(addDemo(...[3,4])) //7
```

（1）合并数组，扩展运算符提供了数组合并的新写法。
```js
let a = [1,2,3]
let b = [5,6,...a]
```

（2）与解构赋值结合，扩展运算符可以与解构赋值结合起来，用于生成数组。
```js
const [first,...last] = [1,2,3,4]
console.log(last) // [2,3,4]
```

（3）函数的返回值
JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

（4）字符串，扩展运算符还可以将字符串转为真正的数组。
```js
console.log([...'hello'])
```

（5）实现了Iterator接口的对象，任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

（6）Map和Set结构，Generator函数

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。
```js
let map = new Map([
  [1,'one'],
  [2,'two'],
  [3,'three']
])
let arrfour = [...map.keys()]
console.log(arrfour) // 1,2,3
```

**注意：`[...items]`和`...[items]`的区别，前者代表的是一个数组，后者将一个数组转为用逗号分隔的参数序列**。

8.严格模式，设定全局性的严格模式，这是合法的。

9.name 属性，函数的name属性，返回该函数的函数名。

10.箭头函数（**箭头函数的最大特点是没有自己的this**）

ES6允许使用`=>`定义函数。

箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。如下代码:
```js
let getTempItem = id => ({id:5,name:'xiaowang'})
```


箭头函数可以与变量解构、rest参数结合使用。
```js
const dealNum = (...items) => {...}
```



箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
```js
function boo () {
  setTimeout(()=>{console.log(this.id)}, 300)
}
boo.call({id:99}) //99
```

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数代替。

11.绑定 this

箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法。

函数绑定运算符是并排的两个双冒号（`::`），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

12.尾调用优化
尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数。

13.尾递归：函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

14.函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（`trailing comma`）。这样的规定使得，函数参数与数组和对象的尾逗号规则保持一致。`ES6`不允许参数后面有逗号。

