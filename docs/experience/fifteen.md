## 15. Vue3

### 1. Vue3 的新特性

a. setup() 函数是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 Composition API 新特性提供了统一的入口,setup 函数会在 `beforeCreate` 之前执行。

```js
setup(props, context) {
context.attrs
context.slots
context.parent
context.root
context.emit
context.refs
}

```

b.响应式由 Object.definePropety 改为 Proxy

c.新的 API,`reactive、ref、isRef、toRefs、computed、watch`

d.生命周期只能用在`setup`函数中

e.新的标签`Fragment/Suspense/Teleport`

### 2. Vue3 中 ref reactive toRefs 的区别及作用。 [具体见 composition-api](https://composition-api.vuejs.org/api.html#customref)

Vue3 的`computed`返回为为`ref`，是为了防止基本类型的数据丢失响应式。

JavaScript 中区别声明基础类型变量与对象变量时一样区别使用 `ref` 和 `reactive`，使用 `reactive` 的问题是，使用组合函数时必须始终保持对这个所返回对象的引用以保持响应性，这个对象不能被解构或展开。`toRefs` API 用来提供解决此约束的办法，它将响应式对象的每个 `property` 都转成了相应的 `ref`。

[vue-next-template-explorer](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3EHello%20World!%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%2C%22optimizeBindings%22%3Afalse%7D%7D)

### 3. Vue3 的初始化过程

[更多资料](https://www.yuque.com/woniuppp/vue3)

<img :src="$withBase('/assets/vue3-init.jpg')">

```js
createApp(App).mount(rootNode)
```

`Vue3`初始化的过程从调用 mount 方法开始，

1. 调用 `mount` 方法后，基于根组件、根节点创建 `vnode`，`vnode` 创建完成后开始 `render` 渲染，`render` 实际调用的是 `patch` 方法
2. 在 `patch` 方法中，根据 `shapeFlag` 来判断是初始化 `component` 还是 `element`
3. 先是初始化 `component`，初始化 `component` 分为三步，一是通过 `createComponentInstance` 创建组件实例，二是调用 `setupComponent` 来配置组件，这里主要实现 `initProps/initSlots/配置 setup/配置 render 方法`，三是 `setupRenderEffect`，这里调用上一步的 `render` 方法来生成子组件的 `vnode`，触发自身的 `beforeMount`，递归调用 `patch` 方法来初始化子元素，最后触发 `mounted`
4. 初始化 `component` 最后一步的 `setupRenderEffect` 中递归调用 `patch`处理子元素，`patch` 的子元素有 `component`和 `element` 类型。如果是 `component` 类型，会重复上面第三步进行初始化，这也是生命周期`父 beforeMount->子 beforeMount->子 mounted->父 mounted` 的原因。如果子元素是 `element` 类型，会进行以下处理：调用 `createElement` 方法来创建真实 element，处理 `children` 节点，调用 `hostPatchProp` 处理标签上的属性，触发 `beforeMount` 钩子，调用 `insert` 插入父节点，最后触发 `mounted`。

### 4. Vue2 的 Object.defineProperty 和 Vue3 的 Proxy 对比

`Object.defineProperty`的缺点：

- 无法检测到对象属性的新增或删除

  由于 js 的动态性，可以为对象追加新的属性或者删除其中某个属性，这点对经过`Object.defineProperty` 方法建立的响应式对象来说，只能追踪对象已有数据是否被修改，无法追踪新增属性和删除属性，这就需要额外的代码处理。

- 数组变化监听：vue2.x 是通过代理数组原型，包装了一层数组的变异方法：`'pop','shift','unshift','sort','reverse','splice', 'push'`
- get set 拦截器不能直接操作 target 对象

Vue3 的 Proxy 代理是针对整个对象，不是针对对象属性做拦截，替换了原先遍历对象使用`Object.defineProperty`方法给属性添加 set,get 访问器的笨拙做法，优化性能

劣势：

- 性能比 promise 还差
- 兼容性不太乐观 ,无法完全 polyfill
