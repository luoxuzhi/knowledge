## 2.el-table自动计算最大高度

```vue
<script type="text/ecmascript-6">
export default {
  methods:{
    addClick(){
      this.$bus.$emit('add-click')
    },
    resizeHandler () {
      // tableWrapper是el-table外面的容器
      // let { height } = this.$refs.tableWrapper.getBoundingClientRect() 
      let  height  = this.$refs.tableWrapper.clientHeight // 以下写法兼容IE
      height === 500 ? this.maxHeight = 500 : this.maxHeight = 300
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted(){
    this.resizeHandler()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>
```