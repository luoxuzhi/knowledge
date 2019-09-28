## 1.网页调用邮件客户端

```html
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>网页Javascript提交OutLook发送邮件</title>
  </head>
  <script language="javascript">
    function toOutLook() {
      var objFrm = document.frmEmail
      var objFrmOutLook = document.frmEmailOutLook
      objFrmOutLook.message.value = 'this is send message'
      objFrmOutLook.action =
        'mailto:sundysea@hotmail.com?subject=' + '这是发送的主题'
      objFrmOutLook.submit()
    }
  </script>
  <body>
    <form name="frmEmailOutLook" action="" method="post" enctype="text/plain">
      <input type="hidden" name="message" value="" />
    </form>
    <form name="frmEmail" action="" method="post">
      <input type="button" name="send" value="send" onClick="toOutLook()" />
    </form>
  </body>
</html>
```