## 3. Vue+Node+MongoDB 高级全栈开发

1. [项目链接](https://mall.ncuxz.fun/#/goods)

2. express/koa 安装过程

```js
npm install -g express-generator
npm install -g koa-generator
express --version
express server
koa2 server
```

3. 要代理/users 下面所有的二三四级路由 可以在后面添加\*\*，只匹配二级路由添加一个\*就可以

```
'/users/**':{
    target:'http://localhost:3000'
}
```

4. 设置二级域名
   <img :src="$withBase('/assets/sub-domain.png')">

5. 域名带二级目录设置
   url 中带 path(imooc)访问并且实现按需加载,（如http://www.lxzfirstpro.cn/imooc/#/recommend）需要做以下两步

a. 修改 webpack 的配置如图，注意 imooc 前后的两个/不能缺少
<img :src="$withBase('/assets/folder-domain.png')">

b. 需在服务器的 dist 文件夹下新建 imooc 文件夹并且把打包好的文件全部放在 imooc 里面

如果需要二级目录下使用 history 模式，还需要添加以下配置

c. 修改 router 的 base 属性，如 sell 目录，则要添加/sell,所有的路由会在这后面自动拼接

d. 不允许生产环境调试则要修改 sourcemap
