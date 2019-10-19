## 9.源码学习

1.数据驱动

new Vue()的过程：

执行`_init`方法，在`_init`中调用原型上的`$mount`方法（在`$mount`方法的结尾调用`mounted`钩子并返回`vm`实例，提示类组件就是利用这一特性使得dom插入到body中），`$mount`原始定义在`src/platforms/web/runtime/index.js`中，在`$mount`中实际调用的是`mountComponent`方法，`mountComponent`定义在 `src/core/instance/lifecycle.js`中，它的 核心就是先实例化一个渲染`Watche`，在它的回调函数中会调用 `updateComponent` 方法，在此方法中调用` vm._render` 方法先生成虚拟 Node，最终调用 `vm._update` 更新 DOM。

`vm._render`定义在`src/core/instance/render.js`中，它实际调用的是`$options`中的`render`方法来生成虚拟Node，`render`通过`compileToFunctions`生成并且赋值到`options`上(见`src/platforms/web/entry-runtime-with-complier.js`)，`render`的参数`createElement`方法实际是内部的`_createElement`方法，在`_createElement`内部主要做两件事：`children` 的规范化、创建`VNode`


2.Vue的初始化过程

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) ├──Vue.prototype._init // new的时候如果提供el在_init方法末尾自动调用$mount方法，然后会走mounted钩子
                                      //  if (vm.$options.el) { vm.$mount(vm.$options.el) }
                                      // 总结：提供el自动调$mount，或者手动$mount都在mountComponent末尾调mounted钩子
               ├──initLifecycle(vm)
                  initEvents(vm)
                  initRender(vm)
                  callHook(vm, 'beforeCreate')
                  initInjections(vm) // resolve injections before data/props
                  initState(vm) // props->methods->data->computed->watch
                  initProvide(vm) // resolve provide after data/props
                  callHook(vm, 'created')
--------------------------------------------------------------------------------------------------                
stateMixin(Vue)

eventsMixin(Vue)

lifecycleMixin(Vue) ├──Vue.prototype._update // _update 的核心就是调用 vm.__patch__ 方法
                    ├──Vue.prototype.$forceUpdate
                    ├──Vue.prototype.$destroy

renderMixin(Vue)  ├──Vue.prototype.$nextTick
                  ├──Vue.prototype._render // 实际调用compileToFunctions返回并赋值到options上的的render
export default Vue
```

3.`vm.$vnode` 表示 `Vue` 实例的父虚拟 `Node`，所以它为 `Null` 则表示当前是根 `Vue` 的实例，实际根节点(通过new产生)的$vnode为`undefined`。