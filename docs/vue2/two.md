## 2. Class与Style绑定、条件渲染、列表渲染

1. 绑定`class`的时候可以使用对象语法、数组语法，数组中可以包含对象，对象中不能包含数组。

三元表达式只能用在`classArray`和`styleArray`中，不能用在`classObject`和`styleObject`中。

2. 绑定`style`用对象语法
  ```js
  new Vue({
    el:'#app',
    data:{
      styleObject:{
        color:'red',
        fontSize:'14px'
      }
    }
  })
  ```
3. 条件渲染
   
`v-else`元素必须紧跟在`v-if`或者 `v-else-if`元素的后面——否则它将不会被识别。

另一个用于根据条件展示元素的选项是`v-show`指令，带有`v-show`的元素始终会被渲染并保留在 DOM 中，`v-show`是简单地切换元素的`CSS`属性 `display` 。

:::warning 注意：
`v-show`不支持 `<template>`语法，也不支持`v-else`。
如果需要非常频繁地切换，则使用`v-show`较好；如果在运行时条件不太可能改变，则使用`v-if`。
:::

用`key`管理可复用的元素

`v-if`会使组件重走生命周期，`v-show`则不会让组件重走生命周期。

4. 列表渲染
   
`v-for` 指令需要以 `item in items` 形式的特殊语法， `items`是源数据数组并且`item`是数组元素迭代的别名。

```html
 <div v-for="item in items">{{ item }}</div>
 <div v-for="item of items">{{ item }}</div>
```

对象的、整数的`v-for`：
```html
<li v-for="(val,key,index) in obj">{{val}}{{key}}{{index}}</li>
<li v-for="item in 5">{{item}}</li>
```
`组件标签、template标签也可以用v-for`

5. 数组更新检测（变异方法`mutation method`，顾名思义，会改变被这些方法调用的原始数组。）

`push` 、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`

push()、reverse()

pop() 删除最后一个

shift()     shift方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

unshift()    unshift方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

splice()  splice方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。灵活运用：可以用这个方法直接替换数组中的某元素，即传入第三个参数

sort() sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。


6. splice的灵活运用
由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如： `vm.items[indexOfItem] = newValue`

当你修改数组的长度时，例如： `vm.items.length = newLength`

为了解决第一类问题，可以用以下方式实现：`vm.items.splice(indexOfItem, 1, newValue)`