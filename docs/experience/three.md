## 3.`el-upload`多文件上传

1.多文件上传分为*单文件、多文件接口*、*单文件、多文件同一接口*上传，后台接口配置见**node-->koa2实现文件上传**

`el-upload`上传多文件默认多次调用接口，只调用一次接口可自定义`http-request`,前端关键代码如下，具体代码见[upload.vue](https://github.com/luoxuzhi/vuedemo/blob/master/src/components/upload/upload.vue)，[参考链接](https://blog.csdn.net/weixin_43915587/article/details/91953230)

```vue
<script>
  export default{
    methods: {
      // 多文件上传的时候，有多少个文件就会执行多少次customHttpRequest
      customHttpRequest(file){
        // append files还是file与后台协商
        // this.fileData.append('files',file.file)
        this.fileData.append('file',file.file)
      }
    },
</script>
```
