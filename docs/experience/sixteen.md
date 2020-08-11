## 16. Vue3

### 1. Vue3 的新特性

a. setup() 函数是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 Composition API 新特性提供了统一的入口,setup 函数会在 beforeCreate 之后、created 之前执行!

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
