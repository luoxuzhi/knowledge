## 7.使用Nginx部署HTTPS服务

```conf
# HTTPS server
server {
    listen 443 ssl;
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