## 8. web 安全

[具体见链接](https://www.cnblogs.com/zhanghaiyu-Jade/p/11148530.html)

### 1. XSS

XSS 攻击全称跨站脚本攻击，XSS 是一种在 web 应用中的计算机安全漏洞，它允许恶意 web 用户将代码植入到提供给其它用户使用的页面中。

常见的 XSS 攻击有三种：

DOM-based 型、反射型、存储型。其中,反射型、DOM-based 型可以归类为非持久型 XSS 攻击。存储型归类为持久型 XSS 攻击。

①DOM-based 型攻击：利用 dom 本身的缺陷，进行攻击

栗子：就是页面中的某个图片，获取图片的路径：

```js
<img src="{{img.src}}">
//返回的 img.src=/xxxx"  onerror=xxx"
//这样放到img的src中就成了这样<img src="/xxx"  onerror=xxx">
//src肯定会加载失败，然后执行了onerror中注入的恶意代码，达到攻击效果
```

② 反射型

恶意代码并没有保存在目标网站，通过引诱用户点击一个链接到目标网站的恶意链接来实施攻击的。

栗子：

有这样一个 url：http:xxxxx.con?name=xxx(xxx 是恶意代码)

//传到后端的参数 name 被后端接收之后，响应的页面包含 name 这个变量的，会把这个 name 的内容注入到页面上面，达到攻击的效果

```js
X-XSS-Protection 头 （现代浏览器的防范措施）
X-XSS-Protection:0 // 0： 表示关闭浏览器的 XSS 防护机制

X-XSS-Protection:1 　　　　　　　　　　　　// 1：删除检测到的恶意代码， 如果响应报文中没有看到 X-XSS-Protection 字段，那么浏览器就认为 X-XSS-Protection 配置为 1，这是浏览器的默认设置

X-XSS-Protection:1;mode=block // mode=block ： 给出警告信息，阻止页面的渲染执行

X-XSS-Protection:1;report=<reporting-uri> // report=<reporting-uri> ： 进行上报
```

③ 存储型

前端页面中表单提交的数据存在恶意代码被保存到目标网站的服务器中，这种攻击具有较强的稳定性和持久性。

#### xss 防御手段：

① 过滤

对用户的输入进行过滤，移除用户输入的 style、script、iframe、img、a

② 编码

HTML Entity 编码

③ 将重要的 cookie 设置成 http only 这样就不能通过 js 获取到该 cookie 了

### 2. CSRF(跨站请求伪造)，本质是请求参数可预知，利用网站对用户网页浏览的信任。

CSRF 如何防御(增加验证流程，如指纹、密码、短信验证码):

① 使用 token:

服务器发送给客户端一个 token，客户端提交表单时带上该 token，服务器验证 token 是否有效，有效就允许访问，否则拒绝访问。

②Referer 验证

Referer 指的是页面请求来源，意思是，只接受本站的请求，服务器才做响应；如果不是，就拦截。

### 3. SQL 注入攻击

防范策略：

① 验证输入类型

比如某个视图函数接收整形 id 来查询，那么就在 URL 规则中限制 URL 变量为整型。

② 参数化查询

③ 转义特殊字符

比如引号、分号和横线等。使用参数化查询时，各种接口库会为我们做转义工作。

### 4. 点击劫持(ClickJacking)

防范策略：

①csp （Content-Security-Policy）

② 设置 http 响应头 x-Frame-Options

X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 `<frame>`, `<iframe>`或者 `<object>` 中展现的标记。网站可以使用此功能，来确保自己网站的内容没有被嵌到别人的网站中去。

X-Frame-Options 有三个值：

deny ：表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。

sameorigin ：表示该页面可以在相同域名页面的 frame 中展示。

ALLOW-FROM uri ：表示该页面可以在指定来源的 frame 中展示。

换一句话说，如果设置为 deny，不光在别人的网站 frame 嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为 sameorigin ，那么页面就可以在同域名页面的 frame 中嵌套。
③ 还可以使用 `window.self` 和 `window.top` 来判断

`window.self` 返回一个指向当前 `window` 的一个引用

`window.top` 返回窗口体系中最顶层窗口的引用

对于非同源的域名，iframe 子页面无法通过 `parent.location` 或者 `top.location` 拿到具体的页面地址，但是可以写入 `top.location`，也就是可以控制父页面的跳转，所以当我们发现页面被嵌入在 `iframe` 中时，可以重定向父级页面：

```
if (window.self != window.top) {
    //正常页面
    top.location.href = self.location.href
}
```

### 5. 防爬虫方式 ？

font-face 拼接、背景图、css 伪元素、元素定位覆盖式（去哪儿加个通过标签偏移实现视觉价格正确）、字符集替换

### 6. 前端数据加密方式 ？

验证码（一次性、时效性）、sha1、base64、md5、RSA

### 7.怎么防止数据包被篡改？

1. 请求参数与私钥拼接后再使用 md5 加密生成一个签名，再加入一个时间戳，一起发给服务端，服务端这边获取到参数，签名，再使用自己的私钥进行同样方式的加密生成签名，比对签名是否一致。一致则认为合法，不一致则不合法。

2. 请求方式换成 https
