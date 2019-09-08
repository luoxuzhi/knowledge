## 3.对象

1.三个原生对象 Number 、String、Boolean

`Number`、`String`和`Boolean`如果不作为构造函数调用（即调用时不加`new`），常常用于将任意类型的值转为数值、字符串和布尔值。

2.包装对象实例的方法：

`valueOf()` 和`toString()`方法

3.使用双重的否运算符（!）也可以将任意值转为对应的布尔值。可以调用valueOf()方法查看以下的值
如 `console.log((!!undefined).valueOf())`
```js
!!undefined // false
!!null // false
!!0 // false
!!'' // false
!!NaN // false
!!1 // true
!!'false' // true
!![] // true
!!{} // true
!!function(){} // true
!!/foo/ // true
```

`注意Boolean作为构造函数和单独使用的区别，加new作为构造函数使用的时候即为新增一个对象。`