## 5.RegExp对象

1.使用

正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，它有两种表达方法。一种是使用字面量，以斜杠表示开始和结束,另一种是使用RegExp构造函数。一般使用第一种方法。

```js
let regex = /xyz/
let regex = new RegExp(/xyz/,'1')
```

正则对象生成以后，有两种使用方式：

正则对象的方法：将字符串作为参数，比如`regex.test(string)`。

字符串对象的方法：将正则对象作为参数，比如`string.match(regex)`。

2.正则对象的属性和方法

属性：

`ignoreCase`：返回一个布尔值，表示是否设置了i修饰符，该属性只读。

`global`：返回一个布尔值，表示是否设置了g修饰符，该属性只读。

`multiline`：返回一个布尔值，表示是否设置了m修饰符，该属性只读。

`lastIndex`：返回下一次开始搜索的位置。该属性可读写，但是只在设置了g修饰符时有意义。

`source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

方法：

`test()` 该方法返回一个布尔值，表示当前模式是否能匹配参数字符串。

`exec()` 返回匹配结果。如果发现匹配返回一个数组，成员是每个匹配成功的子字符串，否则返回`null`。

`compile()` 更改同变量名的正则规则

3.元字符

（1）点字符（.)

点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符。

（2）位置字符：位置字符用来提示字符所处的位置，主要有两个字符。^ 、$

（3）选择符（|）：竖线符号（|）在正则表达式中表示“或关系”（OR），它要包含在小括号（）里面

（4）

正则模式中，需要用斜杠转义的，一共有12个字符：^、.、[、$、(、)、|、*、+、?、{和\\。需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。

（5）注意取反 ^和[]要同时出现，即[^a]

（6） 

贪婪模式 （尽可能多的匹配）

'123456789'.match(/\d{3,5}/g)      ["12345", "6789"]

非贪婪模式

'123456789'.match(/\d{3,5}?/g)  量词后面加上？ ["123", "456", "789"]  

（7）忽略分组，加上？：

（？：xx）（）

（8）前瞻

```js
// 正向前瞻 exp(?=assert)
// 负向前瞻 exp(?!assert)
```


（9）lastIndex指向当前最后一个匹配字符的索引+1，因为这个原因，使用test方法的时候尽量不要加g，否则可能得出不同的结果

（10） 正则非全局匹配结果返回的是一个数组，数组第一个元素是匹配表达式的元素，其它为子匹配元素

4.预定义模式：预定义模式指的是某些常见模式的简写方式。

`\d` 匹配0-9之间的任一数字，相当于[0-9]。

`\D` 匹配所有0-9以外的字符，相当于[^0-9]。

`\w` 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。

`\W` 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。

`\s` 匹配空格（包括制表符、空格符、断行符等），相等于[\t\r\n\v\f]。

`\S` 匹配非空格的字符，相当于[^\t\r\n\v\f]。

`\b` 匹配词的边界。

`\B` 匹配非词边界，即在词的内部。

`{n}`重复多少次,{n,}最少n次，{0，n}最多n次

5.量词符：量词符用来设定某个模式出现的次数。

* `? `问号表示某个模式出现0次或1次，等同于{0, 1}。

* `*`星号表示某个模式出现0次或多次，等同于{0,}。

* `+`加号表示某个模式出现1次或多次，等同于{1,}。

6.正则的反向调用：
* replace反向调用直接用$1 ，如replace的第二个参数可以是一个function，function参数的含义如下
<img :src="$withBase('/assets/regexp.png')">

```js
// no group
'adkdk4'.replace(/\d/g,function($1,$2,$3,$4){
  console.log($1) // 4
  console.log($2) // undefined
  console.log($3) // 5
  console.log($4) // adkdk4
  return $1+$2+$3+$4 
})

//group
'adkdk4'.replace(/(\d)/g,function($1,$2,$3,$4){
  console.log($1) // 4
  console.log($2) // 4
  console.log($3) // 5
  console.log($4) // adkdk4
  return $1+$2+$3+$4 
})
```


* `test`方法中的反响调用用`RegExp.$1`
```js
export function formatDate (date,fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substring(4-RegExp.$1.length))
  }
  let o={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }
  // 循环要用for in
  for (let k in o) {
    // 注意new RegExp通过反引号赋值的时候，反引号里面的内容要用小括号
    if (new RegExp(`(${k})`).test(fmt)) {
      let str=o[k]+''
      fmt=fmt.replace(RegExp.$1, (RegExp.$1.length===1?str:padLeftZero(str)))
    }
  }
  return fmt
}
```

7.正则帮助网站 [https://regexper.com/](https://regexper.com/)

