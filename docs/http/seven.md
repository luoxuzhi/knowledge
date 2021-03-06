## 7.使用 Nginx 部署 HTTPS 服务

配置`https`需要安装两个模块：`--with-http_ssl_module --with-http_v2_module`,通过`nginx -V`可以看到安装了什么模块：

<img :src="$withBase('/assets/https-ssl.png')">

```conf
server {
    listen 443 ssl http2;
    server_name mall.ncuxz.fun;

    ssl_certificate      cert/mall.ncuxz.fun.crt;
    ssl_certificate_key  cert/mall.ncuxz.fun.key;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root /usr/local/project/mall;
        index index.html;
    }

    location /users {
        proxy_pass http://127.0.0.1:3000;
    }

    location /goods {
        proxy_pass http://127.0.0.1:3000;
    }
}
```
