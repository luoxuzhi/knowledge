## 3.cookie、长连接、数据协商

1.`cookie`的属性
* `max-age`和`expires`设置过期时间
* `Secure`只在`https`的时候发送
* `HttpOnly`无法通过`document.cookie`访问

```js
http.createServer((request,response)=>{
  const host = request.headers.host
  if (request.url==='/') {
    if (host==='a.test.com:9000') {
      fs.readFile('./test.html','utf8',(err,content)=>{
        response.writeHead(200, {
          'Content-Type':'text/html',
          'Set-Cookie':['id=123; max-age=200','abc=456;max-age=2;domain=test.com;HttpOnly']
        })
        response.end(content)
      })
    }else {
      response.end('123')
    }
  }
}).listen(httpPort,()=>{ console.log('Server lintening on http://localhost:%s',httpPort) })
```



2.长连接  一个`tcp`可以发送多个`http`请求

```js
http.createServer((request,response)=>{
  // const html = fs.readFileSync('./test.html','utf8')
  const html = fs.readFileSync('./test.html') //gzip
  const img = fs.readFileSync('./timg.jpg')
  if (request.url==='/') {
    response.writeHead(200, {
      'Content-Type':'text/html',
      // 'Content-Encoding':'gzip',
      'Connection':'close' // 长连接设置
    })
    response.end(html)
    // response.end(zlib.gzipSync(html))
  }else {
    response.writeHead(200, {
      'Content-Type':'image/jpg',
      // 'Content-Type':'text/html',
    })
    response.end(img)
  }
}).listen(httpPort,()=>{ console.log('Server lintening on http://localhost:%s',httpPort) })
```

3.数据协商/压缩

浏览器：`Accept Accept-Encoding Accept-Language User-Agent`

服务器：`Content-Type `

<img :src="$withBase('/assets/http2.png')">

4.form 的`enctype`对应`request` `header`中的`Content-type`，它有三个可以选值

* `application/x-www-form-urlencoded` 、`multipart/form-data`、`text/plain`
* 其中包含`file`的时候要选`multipart/form-data`

<img :src="$withBase('/assets/http3.png')">

