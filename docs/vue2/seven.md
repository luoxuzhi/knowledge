## 7.生命周期
<img :src="$withBase('/assets/lifecycle.png')">

1.`beforeCreate/created`阶段$el不可见，mounted钩子在服务端渲染不执行。在`beforeCreate/created`中间主要做组件的初始化工作，如下：

```js
// init.js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```
其中`initState`的顺序依次是`props`，`methods`，`data`，`computed`，`watch`：
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

2.`beforeMount`之前判断是否有template，有template按template编译，没有template按el绑定作为模板

3.`beforeMount`之后`mounted`之前编译的内容替换el的dom，如果没有el，`beforeMount、mounted`钩子不执行，所以`$el`不可访问，可以手动调用`$mount()`方法使得`$el`可访问。


4.`render` function接受三个参数：第一个要创建的标签，第二个为Vue的options，它是一个对象，如{props，data，methods}，第三个为这个标签内的内容。如果这些内容为标签，则第三个参数为数组。

5.`render`执行在`beforeMount`和`mounted`的中间。

6.`render`函数中使用`JSX`,v-if 在 render 中 用原生if/else，v-for 在 render 中用原生map，v-model 在 render 中value 、input 事件实现，类似v-model 的值直接保存到 vuex 中的实现方法。

7.在render中引用其他组件，如果是**大写开头引入的可以不注册，所以推荐引入组件的时候都大写开头**，同时它也是一个类，更符合类的写法。

在组件的option中设置`functional:true`(或者在template模板组件中写在`script`标签内部)，使组件无状态 (无 data ) 和无实例 (无 this 上下文)。返回虚拟节点使他们更容易渲染，但是render函数会提供第二个参数`context`以访问上下文。

```js
render(h){
  return h('div',{},['this is message'])
},
renderError(h,err){
  return h('div',{},err.stack)
}
```

8.`beforeCreate/beforeDestroy` 在`element-ui`的`steps`步骤条中使用。

9. 生命周期钩子执行顺序：

`mixin`->`componentSelf`->`extend`

`mehthod`覆盖原则：`extend`*覆盖*`componentSelf`*覆盖*`mixin`


10.父组件监听子组件的生命周期 

:::tip 高级技巧
<child @hook:mounted></child>
:::


