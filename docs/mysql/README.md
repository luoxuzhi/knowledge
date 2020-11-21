## 1.mysql 启动

```js
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To have launchd start mysql now and restart at login:
  brew services start mysql
Or, if you don't want/need a background service you can just run:
  mysql.server start
```

## 2. mysql 终端连接

- 连接 mysql -uroot -p
- 查看所有数据库 show databases
- 选择要操作的数据库 use `<database>`

* 创建新的数据库 create database `<database>`

## 3. 使用 nodejs 连接 mysql

- 工具`npm install mysql2`
- 使用 `const mysql = require(mysql2/promise)`

## 4.连接阿里云服务器 `ssh root@39.108.164.98`

## 5. sequelize-cli 管理数据库及表结构

- 所有命令都是`npx sequelize`开头，使用`npx sequelize`查看使用帮助
- 创建表及增删列

a. 创建 model,创建 model 的时候会自动创建迁移文件：

`npx sequelize model:generate --name todo --attributes text:string`(创建表后会自动添加 s 变成`todos`)

b. 添加列过程：直接执行以下命令会自动在`migrations`文件夹创建迁移文件，可以在同一个迁移文件里添加多列，然后修改`migrations`文件夹里对应的文件，示例代码为`todos`表增加`isFinish`列

`npx sequelize migration:generate --name todoAddColumn`

[示例代码链接](https://github.com/luoxuzhi/mysql-sequelize-cli/blob/master/migrations/20201119140351-todoAddColumn.js)

c. 执行迁移命令，会自动检查`SequelizeMeta`表然后执行合并状态为`down`的迁移文件,可封装成 npm 命令

```json
"scripts": {
    "status": "npx sequelize db:migrate:status",
    "migrate": "npx sequelize db:migrate"
},
```

d. 删除列，执行命令会自动删除`isFinish`列

`npx sequelize db:migrate:undo --name 20201119140351-todoAddColumn.js`[示例代码链接](https://github.com/luoxuzhi/mysql-sequelize-cli/blob/master/migrations/20201119140351-todoAddColumn.js)

e. 注意事项： `migrations` 文件夹中的都用复数，`models`文件夹中都用定义时的，

如// migrations 中 20201119145426-create-user.js

```js
roleId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Roles',
    key: 'id',
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
},
```

// models 中 role.js

```js
static associate(models) {
  Role.hasMany(models.User)
}
```

## 6. sequelize 框架实现在服务端代码中对 mysql 代码增删改查

a. 安装依赖

```js
npm install sequelize mysql2 -S
```

b. 创建 model，model 与数据库中的表对应，截图中左边为在服务端代码中定义 model，右边为通过`sequelize-cli`自动创建 model 代码。`define`在内部调用的是`init`方法。
<img :src="$withBase('/assets/define-model-diff.png')">

c.往数据库中新增记录，先创建 model 实例再进行保存,直接使用`create`方法。

```js
router.get('/addTodo', async function(ctx, next) {
  const { text, userId } = ctx.query
  await TodoModel.create({ text, userId })
  ctx.body = {
    code: 0,
    message: '任务新增成功',
  }
})
```

d. 修改数据库记录，查询出来后使用`update`，第一个参数为要修改的字段，第二个为条件，代码如下

```js
router.get('/updateStatus', async function(ctx, next) {
  let { id, isFinish } = ctx.query
  let status = isFinish == 0 ? 1 : 0
  await TodoModel.update({ isFinish: status }, { where: { id } })
  ctx.body = {
    code: 0,
    message: '任务状态更改成功',
  }
})
```

d. 删除数据库记录，直接使用`destroy`,传递删除条件进去,代码如下：

```js
router.get('/deleteTask', async function(ctx, next) {
  let { id } = ctx.query
  await TodoModel.destroy({ where: { id } })
  ctx.body = {
    code: 0,
    message: '任务删除成功',
  }
})
```
