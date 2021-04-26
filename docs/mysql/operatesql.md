## 4.sequelize 操作表增删改查

#### 1.增删改查对应的函数

| sql    | 函数                                     |
| :----- | :--------------------------------------- |
| select | findAll,findOne,findByPk,findAndCountAll |
| update | update                                   |
| insert | create                                   |
| delete | delete                                   |

#### 2.查询

##### 2.1 查询单条数据

```js
const user = await ctx.model.User.findOne({
  attributes: ['id', 'name'],
  where: { id },
  order: ['showCount', 'DESC'],
})
// 字段重命名,将name重命名为myName，返回结果的字段里就是myName
attributes: ['id', ['name','myName']],

// 或者以下

const user = await ctx.model.User.findByPk(1)
```

##### 2.2 查询多条数据

```js
const { app } = ctx
const { gt } = app.Sequelize.Op
const user = await ctx.model.User.findAll({
  where: {
    id: {
      [gt]: 6, // id>6
    },
  },
  limit: 10,
  offset: 0,
})
```

##### 2.3 分组查询，分组查询通常与聚合函数一起使用，聚合函数包括

| 聚合函数 | 功能                     |
| :------- | :----------------------- |
| COUNT    | 用于统计记录条数         |
| SUM      | 用于计算字段的值的总和   |
| AVG      | 用于计算字段的值的平均值 |
| MAX      | 用于查找查询字段的最大值 |
| MIN      | 用于查找查询字段的最小值 |

```js
//求userbiao中id字段值的和，输出sumId
const { ctx, app } = this
const { fn, col } = app.Sequelize
// fn指的是函数，col指的是字段
const res = await ctx.model.Egguser.findAll({
  attributes: [[fn('SUM', col('id')), 'sumId']],
})
ctx.body = {
  status: 200,
  data: res,
}
// sql 语句

SELECT SUM(`id`) AS `sumId` FROM `egguser` AS `egguser`;
```

#### 3. 新增

```js
// id自增的时候，不需要传入
const res = await ctx.model.Egguser.create({name,password)
```

#### 4. 修改

```js
// 修改之前判断数据是否存在，存在再修改
const user = await ctx.model.User.findByPk(id)
await user.update({ name, password }, { where: { id } })
```

#### 5. 删除

```js
// 删除之前判断数据是否存在，存在再删除
const user = await ctx.model.User.findByPk(id)
await user.destroy()
```
