## 3.sequelize 表关系定义

#### 1.操作数据库之前要手动或者使用`sequelize-cli`创建表

```sql
// user 与 userDetail 一对一
// user 与 comment 一对多
// user 与 roles 多对多
// 角色表
create table `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE= InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

// 用户表
create table `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY(`id`) USING BTREE
) ENGINE= InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


// 用户详情表
create table `userDetail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10)  NOT NULL ,
  `age` int  NOT NULL ,
  `addr` varchar(120) NOT NULL,
  `avatar` varchar(1100) NOT NULL,
  PRIMARY KEY(`id`) USING BTREE
) ENGINE= InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

// 评论表
create table `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10)  NOT NULL ,
  `msg` varchar(1100) NOT NULL,
  PRIMARY KEY(`id`) USING BTREE
) ENGINE= InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

// 用户与角色关联表
create table `userRoles` (
  `userId` int(10)  NOT NULL ,
  `rolesId` int(10)  NOT NULL ,
  PRIMARY KEY(`userId`,'rolesId') USING BTREE
) ENGINE= InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

```

#### 2.根据数据表的结构，在 app/model 目录下依次创建`user.js/commnet.js/roles.js/userDetail.js/userRoles.js`

```js
// user.js
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(20),
    password: STRING(64),
  })

  User.associate = function() {
    app.model.User.hasOne(app.model.UserDetail, { foreignKey: 'userId' })
    app.model.User.hasMany(app.model.Comment, { foreignKey: 'userId', targetKey: 'id' })
    app.model.User.belongsToMany(app.model.Roles, {
      through: app.model.UserRoles, // 通过哪张中间表进行关联
      foreignKey: 'userId',
      otherKey: 'rolesId',
    })
  }

  return User
}

// comment.js
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    msg: STRING(500),
  })

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'userId' })
  }

  return Comment
}

// userDetail.js
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const UserDetail = app.model.define('userDetail', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    age: INTEGER,
    addr: STRING(120),
    avatar: STRING(1100),
  })

  return UserDetail
}

// roles.js
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const Roles = app.model.define('roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
  })

  Roles.associate = function() {
    app.model.Roles.belongsToMany(app.model.User, {
      through: app.model.UserRoles,
      foreignKey: 'rolesId',
      otherKey: 'userId',
    })
  }

  return Roles
}

// userRoles.js
module.exports = app => {
  const { INTEGER } = app.Sequelize

  const UserRoles = app.model.define('userRoles', {
    userId: INTEGER,
    rolesId: INTEGER,
  })

  return UserRoles
}
```

#### 3. 表关联关系总结：在 Model 实例里面，重写 Model 的 associate 方法，讲关联的关系放到里面

- `hasOne()`和 `belongsTo()`第一个参数为本表关联的另一个表的 Model 实例，第二个参数中，都有`foreignKey`属性，`belongsTo` 比 `hasOne` 多一个 `targetKey` 属性，值为对方表对应的主键名。

- `has` 开头的方法中，`foreignKey`属性值从对方表上找，如果有 `targetKey` 的置则是自己的主键
- `belongs` 开头的方法中，` foreignKey``属性值从自身表上找，targetKey ` 的置则在对方表上
- 一对一方法有： `hasOne(Model,{foreignKey:'对方’})，belongsTo(Model,{foreignKey:'自己',targetKey:'对方'})`

* 一对多的方法有：`hasMany(Model,{foreignKey:'对方',targetKey:'自己'})，belongsTo(Model,{foreignKey:'自己',targetKey:'对方'})`

* 多对多的方法有：`belongsToMany(Model,{through:Model,targetKey:'自己',otherKey:'对方'})`

#### 4. 关联查询

```js
// 一对一
const { ctx, app } = this
// app.model/ctx.model均可
const result = app.model.User.findAll({
  include: {
    model: app.model.UserDetail,
  },
})
ctx.body = result

// 一对多
const { ctx, app } = this
const result = app.model.User.findOne({
  include: {
    model: app.model.Comment,
  },
})
ctx.body = result

// 多对多，获取某个用户下的所有角色
const { ctx, app } = this
const result = app.model.User.findAll({
  where: { id: 2 },
  include: [{ model: app.model.UserDetail }, { model: app.model.Roles }],
})
ctx.body = result

// 多对多，获取角色下的所有用户
const { ctx, app } = this
const result = app.model.User.findAll({
  include: [{ model: app.model.User }],
})
ctx.body = result
```
