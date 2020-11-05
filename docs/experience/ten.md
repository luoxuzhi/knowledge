## 10. React

### 1. react componentDidMount 里面 settimeTout 写 setState 为什么是同步的

在 React 的 setState 函数实现中，会根据一个变量
`isBatchingUpdate` 来判断是直接同步更新 this.state 还是放到队列中异步更新 。React 使用了事务的机制，React 的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用`batchedUpdates`方法修改`isBatchingUpdates`变量为 true，在后置钩子中将变量置为 false。`原生绑定事件和setTimeout异步`的函数没有进入到 React 的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的 setState 会直接进入非批量更新模式，表现在我们看来成为了同步`SetState`。
[原链接](https://muyiy.cn/question/frame/19.html)
