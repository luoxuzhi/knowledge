## 2. Vue 全家桶+SSR+Koa2 全栈开发美团网

1. nuxt.js 和 koa 开发模板初始化

`vue init nuxt-community/koa-template`

2. `koa2`的请求

`post` 请求的数据放在 `ctx.request.body` 上，如

```js
let { content } = ctx.request.body
```

`get` 请求的数据存放在 `ctx.request.query` 或 `ctx.query` 上

```js
let {name,age} = ctx.request.query 或 let {name,age} = ctx.query
```

3.`curl` 命令发请求工具

-d 代表 post 请求，'name=lilie&age=27' 是请求参数，后面是接口

```
curl -d 'name=lilie&age=27' http://loacalhost:3000/users/addPerson
```

```js
// response
{
  "code":0
}
```

4.`mongose`更新文档(`document`)

```js
router.post('/updatePerson', async ctx => {
  let { name, age } = ctx.request.body
  const result = await Person.where({ name }).update({ age })
  ctx.body = { code: 0 }
})
```

5.`mongose`删除文档(`document`)

```js
// 1.findOneAndDelete返回被删除记录本身
let res = await Comment.findOneAndDelete({ _id, userid: ctx._id })

// 2.
router.post('/deletePerson', async ctx => {
  let { name } = ctx.request.body
  const result = await Person.where({ name }).remove()
  ctx.body = { code: 0 }
})
```

6.nuxt 中`asyncData`和`fetch`的区别

asyncData 处理组件数据，fetch 处理 vuex 数据
