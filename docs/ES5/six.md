## 6.Date 对象

1.概述

`Date`对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。ES6 规定凡是没有指定时区的日期字符串，一律认定用户处于本地时区。
对于`YYYY-MM-DD`形式的字符串，JavaScript 引擎可能会将其当作 ISO 格式来解析，采用格林尼治时区作为计时标准；而对于其他格式的日期字符串，一律视为`非ISO`格式，采用本地时区作为计时标准。

2.Date 对象的静态方法

`Date.now()`

Date.now 方法返回当前距离 1970 年 1 月 1 日 00:00:00 UTC 的毫秒数（Unix 时间戳乘以 1000）。

`Date.parse()`

Date.parse 方法用来解析日期字符串，返回距离 1970 年 1 月 1 日 00:00:00 的毫秒数。

`Date.UTC()`

该方法接受年、月、日等变量作为参数，返回当前距离 1970 年 1 月 1 日 00:00:00 UTC 的毫秒数。

3.Date 实例对象的方法

- to 类

`toString()/toUTCString()/toDateString()/toTimeString()/toLocaleDateString()toLocaleTimeString()/toLocaleString()/toISOString()/toJSON()`

其中`toISOString()/toJSON()`两个方法返回的结果完全一样

- get 类

`getTime()`：返回距离 1970 年 1 月 1 日 00:00:00 的毫秒数，等同于 valueOf 方法。

`new Date().getTime()=new Date().valueOf()`

`getDate()`：返回实例对象对应每个月的几号（从 1 开始）。

`getDay()`：返回星期几，星期日为 0，星期一为 1，以此类推。

`getYear()`：返回距离 1900 的年数。

`getFullYear()`：返回四位的年份。

`getMonth()`：返回月份（0 表示 1 月，11 表示 12 月）。

`getHours()`：返回小时（0-23）。

`getMilliseconds()`：返回毫秒（0-999）。

`getMinutes()`：返回分钟（0-59）。

`getSeconds()`：返回秒（0-59）。

`getTimezoneOffset()`：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素

- set 类

`setDate(date)`：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。

`setYear(year): 设置距离 1900 年的年数。

`setFullYear(year [, month, date])`：设置四位年份。

`setHours(hour [, min, sec, ms])`：设置小时（0-23）。

`setMilliseconds()`：设置毫秒（0-999）。

`setMinutes(min [, sec, ms])`：设置分钟（0-59）。

`setMonth(month [, date])`：设置月份（0-11）。

`setSeconds(sec [, ms])`：设置秒（0-59）。

`setTime(milliseconds)`：设置毫秒时间戳。

//设置时间 4 种方法：

```js
var aa = new Date(2017, 05, 08, 16, 20) //数字串
var bb = new Date(1496909106397) //毫秒数
var cc = new Date('2017-06-08 16:20:00') //字符串1
var dd = new Date('2017/06/08 16:20:00') //字符串2
```

4. 时间戳转换成特定格式日期

```js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  // 循环要用for in
  for (let k in o) {
    // 注意new RegExp通过反引号赋值的时候，反引号里面的内容要用小括号
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substring(str.length)
}
```
