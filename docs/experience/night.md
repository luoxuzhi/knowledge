## 9. Vue 相关

### 1. vdom

a. 用 JS 模拟 DOM 结构，提高重绘性能

b. DOM 操作非常昂贵，DOM 操作放在 js，提高效率

c.vdom 的核心 API 是`h、patch`

### 2. Vue 编译原理

parse-optimize-generate

源码编译篇思维导图

<img :src="$withBase('/assets/vue-source-code1.jpg')">

源码响应篇思维导图

<img :src="$withBase('/assets/vue-source-code2.png')">

### 3. Vue 的 nextTick 实现

对于 `macro task`的实现，优先检测是否支持原生 `setImmediate`，这是一个高版本 `IE` 和 `Edge` 才支持的特性，不支持的话再去检测是否支持原生的 `MessageChannel`，如果也不支持的话就会降级为 `setTimeout 0`；而对于`micro task` 的实现，则检测浏览器是否原生支持 `Promise`，不支持的话直接指向 `macro task` 的实现。

### 4. Vue 的更新过程

当数据发生变化的时候，触发 setter 逻辑，把在依赖过程中订阅的的所有观察者，也就是 watcher，都触发它们的 update 过程，这个过程又利用了队列做了进一步优化，在 nextTick 后执行所有 watcher 的 run，最后执行它们的回调函数。

### 5. Vue key 的作用

1. 给出结论，key 的作用是用于优化 patch 性能
2. key 的必要性
3. 实际使用方式
4. 总结：可从源码层面描述一下 vue 如何判断两个节点是否相同

详细：

1. key 的作用主要是为了更高效的更新虚拟 DOM。
2. vue 在 patch 过程中**判断两个节点是否是相同节点是 key 是一个必要条件**，渲染一组列表时，key 往往是唯一标识，所以如果不定义 key 的话，vue 只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个 patch 过程比较低效，影响性能。
3. 实际使用中在渲染一组列表时 key 必须设置，而且必须是唯一标识，应该避免使用数组索引作为 key，这可能导致一些隐蔽的 bug；vue 中在使用相同标签元素过渡切换时，也会使用 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果。
4. 从源码中可以知道，vue 判断两个节点是否相同时主要判断两者的 key 和元素类型等，因此如果不设置 key，它的值就是 undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的 dom 更新操作，明显是不可取的。

5. 带 key 和不带 key 会影响 diff 算法的具体操作，例如：A B C 要更新为 B A C，不带 key 的操作是：A 更新为 B，B 更新为 A，带 key 的操作则会直接移动 A B 节点，减少删除新增 DOM 的消耗。

### 6. Vue 双向绑定以及它的实现原理？

1. 给出双绑定义
2. 双绑带来的好处
3. 在哪使用双绑
4. 使用方式
5. 扩展：使用细节、原理实现描述

详细：

1. vue 中双向绑定是一个指令 v-model，可以绑定一个动态值到视图，同时视图中变化能改变该值。v-model 是语法糖，默认情况下相当于:value 和@input。
2. 使用 v-model 可以减少大量繁琐的事件处理代码，提高开发效率，代码可读性也更好
3. 通常在表单项上使用 v-model
4. 原生的表单项可以直接使用 v-model，自定义组件上如果要使用它需要在组件内绑定 value 并处理输入事件
5. 我做过测试，输出包含 v-model 模板的组件渲染函数，发现它会被转换为 value 属性的绑定以及一个事件监听，事件回调函数中会做相应变量更新操作，这说明神奇魔法实际上是 vue 的编译器完成的。

### 7. Vue 中的 diff 算法

1. 定义 diff
2. 它的必要性
3. 它在哪里被使用
4. 它如何运作
5. 提升：说一些细节

详细：

