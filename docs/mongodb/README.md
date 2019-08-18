## 1.mongodb 记录

1. 启动数据库：`mongod --config filepath`

`win:mongod --config D:\MongoDB\etc\mongodb.conf`

`mac:mongod -f /usr/local/mongodb/etc/mongodb.conf`

<img :src="$withBase('/assets/start-mongodb.png')">

2.
* `robo 3T` 可视化工具

* `mongo` 命令启动shell查看数据库

* `ps aux | grep mongodb` 查找服务

* `kill -9 7337` 杀进程

* 服务器`mongodb(https://www.jianshu.com/p/f8b0d088a032)`[部署](https://www.jianshu.com/p/f8b0d088a032)

* 创建表    `db.createCollection('name')`

* 导入数据，导入后需要在`bin`新建`cmd`窗口才能查看

* `mongoimport -d db_name -c collection_name --file file_path`

* 读取表数据的时候，修改给给字段赋值，必须先在`schema`里面定义好这些字段先

3.
* 显示数据库 `show dbs`

* 显示表 `show collections`

* 建立索引 `db.person.ensureIndex({"name":1},{"unique":true})`，`1`代表升序，`-1`代表降序，添加了`unique`标志后`name`如果有重复的键值就不能插入

4.时间戳保存格式写法：
```js
let commentSchema = new Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  username:String,
  content: String,
  createtime: {
    type: String,
    default: Date.now
  },
  updatetime:{
    type:String,
    default:Date.now
  }
})
commentSchema.pre('save',function (next){
  if (this.isNew) {
    this.createtime = this.updatetime = Date.now()
  } else {
    this.updatetime = Date.now()
  }
})
// save findOneAndDelete返回被操作文档（doc）本身
```


5.[mongoose中文网址](https://xiaoxiami.gitbook.io/mongoose/guide)