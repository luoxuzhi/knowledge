## vite

HMR 原理

```js
if (import.meta.hot) {
  import.meta.hot.accept(newModule => {
    newModule.render()
  })
}
```

vite 性能揭秘：

a.预编译到 node_module 文件夹下.vite 文件夹，并且将 commonjs 编译成 esmodule

b. bundle files together

c. 针对不同的文件自动设置是否有缓存，main.js 不缓存、react 库等设置缓存
