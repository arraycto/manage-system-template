<template>
  <div class="form-active-ui">
    <Form ref="FormActiveUI" :class="[formStatus ? '': 'detail-active-form']" @submit.native.prevent :model="formActive" :label-position="labelPosition" :label-colon="formStatus ? labelColon : true" :label-width="labelWidth" v-if="formListActive.length > 0">
      <div style="text-align: left;margin-top: 20px;" v-if="!hasDashedBtn && formStatus && formListActive.length > 0" :class="['add-btn', +dataLen > 0 ? '' : 'add-btn-none']">
        <Icon type="md-add" color="#5C86FF" class="add-icon" @click="addHandler" />
        <a href="javascript:void(0)" style="color: #5C86FF;" @click="addHandler">{{addTxt}}</a>
      </div>
      <Button type="dashed" long v-if="hasDashedBtn && formStatus && formListActive.length > 0" @click="addHandler" icon="md-add" style="width: 295px; color: #2d8cf0;">{{addTxt}}</Button>
      <FormItem :label="formLabel" v-if="formStatus">
        <slot name="active-tips"></slot>
        <div v-if="tipsContent.length">
          <div class="active-tips-content">
            <p v-for="(item, index) in tipsContent" :key="index">{{item}}</p>
          </div>
        </div>
        <div v-for="(activeItem, activeIndex) in formActive.items" :key="activeIndex" class="active-item">
          <div v-if="activeItem.status" class="form-item-active">
            <FormItem v-for="(item, index) in formListActive" :key="index" :label="item.label" :prop="'items.' + activeIndex + '.' + item.key" :rules="{
                required: item.required,
                trigger: 'change',
                message: ' ',
                max: item.max,
                type: (item.type === 'select' && item.multiple) || item.type === 'cascaderMuti' || item.dataType === 'array' ? 'array' : 'string'
              }" :style="{ display: 'inline-block', width: labelWidth + itemWidth + 'px' }">
              <Select v-if="item.type === 'select'" v-model="formActive['items'][activeIndex][item.key]" :placeholder="item.placeholder" :clearable="item.clearable" :filterable="item.filterable" :multiple="item.multiple" :style="{ width: itemWidth + 'px' }" @on-change="$emit('on-change', formActive['items'], item.key, formActive['items'][activeIndex][item.key])">
                <Option v-for="childItem in item.children" :key="childItem.key" :value="childItem.key + ''">{{childItem.value}}</Option>
              </Select>
              <template v-else-if="item.type === 'input'">
                <Input v-model="formActive['items'][activeIndex][item.key]" :placeholder="item.placeholder" :clearable="item.clearable" :maxlength="item.max" type="text" :style="{ width: itemWidth + 'px' }" @on-blur="$emit('on-blur', formActive['items'], activeIndex, item.key)">
                <span slot="prepend" v-if="item.prepend">{{item.prepend}}</span>
                <span slot="append" v-if="item.append">{{item.append}}</span>
                </Input>
              </template>
              <Input v-else-if="item.type === 'number'" v-model="formActive['items'][activeIndex][item.key]" :placeholder="item.placeholder" :clearable="item.clearable" type="number" :style="{ width: itemWidth + 'px' }" @on-blur="$emit('on-blur', formActive['items'], activeIndex, item.key)">
              <span slot="prepend" v-if="item.prepend">{{item.prepend}}</span>
              <span slot="append" v-if="item.append">{{item.append}}</span>
              </Input>
              <div v-else-if="item.type === 'daterange'">
                <DatePicker type="daterange" :placeholder="item.placeholder" :format="item.format" :style="{ width: itemWidth + 'px' }" :value="dateSave(activeIndex, item.key)" @on-change="dateChange($event, activeIndex, item.key)">
                </DatePicker>
              </div>
              <div v-else-if="item.type === 'cascaderMuti'">
                <cascaderMulti v-model="formActive['items'][activeIndex][item.key]" :data="item.children" :placeholder="item.placeholder" :style="{ width: itemWidth + 'px' }" :clearable="item.clearable" :disabled="item.disabled" :filterable="item.filterable" style="display: inline-block;" @on-change="$emit('on-change', item.key, formActive['items'][activeIndex][item.key], activeIndex)"></cascaderMulti>
              </div>
              <div v-else-if="item.type === 'button'">
                <Button type="primary" @click="$emit('on-click', activeIndex)" style="margin-left: 15px;">{{item.title}}</Button>
              </div>
              <div v-else-if="item.type === 'tooltip'">
                <Tooltip transfer :max-width="item.itemWidth ? item.itemWidth : 300" v-if="item.tips" style="margin-left: 10px;">
                  <Icon type="ios-information-circle-outline" :style="{ fontSize: '14px'}" />
                  <div slot="content" :style="{ width: item.itemWidth + 'px' || '300px' }">
                    <p v-for="(item, index) in item.tips" :key="index" style="display: block; margin: 5px;">{{item}}</p>
                  </div>
                </Tooltip>
              </div>
              <div v-else :style="{ width: itemWidth * 2 + 100 + 'px' }">
                <Upload :action="item.action" :show-upload-list="false" :max-size="item.maxSize || 10000" :format="item.format" :before-upload="beforeUpload(item.key, item.format)" :headers="{ 'content': 'application/x-www-form-urlencoded' }" :on-success="uploadSuccess" :on-exceeded-size="exceededSize" :on-format-error="formatError" :data="{ key: activeIndex }" style="display: inline-block;">
                  <Input class="upload" disabled v-model="formActive['items'][activeIndex][item.key]" icon="ios-cloud-upload-outline" :style="{ width: itemWidth + 'px' }" placeholder="上传文件名" />
                </Upload>
                <Tooltip transfer max-width="300" v-if="item.tips">
                  <Icon type="ios-information-circle-outline" :style="{ fontSize: '14px', marginLeft: '10px' }" />
                  <div slot="content">
                    <p v-for="(item, index) in item.tips" :key="index">{{item}}</p>
                  </div>
                </Tooltip>
              </div>
            </FormItem>
            <p v-if="activeItem.isFirst && tipsTxt" class="active-first-tips">{{tipsTxt}}</p>
            <!-- 动态表单项删除icon -->
            <div class="item-delete-icon">
              <Icon v-if="formStatus" type="md-close" class="delete-btn" size="26" @click="deleteHandler(activeIndex)" />
            </div>
          </div>
        </div>
      </FormItem>
      <!-- 查看 -->
      <template v-else>
        <div v-for="(item, index) in formListActive" :key="index" class="detail-active-item">
          <FormItem v-for="(childItem, childIndex) in item" :label="childItem.label" :key="childIndex" :style="{ display: 'inline-block', width: labelWidth + itemWidth + 'px' }">
            <!-- 文件下载 -->
            <template>
              <a :href="childItem.download" target="_blank" v-if="childItem.download">{{childItem.value}}</a>
              <!-- 常规文本 -->
              <p v-else :style="{ display: 'inline-block', width: itemWidth + 'px', 'word-break': 'all' }">{{childItem.value}}</p>
              <span v-if="+index === 0 && tipsTxt" style="margin-left: 20px;">{{tipsTxt}}</span>
            </template>
          </FormItem>
        </div>
      </template>
    </Form>
  </div>
