## 5.富文本上传原装图片、裁剪图片、视频到文件系统

1. 此富文本框在`quill-editor`的基础上进行封装出来，都是上传到`koa2`服务器上

* 文本编辑器的配置文件`quill-config.js`
```js
const handlers = {
  video: (value) => {
    if (value) {
      document.querySelector('.rich-text-video input').click()
    } else {
      this.quill.format('video', false)
    }
  }
}

const toolbarOptions = [
  ['bold', 'italic'], // 加粗 斜体 下划线 删除线
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  // [{ script: "sub" }, { script: "super" }], // 上标/下标
  // [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  // [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  // [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]

export default {
  placeholder: '您想说点什么？',
  modules: {
    toolbar: {
      // container: toolbarOptions,
      container: '#toolbar',
      handlers
    },
    imageDrop: true,
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      }
    }
  }
}
```

* `MainEditor.vue`代码如下，此组件[参考这里](https://github.com/lihualong/quilleditor)

```vue
<template>
  <div class="editor-wrapper">
    <!-- 图片上传组件辅助，使用自定义上传方法从而调用封装的响应拦截-->
    <tms-upload
      class="rich-text-image"
      :action="imageUrl"
      :show-file-list="false"
      :on-success="uploadImageSuccess"
      :on-error="uploadImageError"
      :before-upload="beforeUpload"
      :http-request="uploadImage"
      accept="image/*"
    ></tms-upload>
    <!-- 视频上传组件辅助 -->
    <tms-upload
      class="rich-text-video"
      :action="videoUrl"
      :show-file-list="false"
      :on-success="uploadVideoSuccess"
      :on-error="uploadVideoError"
      :before-upload="beforeUpload"
      :http-request="uploadVideo"
      accept="video/mp4"
    ></tms-upload>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      class="broadcast-editor"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
      <!-- 这里使用插槽重写的原因是editorOption.modules.toolbar.handlers 并不能访问外部组件this，从而无法调用其它组件的方法 -->
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats">
          <button type="button" class="ql-bold"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-italic"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-strike"></button>
        </span>
        <!-- <span class="ql-formats">
          <button type="button" class="ql-blockquote"></button>
        </span>-->
        <!-- <span class="ql-formats">
          <button type="button" class="ql-code-block"></button>
        </span>-->
        <span class="ql-formats">
          <button type="button" class="ql-header" value="1"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-header" value="2"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="ordered"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-list" value="bullet"></button>
        </span>
        <!-- <span class="ql-formats">
          <button type="button" class="ql-script" value="sub"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-script" value="super"></button>
        </span>-->
        <span class="ql-formats">
          <button type="button" class="ql-indent" value="-1"></button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-indent" value="+1"></button>
        </span>
        <!-- <span class="ql-formats">
          <button type="button" class="ql-direction" value="rtl"></button>
        </span>-->

        <span class="ql-formats">
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-color">
            <option selected="selected"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value="#ffffff"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-background">
            <option value="#000000"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option selected="selected"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
        </span>
        <!-- <span class="ql-formats">
          <select class="ql-font">
            <option selected="selected"></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>-->
        <span class="ql-formats">
          <select class="ql-align">
            <option selected="selected"></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <!-- <span class="ql-formats">
          <button type="button" class="ql-clean"></button>
        </span>-->
        <span class="ql-formats">
          <button type="button" class="ql-link"></button>
        </span>
        <span class="ql-formats">
          <button type="button" @click="imgClick">
            <svg viewBox="0 0 18 18">
              <rect class="ql-stroke" height="10" width="12" x="3" y="4" />
              <circle class="ql-fill" cx="6" cy="7" r="1" />
              <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12" />
            </svg>
          </button>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-video"></button>
        </span>
      </div>
    </quill-editor>
    <!-- v-model="showCrop"
      :width="width"
      :height="height"
      :uploadUrl="uploadUrl"
    @uploadSuccess="onUploadSuccess"-->
    <!-- <crop-upload ref="cropUpload"></crop-upload> -->
  </div>
</template>
<script>
import { postFile } from '@/utils/fetch'
import CropUpload from './CropUpload.vue'
import quillConfig from './quill-config.js'
import { quillEditor, Quill } from 'vue-quill-editor'
// ImageDrop 在IE不支持
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  props: {
    value: String,
    imageUrl: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      content: this.value,
      quillUpdateImg: false, // 是否显示loading动画
      editorOption: quillConfig,
      showCrop: false
    }
  },
  components: { quillEditor, CropUpload },
  mounted () {
    this.content = this.value
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    /* 裁切上传成功 res根据上传接口值获取 */
    onUploadSuccess (res) {
      this.editor.focus()
      this.editor.insertEmbed(
        this.editor.getSelection().index,
        'image',
        res.url
      )
    },
    /* 点击上传图片按钮 */
    imgClick () {
      document.querySelector('.rich-text-image input').click()
      // this.$refs.cropUpload.inputLabelClick()
    },
    onEditorChange () {
      this.$emit('input', this.content)
    },

    beforeUpload () {
      this.quillUpdateImg = true
    },
    uploadImage (content) {
      return postFile(this.imageUrl, content.file)
    },
    uploadImageSuccess (res, file) {
      // res为服务器返回的数据
      if (res.code === 200) {
        this.insertAfterUploadSuccess('image', res.url)
      }
      this.quillUpdateImg = false
    },
    uploadVideo (content) {
      return postFile(this.videoUrl, content.file)
    },
    uploadVideoSuccess (res, file) {
      if (res.code === 200) {
        this.insertAfterUploadSuccess('video', res.url)
      }
      this.quillUpdateImg = false
    },
    insertAfterUploadSuccess (type, url) {
      let quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      quill.focus()
      let length = quill.getSelection().index
      // 插入图片或视频  url为服务器地址
      if (type === 'image') {
        quill.insertEmbed(length, 'image', url)
      } else {
        quill.insertEmbed(length, 'video', url)
      }
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    uploadImageError () {
      this.quillUpdateImg = false
      this.message.error('图片插入失败')
    },
    uploadVideoError () {
      this.quillUpdateImg = false
      this.message.error('视频插入失败')
    }
  }
}
</script>

<style lang="stylus">
/* 加入样式则汉化，不加样式不汉化 */
.rich-text-image, .rich-text-video {
  display: none;
}

.broadcast-editor {
  line-height: normal !important;
  height: 300px;
  width: 800px;

  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 0;
  }
}

.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '12px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
```