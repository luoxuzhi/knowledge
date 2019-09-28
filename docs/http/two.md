## 2.缓存Cache-Control


1.可缓存性 `private` `public` `no-cache` no-store` 

* 如果响应头设置了`private`,只有浏览器缓存、代理服务器不能缓存。
* `no-store` 任何地方都不缓存。

* 浏览器 `max-age（seconds）`
* 代理服务器` s-maxage （seconds）`
* 重新验证` must-revalidate   proxy-revalidate`

2.文件名加`hash`值的原因是内容变了 `hash`会变，相当于请求静态资源的`url`变了，自己重新加载资源

3.缓存通过在服务端设置`Cache-Control`控制
```js
if (res.url === '/script.js') {
  res.writeHead(200,{
    'Cache-Control':'max-age=200000,no-cache', // age单位为（s），缓存的选项设置用逗号隔开，重复的后面覆盖前面的
    'Content-Type':'application/javascript',
    'Access-Control-Allow-Origin':'https://y.qq.com',
    'Access-Control-Allow-Headers':'X-Test-Cors,X-Test-Two',
    'Access-Control-Allow-Methods':'PUT,DELETE',
    'Access-Control-Max-Age':'1000', // 在该时间段内不用重新发送预请求，单位为秒（s）
  })
  res.end('console.log("script.js loaded twice")')
}
```


4.缓存验证 `Last-Modified`、`Etag`

`last-modified` 配合`If-Modified-Since`或者`If-Unmodified-Since`使用，对比上次修改时间验证资源是否需要重新请求。

第一次请求如果返回了`Last-Modified`,`Etag`这些信息，下次浏览器请求会自动带上`If-Modified-Since ``If-None-Match`这些信息，服务器再根据这些信息返回相关的`status code`以及内容（浏览器是根据`status code`进行判断是否使用缓存里的内容）

```js
http.createServer((req,res)=>{
  if (req.url==='/') {
    fs.readFile('./index.html', 'utf-8', (err,content) => {
      if (err) console.log('We cannot open "index.html" file')
      res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8'
      })
      res.end(content)
    })
  }
  if (req.url === '/script.js') {
    const etag = req.headers['if-none-match']
    if (etag === '7777') {
      res.writeHead(304, {
        'Cache-Control':'max-age=200000,no-cache', // age单位为（s），缓存的选项设置用逗号隔开，重复的后面覆盖前面的
        'Content-Type':'application/javascript',
        'Access-Control-Allow-Origin':'https://y.qq.com',
        'Access-Control-Allow-Headers':'X-Test-Cors,X-Test-Two',
        'Access-Control-Allow-Methods':'PUT,DELETE',
        'Access-Control-Max-Age':'1000', // 在该时间段内不用重新发送预请求，单位为秒（s）
        'Last-Modified':126,
        'Etag':7777
    })
      res.end('123')
    }else {
      res.writeHead(200, {
        'Cache-Control':'max-age=200000,private,no-cache', // age单位为（s），缓存的选项设置用逗号隔开，重复的后面覆盖前面的
        'Content-Type':'application/javascript',
        'Access-Control-Allow-Origin':'https://y.qq.com',
        'Access-Control-Allow-Headers':'X-Test-Cors,X-Test-Two',
        'Access-Control-Allow-Methods':'PUT,DELETE',
        'Access-Control-Max-Age':'1000', // 在该时间段内不用重新发送预请求，单位为秒（s）
        'Last-Modified':126,
        'Etag':7777
      })
      res.end('console.log("script.js loaded twice")')
    }
  }
}).listen(httpPort,()=>{ console.log('Server listening on http://localhost:%s',httpPort) })
```