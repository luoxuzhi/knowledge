## mysql 启动

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

## 1. mysql 使用

- 连接 mysql -uroot -p
- 查看所有数据库 show databases
- 选择要操作的数据库 use `<database>`

* 创建新的数据库 create database `<database>`

## 2. 使用 nodejs 连接 mysql

- 工具`npm install mysql2`
- 使用 `const mysql = require(mysql2/promise)`