1. diff 算法是虚拟 DOM 技术的产物，vue 里面实际叫做 patch，它的核心实现来自于 snabbdom（核心 API:`h、patch`）；通过新旧虚拟 DOM 作对比（即 patch），将变化的地方转换为 DOM 操作
2. 在 vue 1 中是没有 patch 的，因为界面中每个依赖都有专门的 watcher 负责更新，这样项目规模变大就会成为性能瓶颈，vue 2 中为了降低 watcher 粒度，每个组件只有一个 watcher，但是当需要更新的时候，怎样才能精确找到发生变化的地方？这就需要引入 patch 才行。
3. 组件中数据发生变化时，对应的 watcher 会通知更新并执行其更新函数，它会执行渲染函数获取全新虚拟 dom：newVnode，此时就会执行 patch 比对上次渲染结果 oldVnode 和新的渲染结果 newVnode。
4. patch 过程遵循深度优先、同层比较的策略；两个节点之间比较时，如果它们拥有子节点，会先比较子节点；比较两组子节点时，会假设头尾节点可能相同先做尝试，没有找到相同节点后才按照通用方式遍历查找；查找结束再按情况处理剩下的节点；借助 key 通常可以非常精确找到相同节点，因此整个 patch 过程非常高效。
5. 核心逻辑 `createElement`和`updateChildren`

### 8. Vue 监听 data 每个属性的变化？为什么要监听 get，直接监听 set 为什么不行？

1. Object.defineProperty、将 data 代理到 vm 上

2. 因为 data 中有很多属性，有的被用到，有的没有被用到，监听 get 是避免 set 的时候判断是否需要重新渲染 dom，优化性能

### 9. Vue 的模板如何解析，指令如何处理？

模板本质是字符串，嵌入逻辑和变量，必须转换为 JS（有逻辑、变量、html），render 函数返回 vnode，最后 updateComponent

### 10. Vue 的模板如何被渲染成 html 及渲染过程

a.解析模板变成 render 函数

b.响应式监听

c.首次渲染，显示页面且绑定依赖

d.data 属性变化，触发 rerender

### 11. Vuex 理解

1. 首先给 vuex 下一个定义
2. vuex 解决了哪些问题，解读理念
3. 什么时候我们需要 vuex
4. 你的具体用法
5. 简述原理，提升层级

首先是官网定义：

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用**集中式**存储管理应用的所有组件的状态，并以相应的规则保证状态以一种**可预测**的方式发生变化。

详细：

1. vuex 是 vue 专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。
2. vuex 主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。vuex 通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。
3. vuex 并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用 vuex 的必要。一个简单的[store 模式](https://cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)就足够了。反之，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：Flux 架构就像眼镜：您自会知道什么时候需要它。
4. 我在使用 vuex 过程中有如下理解：首先是对核心概念的理解和运用，将全局状态放入 state 对象中，它本身一棵状态树，组件中使用 store 实例的 state 访问这些状态；然后有配套的 mutation 方法修改这些状态，并且只能用 mutation 修改状态，在组件中调用 commit 方法提交 mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写 action，执行结束如果有状态修改仍然需要提交 mutation，组件中调用这些 action 使用 dispatch 方法派发。最后是模块化，通过 modules 选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置 namespace，那么在提交 mutation 和派发 action 时还需要额外的命名空间前缀。
5. vuex 在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了 vue 的数据响应化特性实现的，它会利用 Vue 将 state 作为 data 对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

### 12. Vue3 的新特性

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

### 13. Vue3 中 ref reactive toRefs 的区别及作用。 [具体见 composition-api](https://composition-api.vuejs.org/api.html#customref)

Vue3 的`computed`返回为为`ref`，是为了防止基本类型的数据丢失响应式。

JavaScript 中区别声明基础类型变量与对象变量时一样区别使用 `ref` 和 `reactive`，使用 `reactive` 的问题是，使用组合函数时必须始终保持对这个所返回对象的引用以保持响应性，这个对象不能被解构或展开。`toRefs` API 用来提供解决此约束的办法，它将响应式对象的每个 `property` 都转成了相应的 `ref`。

[vue-next-template-explorer](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3EHello%20World!%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%2C%22optimizeBindings%22%3Afalse%7D%7D)
