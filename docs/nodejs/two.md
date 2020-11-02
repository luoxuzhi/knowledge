## 2.koa2实现文件上传


1.直接调域名方式跨域如先发送一个`OPTION`方式发请求，服务器必须先通过此请求，详细见[app.js](https://github.com/luoxuzhi/koa-server/blob/master/app.js)
```js
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  if (ctx.method == 'OPTIONS') {
    ctx.status = 200
  } else {
    await next();
  }
})
```

2. 上传文件`app.js`，详细代码见[upload.js](https://github.com/luoxuzhi/koa-server/blob/master/routes/upload.js)，[参考地址](https://www.jianshu.com/p/34d0e1a5ac70)

```js
const router = require('koa-router')()
const multer = require('koa-multer')
const path = require('path')
const fs = require('fs')
// const originHostUrl = 'http://localhost:3000/uploads'
const originHostUrl = '/uploads'

const storage = multer.diskStorage({
  // 文件保存路径,注意windows和linux系统存储路径写法区别，否则会报404错误
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')//path.resolve('public/uploads') // windows
    // cb(null, '/usr/local/themesui-server/public/uploads') // linux
  },
  //修改文件名称
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
const upload = multer({
  storage: storage,
  limits: {
    // fileSize: 1024 * 1024 / 2 // 限制512KB
    fileSize: 1024 * 1024 * 20 // 限制15M
  }
});

router.prefix('/koaserver')

// 上传单个文件
router.post('/uploadfile', upload.single('file'), async (ctx, next) => {
  // 返回原文件名,使用koa-multer
  // let name = ctx.req.file.filename
  // let url = `/uploads/${ctx.req.file.filename}`
  // ctx.body = {
  //   code:200,
  //   name,
  //   url,
  //   userInfo: ctx.req.body
  // }
  // 使用原生node
  const file = ctx.request.files.file; 
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '../public/uploads/') + `/${file.name}`;
  let fileUrl = originHostUrl + `/${file.name}`
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return ctx.body = {
    code:200,
    urlArr:[fileUrl]
  }
})

// 上传多个文件
router.post('/uploadfiles', async (ctx, next) => {
  // 如果前端fileData.append('files',file.file) ,则后台 files = ctx.request.files.files; 
  // 如果前端fileData.append('file',file.file) ,则后台 files = ctx.request.files.file; 
  // 后台最后一级是files还是file由前端传的决定
  const files = ctx.request.files.file; 
  console.log(files)
  let urlArr = []
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../public/uploads/') + `/${file.name}`;
    let fileUrl = originHostUrl + `/${file.name}`
    urlArr.push(fileUrl)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  return ctx.body = {
  code:200,
  urlArr
  }
})

const saveFile = (file) => {
  const reader = fs.createReadStream(file.path)
  const filePath = path.join(__dirname, '../public/uploads/') + `/${file.name}`
  const fileUrl = originHostUrl + `/${file.name}`
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)
  return fileUrl
}

router.post('/upload', async (ctx, next) => {
  // 如果前端fileData.append('files',file.file) ,则后台 files = ctx.request.files.files; 
  // 如果前端fileData.append('file',file.file) ,则后台 files = ctx.request.files.file; 
  // 后台最后一级是files还是file由前端传的决定
  const files = ctx.request.files.file; 
  const name = ctx.request.body.name
  let urlArr = []
  if (files instanceof Array) {
    for (let file of files) {
      let fileUrl = saveFile(file)
      urlArr.push(fileUrl)
    }
  }else{
    // 只有一个文件
    let fileUrl = saveFile(files)
    urlArr = [fileUrl]
  }
  return ctx.body = {
  code:200,
  urlArr,
  name
  }
})

module.exports = router
```
