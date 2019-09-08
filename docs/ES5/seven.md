## 7.JSON对象


1.规则

* 对象的键名必须放在双引号里面。
* 数组或对象最后一个成员的后面，不能加逗号。
* 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

2.JSON对象的两个处理方法：`JSON.stringify()、JSON.parse()`

* `JSON.stringify`方法用于将一个值转为JSON字符串。该字符串符合 JSON 格式，并且可以被`JSON.parse`方法还原。

```js
console.log(JSON.parse(JSON.stringify('ABC')))
```
`JSON.stringify`方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。

```js
let obj = {
  prop1:'value1',
  prop2:'value2',
  prop3:'value3'
}
let selectProperties = ['prop1','prop2']
console.log(JSON.stringify(obj,selectProperties)) //{"prop1":"value1","prop2":"value2"}
```



* `JSON.parse()`:`JSON.parse`方法用于将JSON字符串转化成对象。

3.toJSON 方法

如果`JSON.stringify`的参数对象有自定义的`toJSON`方法，那么`JSON.stringify`会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

```js
let user = {
  firstName:'san',
  lastName:'zhang',
  get:function(){
    return this.firstName + this.lastName
  },
  toJSON:function(){
    var data = {
      firstName:this.fistName,
      lastName:this.lastName
    }
    return data
  }
}
console.log(JSON.stringify(user)) // {"firstName":'san',"lastName":"zhang"}
```