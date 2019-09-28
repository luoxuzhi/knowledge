## 6.nginx 代理配置

1. 同一个端口设置多个域名，根据dns解析原理设置本地`hosts`

```conf
// 同一个端口设置多个域名
server {
    listen       80;
    server_name  ncuniversitylxz.xin;
    #return 302 https://$host$request_uri;

    #charset koi8-r;
    #access_log  logs/host.access.log  main;

    location / {
        root   html;
        index  index.html index.htm;
    }
}
server{
    listen 80;
    server_name ncuxz.fun;

    location / {
           root html;
           index index.html index.htm;
    }
}
```

`proxy_set_header` :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。

<img :src="$withBase('/assets/http4.png')">


2.代理服务器缓存设置：` cache` 路径  在`windows`用相对路径，在`linux`用绝对路径

<img :src="$withBase('/assets/http5.png')">


设置了代理服务器缓存后请求效果

<img :src="$withBase('/assets/http6.png')">

3.请求头一致才使用代理缓存，代理缓存验证的响应头为`Vary`

<img :src="$withBase('/assets/http7.png')">


