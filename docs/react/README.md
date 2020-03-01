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
