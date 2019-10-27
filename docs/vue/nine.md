## 9.源码学习

1.数据驱动

new Vue()的过程：

执行`_init`方法，在`_init`中调用原型上的`$mount`方法（在`$mount`方法的结尾调用`mounted`钩子并返回`vm`实例，提示类组件就是利用这一特性使得dom插入到body中），`$mount`原始定义在`src/platforms/web/runtime/index.js`中，在`$mount`中实际调用的是`mountComponent`方法，`mountComponent`定义在 `src/core/instance/lifecycle.js`中，它的 核心就是先实例化一个渲染`Watcher`，在它的回调函数中会调用 `updateComponent` 方法，在此方法中调用` vm._render` 方法先生成虚拟 Node，最终调用 `vm._update` 更新 DOM。

`vm._render`定义在`src/core/instance/render.js`中，它实际调用的是`$options`中的`render`方法来生成虚拟Node，`render`通过`compileToFunctions`生成并且赋值到`options`上(见`src/platforms/web/entry-runtime-with-complier.js`)或者用户手写，用户手写`render`和`template`会直接忽略`template`，`render`的参数`createElement`方法实际是内部的`_createElement`方法，在`_createElement`内部主要做两件事：`children` 的规范化、创建`VNode`


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
stateMixin(Vue) ├──Vue.prototype.$set
                ├──Vue.prototype.$delete
                ├──Vue.prototype.$watch
--------------------------------------------------------------------------------------------------                
eventsMixin(Vue) ├──Vue.prototype.$on
                 ├──Vue.prototype.$once
                 ├──Vue.prototype.$off
                 ├──Vue.prototype.$emit
--------------------------------------------------------------------------------------------------                
lifecycleMixin(Vue) ├──Vue.prototype._update // _update 的核心就是调用 vm.__patch__ 方法,把 VNode 转换成真正的 DOM 节点
                    ├──Vue.prototype.$forceUpdate
                    ├──Vue.prototype.$destroy

renderMixin(Vue)  ├──Vue.prototype.$nextTick
                  ├──Vue.prototype._render // 实际调用的是options.render,为用户手写render或者仅提供template时通过
                                           // compileToFunctions返回并复制到options上，见entry-runtime-with-complier.js
                                           //  if (!options.render) {...}
                                           // 总结：render的优先级高于template
--------------------------------------------------------------------------------------------------                
export default Vue
```

3.`vm.$vnode` 表示 `Vue` 实例的父虚拟 `Node`，所以它为 `Null` 则表示当前是根 `Vue` 的实例，实际根节点(通过new产生)的$vnode为`undefined`。

4.`render`的参数`createElement`实际调用`_createElement`,`_createElement`中有一个判断逻辑的调用`createComponent`创建自定义组件，该方法有三个作用：

* 通过`Vue.extend`构造子类构造函数
* 安装组件钩子函数
* 实例化VNode

5 `documenn.body` 指`body`，`document.documentElement`指`html`

6.`insertedVnodeQueue` 的添加顺序是**先子后父**，所以对于同步渲染的子组件而言，`mounted` 
钩子函数的执行顺序**也是先子后父**,`created`是**先父后子**。

`$destroy` 的执行过程中:

* `callHook(vm, 'beforeDestroy')`
* 把自身从父组件`$children`中移除
* 销毁事件监听 `vm._watcher.teardown()`
* 执行 `vm.__patch__(vm._vnode, null)` 触发它子组件的销毁钩子函数，一层层的递归调用，所以 `destroy `钩子函数执行顺序是**先子后父**，和 `mounted` 过程一样
* `callHook(vm, 'destroyed')`
* `vm.$off()` 移除事件监听

7.组件注册

* 全局注册 `Vue.component(id, definition)` 全局注册组件的时候，`id` 可以是连字符、驼峰或首字母大写的形式。

* 全局注册是扩展到 `Vue.options` 下，所以在所有组件创建的过程中，都会从全局的 `Vue.options.components` 扩展到当前组件的 `vm.$options.components` 下，这就是全局注册的组件能被任意使用的原因。

8.数据响应的过程

 * `initState(vm) // props->methods->data->computed->watch`
 * `initData` 包含两步，`proxy`：实现通过`vm.xx`访问`vm._data.xx`；`observe`：在`new Observer`的构造函数中调用`defineReactive`，`defineReactive`的`setter`中定义`dep.notify()`实现数据更新

 9. `nextTick`


 在浏览器环境中，常见的 `macro task` 有 `setTimeout、MessageChannel、postMessage、setImmediate`；常见的 `micro task` 有 `MutationObsever` 和 `Promise.then`、`process.nextTick`。

 [JS执行机制看这里](https://juejin.im/post/59e85eebf265da430d571f89)

 `setTimeout`这个函数，是经过指定时间后，把要执行的任务加入到`Event Queue`
