## 1.url、stream

1.`url.parse('url')`，解析结果注意`query`和`search`的区别。`search`比`query`多最前面的问号

2.`url.format`
```js
url.format({
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: 'www.imooc.com',
 port: null,
 hostname: 'www.imooc.com',
 hash: null,
 search: null,
 query: null,
 pathname: '/video/6710',
 path: '/video/6710',
 href: 'http://www.imooc.com/video/6710'
})
```

3.`url.resolve`

<img :src="$withBase('/assets/node-1.png')">

4.`url.parse`设置第二个参数为`true`可以将`query`解析成一个对象，设置第三个参数为`true`可以不写协议

<img :src="$withBase('/assets/node-2.png')">

5.stream
```js
var readStream = fs.createReadStream('./xxx.js')
var writeStream = fs.createWriteStream('./xxx.js')
```

* 可读流的事件: `data、readable、end、close、error`

`readStream.on('data',(chunk)=>{
console.log(chunk)
})`



* 可读流的方法: `pause()、resume()`

`
readStream.pause()
readStream.resume()
`

* 写入流的事件 :`drain`

`writeStream.on('drain',()=>{ })`

* 写入流的方法:`end()`

`writeStream.end()`