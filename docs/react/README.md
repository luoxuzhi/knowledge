### 1.遗忘点

1.不能在函数组件标签上使用`ref`属性，但可以在函数组件内部使用`ref`属性

2.[新手学习 react 迷惑的点](https://mp.weixin.qq.com/s/vDcFV3LiWBEbDBhf4XZ0uw)

3.`this.prop.children` 指的是组件标签内的内容

4.`dangerouslySetInnerHTML`,`style`要是要双花括号

5.`this.setState`里面直接可以直接接收一个对象，也可以接收一个函数返回的对象，推荐用函数返回的对象,异步设置优化性能，如下

```js
handleInputEnter = e => {
  const inputValue = e.target.value
  if (e.keyCode === 13 && inputValue) {
    this.setState(preState => {
      const lists = [...preState.lists, inputValue]
      return { lists, inputValue: '' }
    })
  }
}
```

```js
handleInputChange = e => {
  // this.setState({ inputValue: e.target.value })
  // console.log(this)
  const inputValue = e.target.value
  this.setState(() => ({ inputValue }))
}
```

6.当`state`或`props`发生变化时，自身的`render`函数都会重新执行，当父组件的`render`函数被执行时，它的子组件`render`都将被重新执行

7.`JSX`通过`createElement`->`JS`对象(虚拟`DOM`)->真实的`DOM`

8.如果数据更新后要通过`ref`获取更新后的`DOM`,需要把获取 `DOM`的代码写在`setState`的第二个参数里面，因为`setState`是异步的，类似`Vue`在`nextTick`
里面获取数据更新后的`DOM`。`setState`的第二个参数是一个`function`

```js
this.setState(
  () => ({ name: 'xiaoming' }),
  () => {}
)
```

9.生命周期

<img :src="$withBase('/assets/react-lifecycle.png')">

`componentWillReceiveProps`的执行时机：

- 组件要从父组件接收参数
- 组件第一次存在于父组件中，不会执行
- 如果这个组件之前已经存在于父组件中，才会执行

`componentWillMount->render->componentDidMount` 执行顺序类似`Vue`的`beforeMount->render->mounted`

父子组件执行顺序同`Vue`，`fater will mount->child will mount->child did mount->fater did mount`

`componentWillUpdate->render->componentDidUpdate` 执行顺序类似`Vue`的`beforeUpdate->render->updated`
