## 4.Number、Math、String

1.Number对象的属性

`Number.POSITIVE_INFINITY`：正的无限，指向Infinity。

`Number.NEGATIVE_INFINITY`：负的无限，指向-Infinity。

`Number.NaN`：表示非数值，指向NaN。

`Number.MAX_VALUE`：表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。

`Number.MIN_VALUE`：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。

`Number.MAX_SAFE_INTEGER`：表示能够精确表示的最大整数，即9007199254740991。

`Number.MIN_SAFE_INTEGER`：表示能够精确表示的最小整数，即-9007199254740991。

2.Number()对象实例的方法

`toSting()`、讲数字转变成字符串形式显示 `8+''= 8.toString()`

`toFixed()`方法用于将一个数四舍五入转为指定位数的小数，返回这个小数对应的字符串。

`toExponential()`方法用于将一个数转为科学计数法形式。

`oPrecision()`方法用于将一个数转为指定位数的有效数字。

Number 实例方法的封装

```js
Number.prototype.add = function(){
  let result = []
  for (var i = 0;i < 8; i++){
    reuslt.push(i)
  }
  return result
}

console.log(8.add())
```

3.Math对象的属性

Math是JavaScript的内置对象，提供一系列数学常数和数学方法。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。Math对象提供以下一些只读的数学常数。

`Math.E`：常数e。

`Math.LN2`：2的自然对数。

`Math.LN10`：10的自然对数。

`Math.LOG2E`：以2为底的e的对数。

`Math.LOG10E`：以10为底的e的对数。

`Math.PI`：常数Pi。

`Math.SQRT1_2`：0.5的平方根。

`Math.SQRT2`：2的平方根。

4.Math对象的方法

`Math.abs()`：绝对值

`Math.ceil()`：向上取整，Math.ceil方法接受一个参数，返回大于该参数的最小整数。

`Math.floor()`：向下取整，Math.floor方法接受一个参数，返回小于该参数的最大整数。

`Math.max()`：最大值

`Math.min()`：最小值

`Math.pow()`：指数运算

`Math.sqrt()`：平方根

`Math.log()`：自然对数

`Math.exp()`：e的指数

`Math.round()`：四舍五入  注意Math.round(-1.5) //-1  Math.round(0.5) // 1

`Math.random()`：随机数，Math.random()返回0到1之间的一个伪随机数，`可能等于0，但是一定小于1`

// 三角函数方法

`Math.sin()`：返回参数的正弦

`Math.cos()`：返回参数的余弦

`Math.tan()`：返回参数的正切

`Math.asin()`：返回参数的反正弦（弧度值）

`Math.atan()`：返回参数的反正切（弧度值）

5.String 实例对象的属性和方法

length属性

`charAt()`方法返回指定位置的字符，参数是从0开始编号的位置。

charCodeAt()

`concat()`concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。

`slice()` slice方法用于从原字符串取出子字符串并返回，不改变原字符串，类似数组的slice方法，新字符串包括开头不包括结尾

`substring()`  优先使用slice(),两个参数分别是起始和结束位置,新字符串包括开头不包括结尾

`substr()`substr方法用于从原字符串取出子字符串并返回，不改变原字符串。substr方法的第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。

`indexOf()`   indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1,同数组

`lastIndexOf()` lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1，同数组

`trim()` trim方法用于去除字符串两端的空格，返回一个新字符串，`不改变原字符串`。该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。

`toLowerCase()，toUpperCase()` toLowerCase方法用于将一个字符串全部转为小写，toUpperCase则是全部转为大写。它们都返回一个新字符串，不改变原字符串。

`localeCompare()` localeCompare方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

`match()`  match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。返回数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。

`search() search方法的用法等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1 

`replace()`  用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）

`split()`  split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

`match、replace、search、split`参数都可以是正则表达式