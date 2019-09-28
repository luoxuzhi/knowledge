## 5. response header 设置汇总

```js
http.createServer((req,res)=>{
  res.writeHead(200,{
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'X-Test-Cors,X-Test-Two', // 服务端设置允许的自定义请求头
    'Access-Control-Allow-Methods':'PUT,DELETE',// 服务端设置需要发送预请求的请求method
    'Access-Control-Max-Age':'1000', // 在该时间段内不用重新发送预请求，单位为秒（s）
    'Content-Type':'text/plain', // 数据协商
    'Contenct-Encoding':'gzip', // 数据协商
    'Cache-Control':'max-age=200,public',
    'Last-Modified':200,// 缓存验证，下次浏览器请求该资源自动带上If-Modified-Since，如果和服务器的不一致，重新请求
    'Etag':777, // 缓存验证，下次浏览器请求该资源自动带上If-None-Match，如果和服务器的不一致，不适用该缓存重新请求
    'Set-Cookie':['id=123; max-age=200','abc=456;max-age=2;domain=test.com;HttpOnly'],//cookie
    'Connection':'close',//tcp 默认长连接
    // 'Location':'/new' // 重定向，分为301永久重定向，302临时重定向
  })
  res.end('126666663')
}).listen(httpPort,()=>{ console.log('Server listening on http://localhost:%s',httpPort) })
```