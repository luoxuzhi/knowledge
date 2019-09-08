## 6.Date对象

1.概述

`Date`对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。ES6规定凡是没有指定时区的日期字符串，一律认定用户处于本地时区。
对于`YYYY-MM-DD`形式的字符串，JavaScript引擎可能会将其当作ISO格式来解析，采用格林尼治时区作为计时标准；而对于其他格式的日期字符串，一律视为`非ISO`格式，采用本地时区作为计时标准。


2.Date对象的静态方法

`Date.now()` 

Date.now方法返回当前距离1970年1月1日 00:00:00 UTC的毫秒数（Unix时间戳乘以1000）。

`Date.parse()` 

Date.parse方法用来解析日期字符串，返回距离1970年1月1日 00:00:00的毫秒数。

`Date.UTC()` 

该方法接受年、月、日等变量作为参数，返回当前距离1970年1月1日 00:00:00 UTC的毫秒数。

3.Date实例对象的方法

* to类

`toString()/toUTCString()/toDateString()/toTimeString()/toLocaleDateString()toLocaleTimeString()/toLocaleString()/toISOString()/toJSON()`

其中`toISOString()/toJSON()`两个方法返回的结果完全一样

* get类

`getTime()`：返回距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。

`new Date().getTime()=new Date().valueOf()`

`getDate()`：返回实例对象对应每个月的几号（从1开始）。

`getDay()`：返回星期几，星期日为0，星期一为1，以此类推。

`getYear()`：返回距离1900的年数。

`getFullYear()`：返回四位的年份。

`getMonth()`：返回月份（0表示1月，11表示12月）。

`getHours()`：返回小时（0-23）。

`getMilliseconds()`：返回毫秒（0-999）。

`getMinutes()`：返回分钟（0-59）。

`getSeconds()`：返回秒（0-59）。

`getTimezoneOffset()`：返回当前时间与UTC的时区差异，以分钟表示，返回结果考虑到了夏令时因素

* set类

`setDate(date)`：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。

`setYear(year): 设置距离1900年的年数。

`setFullYear(year [, month, date])`：设置四位年份。

`setHours(hour [, min, sec, ms])`：设置小时（0-23）。

`setMilliseconds()`：设置毫秒（0-999）。

`setMinutes(min [, sec, ms])`：设置分钟（0-59）。

`setMonth(month [, date])`：设置月份（0-11）。

`setSeconds(sec [, ms])`：设置秒（0-59）。

`setTime(milliseconds)`：设置毫秒时间戳。

//设置时间4种方法： 
```js
var aa=new Date(2017,05,08,16,20);//数字串
var bb=new Date(1496909106397);//毫秒数
var cc=new Date("2017-06-08 16:20:00");//字符串1
var dd=new Date("2017/06/08 16:20:00");//字符串2
```
