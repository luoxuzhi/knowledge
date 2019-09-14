## 2.解构赋值

1. 解构赋值关键：要获取数组或对象某位置的，取变量的结构要和源数据的结构一致，如:
```js
let {musicData,musicData:{interval,size320}} = item
item={a:xx,b:xx,musicData:{interval:xx,size320:xxx,thirdprop:xxx},c:xxx}
console.log(musicData)// {interval:xx,size320:xxx,thirdprop:xxx}
```
2.数组的解构赋值

`let [a, b, c] = [1, 2, 3]` 从左边开始匹配，假如右边只有两个值，则匹配为a，b，以少的一边为准

3.let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。（圆括号是赋值语句，大括号是代码块）
```js
let foot
({foot}={foot:'i am foot'})
console.log(foot)
```

3.对象的解构赋值

```js
let {foot:baz} = {foot:'aaa'}
console.log(baz) // 'aaa'
```

4.字符串的解构赋值。字符串也可以解构赋值，这是因为此时，字符串被转换成了一个类似数组的对象。
```js
let [d,e] = 'he'
console.log(e) // 'e'
```

5.数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

6.函数的参数也可以使用解构赋值。

7.圆括号的使用（**模式可以理解为对象名**）

以下三种解构赋值不得使用圆括号：

* 变量声明语句中，不能带有圆括号。
* 函数参数中，模式不能带有圆括号。
* 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号

8.用途
* 交换变量的值
* 从函数返回多个值
函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。用解构赋值，取出这些值就很方便。返回数组则新建数组，返回对象则新建对象
```js
function result () {
  return {
    firstName:'first',
    lastName:'last'
  }
}
let {firstName} = result()
console.log(firstName)
```

* 提取JSON数据,解构赋值对提取JSON对象中的数据

* 遍历Map结构
```js
var map = new Map()
map.set('first','hello')
map.set('second','world')
for(let [key,value] of map){
  console.log(key+'is'+value)
}
```
* 输入模块的指定方法