</template>

<script>
export default {
  // 动态增减表单项
  name: 'FormActiveUI',
  props: {
    formListActive: { // 表单数据结构
      type: Array,
      default: () => []
    },
    formLabel: { // 表单项名字
      type: String,
      default: ''
    },
    addTxt: { // 动态表单添加 文字提示
      type: String,
      default: 'add'
    },
    labelWidth: { // 表单项题目宽度
      type: Number,
      default: 120
    },
    itemWidth: { // 表单项宽度
      type: Number,
      default: 160
    },
    value: { // 表单编辑、初始化数据
      type: Array,
      default: () => []
    },
    formStatus: { // 是否是查看表单，默认true 为非查看
      type: Boolean,
      default: true
    },
    required: { // 是否对整体进行校验
      type: Boolean,
      default: true
    },
    tipsTxt: { // 第一条提示文案
      type: String,
      default: ''
    },
    tipsContent: { // 提示文案
      type: Array,
      default: () => []
    },
    labelPosition: { // 对齐方式
      type: String,
      default: 'right'
    },
    hasDashedBtn: {
      type: Boolean,
      default: true
    },
    labelColon: { // 是否在label后加冒号
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      index: 0,
      fileKey: '',
      formKey: {}, // 存储键值
      format: [],
      formActive: {
        items: []
      },
      deleteBtn: []
    }
  },
  computed: {
    dataLen () {
      return this.getFormData().length
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val.length > 0) {
          let arr = [].concat(this.value)
          arr.forEach(item => {
            this.$set(item, 'status', 1)
          })
          this.$set(this.formActive, 'items', [].concat(arr))
          this.firstItem()
        }
      },
      immediate: true
    }
  },
  methods: {
    addHandler () { // 添加一行
      this.index++
      this.formActive.items.push({
        ...this.formKey,
        status: 1
      })
      this.$emit('on-add')
      this.firstItem()
    },
    deleteHandler (index) { // 删除一行
      this.$set(this.formActive.items[index], 'status', 0)
      this.firstItem()
      this.$emit('on-delete', this.formActive.items, index)
    },
    firstItem () { // 标记第一个展示项
      let flag = false
      let lastNum = 0
      this.formActive.items.forEach((item, index) => {
        item.isFirst = false
        item.isLast = false
        if (item.status && !flag) {
          item.isFirst = true
          flag = true
        }
        if (item.status) {
          lastNum = index
        }
      })
      this.$set(this.formActive.items[lastNum], 'isLast', true)
      this.$emit('on-active', this.getFormData())
    },
    reset () { // 表单重置
      if (this.formListActive.length > 0) {
        this.$refs.FormActiveUI.resetFields()
        this.$set(this.formActive, 'items', [])
      }
    },
    beforeUpload (key, format) { // 文件上传前，保存上传文件键值
      this.fileKey = key
      this.format = format
    },
    uploadSuccess (res, file) { // 文件上传成功回调函数
      // res -> 返回数据
      // file -> 上传文件
      if (+res.code === 200) {
        const index = res.data.key
        this.$set(this.formActive.items[index], this.fileKey, file.name) // 保存上传文件名，用作表单校验
        this.$set(this.formActive.items[index], 'file_result', res.data)
      } else {
        this.$Message.error(res.msg || '上传失败，请重新上传')
      }
    },
    exceededSize (file) {
      this.$Message.error('上传文件超出限制大小')
    },
    formatError (file) {
      let str = ''
      if (this.format.length) {
        str = this.format.join(',')
      }

      let errorStr = str ? '请上传后缀为' + str + '的文件' : '上传文件格式错误，请重新上传'
      this.$Message.error(errorStr)
    },
    dateChange (e, index, key) { // 处理日期格式
      this.$set(this.formActive.items[index], key, e.join(','))
    },
    dateSave (index, key) { // value日期格式调整
      const date = this.formActive.items[index][key]
      if (date) {
        return date.split(',')
      }
    },
    submit () { // 校验
      let data = {}
      const arr = this.formActive.items.filter(item => {
        delete item.isFirst
        return +item.status === 1
      })
      if (arr.length || !this.required) {
        this.$refs.FormActiveUI.validate(valid => {
          if (valid) {
            data = {
              items: arr
            }
          }
        })
      } else {
        this.$Message.error('请' + this.addTxt)
      }
      return data
    },
    // 获取当前表单数据
    getFormData () {
      const data = this.formActive.items.filter(item => +item.status === 1)
      return data
    },
    deleteBtnHanlder (flag, index) {
      this.$set(this.deleteBtn, index, flag)
    }
  },
  created () { // 初始化items
    this.formListActive.forEach(item => {
      if ((item.type === 'select' && item.multiple) || item.type === 'cascaderMuti' || item.dataType === 'array') {
        this.$set(this.formKey, item.key, [])
      } else {
        this.$set(this.formKey, item.key, '')
      }
    })
  }
}
</script>

