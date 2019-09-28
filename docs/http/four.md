## 4.redirect

1.`status code 301` 永久重定向

2.`status code 302` 每次请求都重定向

3.`304` 资源没有修改，直接使用本地匹配到的缓存

```js
http.createServer((request,response)=>{
  if (request.url==='/') {
    response.writeHead(301, { // 永久重定向
      'Location':'/new'
    })
    response.end('')
  }
  if (request.url==='/new') {
    fs.readFile('./test.html', 'utf8', (err,content) => {
      if (err) {console.log('We can not open "test.html" file')}
      response.writeHead(200, {
        'Content-Type':'text/html',
        'Etag':7777
      })
      response.end(content)
    })
  }
}).listen(httpPort,()=>{ console.log('Server lintening on http://localhost:%s',httpPort) })
```
