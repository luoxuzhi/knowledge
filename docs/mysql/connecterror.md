### 5.mysql 8.0+版本，node 连接报错解决方式

#### 1. 进入 mysql 容器中

`docker exec -it mysql容器id sh`

#### 2. 进入 mysql 数据库（普通环境忽略第一步）

`mysql -uroot -p`

#### 3. 输入 mysql 密码`root`进入 mysql 终端

#### 4.更改加密规则

`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;`

#### 5.更改密码

`mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456';`

#### 6.docker 环境重启一下 mysql 容器
