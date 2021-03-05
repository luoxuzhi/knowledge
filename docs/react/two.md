### 2.React

1.不能在函数组件标签上使用 ref 属性，但可以在函数组件内部使用 ref 属性

2.视图层组件最核心的就是渲染出 vdom 也就是 jsx 的部分，函数组件是基本形态，有状态时可以使用类组件形态，组件间逻辑复用可以使用函数组件的 HOC 和类组件 render props 来实现(`render props会多生成一层组件，HOC会改变组件名，这样在调试时会发现组件树特别不直观。而且类组件的方案中处理同一个事情的逻辑可能会散乱在多个生命周期函数中，使得组件变得越来越臃肿`)，但这种状态下，存在组件树不直观、类组件难维护、组件的有状态逻辑难复用的问题，所以 react 16.8 加入了 hooks 的方案。每个 hooks 独立的上下文来维护状态，可以添加到函数组件中，这样函数组件就可以完成一些有状态的逻辑。逻辑复用方案也在 HOC 和 render props 之外加入了 custom hooks 的方式。但 hooks 也不是完美的，他也有性能问题，因为每次 render 都会调用，所以需要指定依赖的状态变量来优化性能。

### 3. react componentDidMount 里面 settimeTout 写 setState 为什么是同步的

在 React 的 setState 函数实现中，会根据一个变量
`isBatchingUpdate` 来判断是直接同步更新 this.state 还是放到队列中异步更新 。React 使用了事务的机制，React 的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用`batchedUpdates`方法修改`isBatchingUpdates`变量为 true，在后置钩子中将变量置为 false。`原生绑定事件和setTimeout异步`的函数没有进入到 React 的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的 setState 会直接进入非批量更新模式，表现在我们看来成为了同步`SetState`。
[原链接](https://muyiy.cn/question/frame/19.html)
