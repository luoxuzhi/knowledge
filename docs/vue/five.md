## 5.组件

1.组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以`is` 特性扩展。

2.组件注册

`Vue.component('componentname',options)`，`options`是包含`data、template、props、methods`。注册之后使用该组件的方式有两种，通过`is`属性或者以组件名为标签

```html
<div id="example">
  <my-componnet></my-componnet>
  <div is="my-component"></div>
</div>
```

通过Vue构造器传入的各种选项大多数都可以在组件里用。 `data`是一个例外，它必须是函数，并且这个函数返回的是一个对象。

3.构成组件

组件实例的作用域是孤立的。要让子组件使用父组件的数据，需要通过子组件的`props`选项。
字面`prop`，它的值是字符串 `"1"` 而不是`number`。如果想传递一个实际的`number`，需要使用`v-bind`，从而让它的值被当作 JavaScript 表达式计算
```html
<comp some-prop="1"></comp>
<comp v-bind:some-prop="1"></comp>
```

4.使用`v-on`绑定自定义事件

使用 $on(eventName) 监听事件
使用 $emit(eventName) 触发事件，触发事件直接写在模板中，事件名必须加斜杠转义，如下

```js
Vue.component('todo',{
  props:['title'],
  template:'<li>{{title}}<button @click="$emit(\'remove\')">X</button></li>'
})
```

:::danger
不能用$on侦听子组件抛出的事件，而必须在模板里直接用v-on绑定
:::

```html
<div id="example">
  <p>{{total}}</p>
  <btncounterone @increament="increamentTotal"></btncounterone>
  <btncounterone @increament="increamentTotal"></btncounterone>
</div>
```

:::tip 高级技巧
一般使用在组件库中，如`element-ui`

`this.$parent.$emit('emit-by-parent')`、`this.$refs.xxx.$emit('custom-event')`
:::

:::tip 高级技巧
子组件内部任何值得改变都可以用`$emit('input',val)`对外传递，然后父组件用`v-model`来接收传递出来的值，如果有多个值传递，把这些值都封装在一个`{}`里面
:::
5. 父子组件

父组件：写在html里的内容，子组件：被嵌套的标签

父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译。父组件通过`props`向下传递数据给子组件，子组件通过`events`给父组件发送消息。子组件要显式地用 props 选项声明它期待获得的数据,`props`可以是`[]`或`{}`，父组件引用多个子组件则用`{}`来注册，如果方法里面要用到`props`的某一个，直接用`this.xxx`调用即可

6. 单个`slot`及具名`slot`

`slot`标签定义在组件模板中，要插入内容的地方添加`slot`标签。应用了组件模板之后要插入的内容用组件名称包含即可，注意`slot`标签要被其他标签包围。

7.动态组件

通过使用保留的 `<component>` 元素，动态（要用`v-bind`）地绑定到它的`is`特性，我们让多个组件可以使用同一个挂载点，并动态切换。

```html
<component :is="currentView"></componnet>
```
<img :src="$withBase('/assets/component.png')">

8.keep-alive

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个`keep-alive`指令参数把要切换的组件包围起来

:::danger
在`keep-alive`标签上添加`include`、`exclude`时，被匹配的组件内部要添加`name`选项。
:::

```html
<keep-alive>
  <componnet :is="currentView" />
</keep-alive>
```

9.组件命名格式

推荐用连字符，如果组件未经`slot`元素传递内容，你甚至可以在组件名后使用`/`使其自闭合（只在字符串模版中有效，字符串模板即是用反引号包含的模板``）


10. 递归组件

组件在它的模板内可以递归地调用自己，不过，只有当它有`name`选项时才可以


11. `v-once`

对低开销的静态组件使用`v-once`，即渲染一次后再actived从内存中取该组件。

```js
Vue.component('once-component',{
  tempate:`<div v-once>...a lot of static content...</div>`
})
```

12.`name`选项的作用

三个作用：递归使用自身、keep-alive标签匹配、vue devtools名字展示。