<style lang="less" scoped>
.form-active-ui {
  // 新建 + 编辑
  & /deep/ .new-active-form {
    .ivu-form-item {
      margin: 0;
      .ivu-form-item-content {
        margin-left: 0 !important;
      }
      .delete-btn {
        // color: #d6d6e0;
        transform: rotate(-45deg);
        font-weight: bold;
        line-height: 36px;
        margin-left: 30px;
        transition: 0.1s;
      }
      .delete-btn:hover,
      .delete-btn:visited {
        cursor: pointer;
        color: #5c86ff;
      }
    }
    .form-item-active:hover {
      background: #f6f9ff;
    }
    .form-item-active {
      padding: 25px 0px;

      .active-first-tips {
        margin-left: 20px;
        display: inline-block;
      }

      .ivu-form-item-label {
        margin-right: 8px;
      }
    }
    .form-item-active:last-child {
      padding-top: 0px;
    }
    .form-item {
      width: 100%;
      border-bottom: 1px dashed #e5e6e9;
      padding-top: 25px;
    }
    .form-item:hover,
    .form-item:visited {
      background-color: #f6f9ff;
    }
    .form-item-first {
      padding-top: 20px !important;
    }
    .form-item-last {
      border: none;
    }
  }

  // 查看
  & /deep/ .detail-active-form {
    .detail-active-item {
      border-bottom: 1px dashed #e5e6e9;
      padding: 14.5px 0 15px;
      .ivu-form-item {
        height: 38px;
        display: inline-block;
        margin: 0 30px 1px 0;
        vertical-align: text-top;

        .ivu-form-item-label {
          height: 50px;
          line-height: 50px;
          padding: 0;
          font-weight: bold;
          padding-right: 9px !important;
        }

        .ivu-form-item-content {
          a {
            text-decoration: underline;
            padding: 15px;
            margin-right: 30px;
            line-height: 20px;
            display: inline-block;
          }
        }
      }
    }

    .detail-active-item:nth-last-of-type(1) {
      border: none;
      padding-bottom: 0;
    }
  }

  // 查看时的样式
  & /deep/ .form-search-ui {
    .item-label {
      label.ivu-form-item-label {
        padding-right: 9px !important;
      }
    }

    .ivu-form-item {
      display: inline-block;
      margin-bottom: 0px;
      vertical-align: bottom;

      .ivu-form-item-label {
        height: 32px;
        line-height: 32px;
        padding: 0;
        font-weight: bold;
      }
      .ivu-form-item-content {
        a {
          text-decoration: underline;
        }
      }
    }
  }
  // 添加按钮
  .add-btn {
    vertical-align: middle;
    height: 24px;
    position: relative;

    .add-icon {
      font-size: 24px;
      color: #5c86ff;
      margin: 0 10px 0 -3px;
      font-weight: bold;
    }
    a {
      position: relative;
      display: inline-block;
      top: -2px;
    }
    .add-icon:hover,
    a:hover,
    .add-icon:visited,
    a:visited {
      cursor: pointer;
    }
  }
  .add-btn-none {
    padding-top: 20px;
    .active-tips-content {
      margin-top: 20px;
      border: 1px solid #a8bfff;
      border-radius: 1px;
      background: #eff5ff;
      padding: 10px;
      width: 870px;
    }
    .form-item-active {
      margin: 20px 0px;
    }
    .form-item-active:last-of-type {
      margin-bottom: -20px;
    }
    .upload {
      & /deep/ .ivu-input-disabled {
        color: #515a6e;
        background-color: transparent;
      }
    }
  }
  .item-delete-icon {
    display: inline-block;
    margin-left: 5px;
    position: relative;
    bottom: 10px;
    .delete-btn {
      color: gray;
    }
    .delete-btn:hover,
    .delete-btn:visited {
      color: #5c86ff;
      cursor: pointer;
    }
  }
  .active-tips-content {
    margin-top: 20px;
    border: 1px solid #a8bfff;
    border-radius: 1px;
    background: #eff5ff;
    padding: 10px;
    width: 870px;
  }
  .form-item-active {
    margin: 20px 0px;
  }
  .form-item-active:last-of-type {
    margin-bottom: -20px;
  }
  // 文件上传
  & /deep/ .upload {
    & /deep/ .ivu-input-disabled {
      color: #9a99a3;
      background-color: #f5f7fa;
      cursor: pointer;
    }
    & /deep/ .ivu-input-icon {
      color: #5c86ff;
      font-weight: bold;
      font-size: 24px;
    }
  }
}
</style>
