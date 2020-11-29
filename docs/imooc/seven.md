## 7. 7 天搞定 Node.js 微信公众号开发

1. 通过 natapp 将开发环境接口暴露到公网

   https://natapp.cn/tunnel/edit/115511

   客户端启动命令 mac ./natapp -authtoken=d276290cbfe49f79

   客户端启动命令 win natapp -authtoken=d276290cbfe49f79

2. buffer 转换成 string 的方法： buffer.toString()

3. 微信官网的消息回复模板包含数据的前后都多了个空格，要去掉才是标准的 xml 格式

```xml
<xml> <ToUserName>< ![CDATA[toUser] ]> </xml>
```
