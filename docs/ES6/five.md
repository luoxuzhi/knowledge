## 5.数值的扩展

1.二进制和八进制表示法

ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b（或0B`）和`0o（或0O）`表示。
如果要将0b和0o前缀的字符串数值转为十进制，要使用`Number`方法。

```js
console.log(Number('0o111')) // 73
```
2.Number.isFinite(), Number.isNaN()

ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。这两个新方法只对数值有效，非数值一律返回false。

`Number.isFinite()`用来检查一个数值是否为有限的（finite）。

`Number.isNaN()`用来检查一个值是否为NaN。

`Number.parseInt()`

`Number.parseFloat()`

`Number.isInteger()`用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

`Number.EPSILON`的实质是一个可以接受的误差范围。

`Number.isSafeInteger()`：JavaScript能够准确表示的整数范围在`-2^53`~`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。

`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

3.Math对象的扩展

Math.trunc()方法用于去除一个数的小数部分，返回整数部分。

Math.sign()方法用来判断一个数到底是正数、负数、还是零。它会返回五种值。参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN。Math.sign()用来判断一个值的正负，但是如果参数是-0，它会返回-0。

Math.cbrt()方法用于计算一个数的立方根。

Math.fround()方法返回一个数的单精度浮点数形式。

Math.hypot()方法返回所有参数的平方和的平方根。

4.对数方法

Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。  注意是m1不是ml

Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。

Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN。

5.指数运算符

ES2016 新增了一个指数运算符（**）。
```js
2**3 === 8 // true
```


