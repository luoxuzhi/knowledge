## 1.Vue 实例的属性

1.vm.$watch和watch钩子的效果是一致的，区别是$watch不会随着组件销毁自动注销，要手动注销，而后者会自动注销。

``` js
const unwatch = this.$watch('xxx',(new,old)=>{xxxx})
unwatch() // 手动取消观察

watch：{
'$route'(to,from){},
'obj.a'(){}
}

```

2.vue实例的生命周期created、mounted、 updated 、destroyed,
以下两种写法实现的功能一样，当新建一个vue实例没有提供el选项时，通过$mount方法来手动把元素挂在到#app上，其中render函数中的App参数为引入的.vue文件。