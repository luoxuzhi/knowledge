## 4.使用vue-cropper实现图片裁剪上传

1.使用`vue-cropper`可上传`base64`或者`blob`保存到文件系统，此组件[参考这里](https://www.cnblogs.com/libo0125ok/p/9296011.html)

```vue
<template>
  <div class="crop-upload-wrapper">
    <input
      type="file"
      class="upload-avatar"
      :id="cropUploadId"
      :value="imgFile"
      ref="input"
      accept="image/*"
      @change="uploadImage"
    />
    <div class="cropper-img-box" v-show="cropper_box_mark">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
        :outputType="option.outputType"
        :outputSize="option.size"
        :original="option.original"
        @imgLoad="imgLoad"
        @realTime="realTime"
      ></vue-cropper>
      <div class="cropper-img-tool">
        <span class="cropper-img-tool-btn" @click.stop="rotateRight">顺时针90°</span>
        <span class="cropper-img-tool-btn" @click.stop="finish('blob')">确认</span>
        <span class="cropper-img-tool-btn" @click.stop="cancel">取消</span>
        <span class="cropper-img-tool-btn" @click.stop="rotateLeft">逆时针90°</span>
      </div>
      <!-- <div class="show-preview">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
      </div>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import VueCropper from 'vue-cropper'
import axios from 'axios'
import { generateId } from '@/utils/util'
import { postFile } from '@/utils/fetch'

export default {
  components: { VueCropper },
  data () {
    return {
      imgFile: '', // 使得点击剪切图片的取消按钮后加载同一张图片出现剪切框
      cropper_box_mark: false,
      option: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true,
        outputType: 'png',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        original: false
      },
      previews: {}
    }
  },
  computed: {
    cropUploadId () {
      return `crop-upload-${generateId()}`
    }
  },
  methods: {
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    imgLoad (msg) {},
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    finish (type) {
      let _this = this
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          // 做预览用
          // let img = window.URL.createObjectURL(data)
          // this.model = true
          // this.modelSrc = img
          // 这里使用拦截过的方法是经过网关会多包一层
          postFile('/themesui/upload', data, _this.fileName).then(res => {
            if (res.code === 200) {
              _this.imgFile = ''
              console.log(res.url) // 非完整路径
            }
          })
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          console.log(data)
        })
      }
      this.cropper_box_mark = false
    },
    cancel () {
      this.cropper_box_mark = false
      this.option.img = ''
      this.imgFile = ''
    },
    inputLabelClick () {
      document.getElementById(this.cropUploadId).click()
    },
    uploadImage (e) {
      let _this = this
      let file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      let reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        _this.option.img = data
        _this.cropper_box_mark = true
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.crop-upload-wrapper {
  width: 100%;
  height: 100%;

  .cropper-img-box {
    position: fixed;
    z-index: 150;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    .cropper-img-tool {
      position: absolute;
      z-index: 2;
      bottom: 20px;
      left: 0;
      text-align: center;
      width: 100%;

      .cropper-img-tool-btn {
        display: inline-block;
        width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        cursor: pointer;
        margin-left: 20px;
        background: #fff;
      }
    }
  }
}
</style>
```
