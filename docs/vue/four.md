## 4.表单控件绑定

1.v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

2.文本

```html
<div id="example">
  <input v-model="inputValue" type="text">
</div>
```

3.`select>option`列表的默认选项，在该选项的属性里面加上`selected`即可，不过在 Vue 中不能使用这种写法，否则编译失败，报错误为`inline selected attributes on <option> will be ignored when using v-model. Declare initial values in the component's data option instead.`

```html
<div id="example">
  <select name="" id="" v-model="defaultSelcet">
    <option value="1">01</option>
    <option value="2">02</option>
    <option value="3" selected>03</option> // selected used in here is not supported
  </select>
  <p>select value is: {{ defaultSelect }}</p>
</div>
```
```js
new Vue({
  el:'#example',
  data:{
    defaultSelect:'3'
  }
})
```
4.对于单选按钮，勾选框及选择列表选项， v-model 绑定的 `value` 通常是静态字符串（对于勾选框是逻辑值）。

```html
<div id="example">
  <input type="checkbox" :true-value="a" :false-value="b" v-model="toggle">
  <span>the choose value is:{{ toggle }}</span>
</div>
```
```js
new Vue({
  el:'#example',
  data:{ toggle:'a' }
})
```

5. 修饰符

在默认情况下， `v-model`在`input`事件中同步输入框的值与数据 (除了 上述 IME 部分)，可以添加一个修饰符 `.lazy` ，从而转变为在`change`事件中同步，在以下例子中输入框输入的值在按`enter`确认之后输出的值才会和输入值同步，如果没有`.lazy`,输入和输出同步。

`trim`自动过滤用户输入的首尾空格

`number`通常和`type="number"`组合使用


```html
<div id="example">
  <input type="text" v-model.lazy.trim="valueWithLazy">
  <input type="number" v-model.number="valueWithNumber">
</div>
```