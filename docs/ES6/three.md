## 3.字符串扩展

1.字符串在遍历接口 for ...of 循环
```js
for (let code of 'foot') {
  console.log(code)
}
```

2.at()

ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
```js
let t = 'abc'
console.log(t.charAt(2)) //'c'
```


3.includes(), startsWith(), endsWith()

传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。这三个方法都支持第二个参数，表示开始搜索的位置。推荐使用`includes`

```js
let s = 'hello world'
console.log(s.startsWith('world',6)) // true
```


4.repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次。

5.模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

模板字符串中嵌入变量，需要将变量名写在${}之中。模版字符串可以嵌套使用

```js
let name = 'blob',time='today'
console.log(`\`hello ${name},how are you ${time}\``)//`hello blob,how are you today`
```

6.padStart/padEnd 

用于补全格式、提示字符串格式