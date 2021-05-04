## 1.redis base

#### 1. redis 是什么？

redis 是基于内存的高性能 key-value 数据库，具有存储速度快，支持丰富的数据类型，过期后自动删除缓存等特点。

安装：`brew intall redis`

启动 `brew services start redis`

终端测试 redis 基本操作命令，输入 `redis-cli`

退出终端操作`exit`

redis 配置文件在`/usr/local/etc/redis.conf`,可通过`requirepass`添加密码

添加后需要重启 redis 服务，`brew services restart redis`,

终端通过密码重新连接，需要添加`-a`参数`redis-cli -a root`

#### 2. 基本命令

`get/set/del/expire`

`expire`的过期时间单位为`s`
