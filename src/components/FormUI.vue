<template>
  <div class="form-ui">
    {{formData}}
    <Form ref="formData" :model="formData" :disabled="disabled" @submit.native.prevent :label-width="labelWidth" :label-position="labelPosition" :show-message="true" :label-colon="labelColon">
      <!-- 表单项设置 inline 可以让几个表单处于同一行, 如需换行, 则添加一个表单项 {type: 'br'} -->
      <FormItem v-for="(item, index) in formList" :class="[{'inline': item.inline, 'br': item.type == 'br'}]" :prop="item.key" :key="index" :label="item.label" :label-width="item.labelWidth" :rules="getFormItemRules(item)">

        <template v-if="item.type === 'input'">
          <Input type="text" v-model="formData[item.key]" :placeholder="item.placeholder || `请输入${item.label}`" :style="{ width: (item.width || itemWidth) + 'px' }" :clearable="item.clearable" :maxlength="item.max" :disabled="item.disabled" @on-blur="$emit('on-change', item.key, formData[item.key])">
          <span slot="prepend" v-if="item.prepend">{{item.prepend}}</span>
          <span slot="append" v-if="item.append">{{item.append}}</span>
          </Input>
        </template>

        <template v-else-if="item.type === 'number'">
          <!-- 设置 type="number" 在火狐浏览器中输入小数会被标红, 因此使用 Input 的 number 属性将输入转换为数字 -->
          <Input :number="true" v-model="formData[item.key]" :placeholder="item.placeholder" :style="{ width: item.width || itemWidth + 'px' }" :clearable="item.clearable" :disabled="item.disabled" @on-blur="$emit('on-change', item.key, formData[item.key])">
          <span slot="prepend" v-if="item.prepend">{{item.prepend}}</span>
          <span slot="append" v-if="item.append">{{item.append}}</span>
          </Input>
        </template>

        <template v-else-if="item.type === 'textarea'">
          <Input type="textarea" v-model="formData[item.key]" :placeholder="item.placeholder" :style="{ width: item.width || itemWidth + 'px' }" :clearable="item.clearable" :maxlength="item.max" :rows="item.rows || 2" @on-blur="$emit('on-change', item.key, formData[item.key])" />
        </template>

        <template v-else-if="item.type === 'select'">
          <Select v-model="formData[item.key]" :placeholder="item.placeholder" :style="{width: item.width || itemWidth + 'px'}" :clearable="item.clearable" :filterable="item.filterable" :multiple="item.multiple" :max-tag-count="item.maxTagCount" :disabled="item.disabled" @on-change="$emit('on-change', item.key, formData[item.key])">
            <Option v-for="opt in item.opts" :key="opt.key" :value="opt.key" :disabled="opt.disabled">{{opt.value}}</Option>
          </Select>
        </template>

        <template v-else-if="['date', 'datetime', 'daterange'].includes(item.type)">
          <DatePicker :type="item.type" :placeholder="item.placeholder" :format="item.format" :style="{ width: item.width || itemWidth + 'px'}" :value="dateSave(item.key)" :options="item.options" @on-change="dateChange($event, item.key)"></DatePicker>
        </template>

        <template v-else-if="item.type === 'upload'">
          <Upload :action="item.action" :show-upload-list="false" :max-size="item.maxSize || 10000" :format="item.format" :before-upload="beforeUpload(item.key, item.format)" :headers="{ 'content': 'application/x-www-form-urlencoded' }" :on-success="uploadSuccess" :on-exceeded-size="exceededSize" :on-format-error="formatError" :data="{ ...fileData, key: item.key }" :style="{width: item.width || itemWidth + 'px', display: 'inline-block'}">
            <Tooltip class="upload-icon" :content="formData[item.key]" :max-width="200" :disabled="!formData[item.key]">
              <Input class="upload" disabled v-model="formData[item.key]" icon="ios-cloud-upload-outline" :style="{ width: itemWidth + 'px'}" placeholder="上传文件名" />
            </Tooltip>
          </Upload>
        </template>

        <template v-else-if="item.type === 'radio'">
          <RadioGroup v-model="formData[item.key]" @on-change="$emit('on-change', item.key, formData[item.key])">
            <Radio v-for="opt in item.opts" :label="opt.key" :key="opt.key">{{opt.value}}</Radio>
          </RadioGroup>
        </template>

        <template v-else-if="item.type === 'button'">
          <Button type="primary" :disabled="item.disabled" @click="$emit('on-click', item.key)" :style="{width: item.width || itemWidth + 'px'}">{{ item.title }}</Button>
        </template>

        <!-- a 标签 -->
        <template v-else-if="item.type === 'btnA'">
          <div>
            <a javascript=":;" @click="$emit('on-click', item.key, item)">{{ item.value }}</a>
          </div>
        </template>

        <!-- 级联 -->
        <template v-else-if="item.type === 'cascader'">
          <CascaderMulti v-model="formData[item.key]" :data="item.children" :placeholder="item.placeholder || `请选择${item.label}`" :style="{ width: item.width || itemWidth + 'px' }" :clearable="item.clearable" :disabled="item.disabled" :filterable="item.filterable" @on-change="$emit('on-change', item.key, formData[item.key])" />
        </template>

        <!-- 文字展示 -->
        <template v-else-if="item.type == 'text'">
          <span>{{item.value}}</span>
        </template>

        <template v-else-if="item.type == 'tooltip'">
          <Tooltip v-if="item.tips" :transfer="true" max-width="300">
            <Icon type="ios-information-circle-outline" />
            <div slot="content">
              <p v-for="(tip, index) in item.tips" :key="index">{{tip}}</p>
            </div>
          </Tooltip>
        </template>
        
      </FormItem>
      <!-- 暴露插槽 -->
      <slot></slot>
    </Form>
  </div>
</template>

<script>
import { getFormItemRules } from '@/libs/validator'

export default {
  name: 'FormUI',
  props: {
    itemWidth: { // 表单项宽度
      type: Number,
      default: 290
    },
    labelWidth: { // 表单项标题宽度
      type: Number,
      default: 100
    },
    labelColon: { // 是否在label后加冒号
      type: Boolean,
      default: false
    },
    formList: { // 表单数据结构
      type: Array,
      required: true,
      default: () => []
    },
    value: { // 表单编辑、初始化数据
      type: Object,
      default: () => { }
    },
    fileData: { // 上传文件的额外参数
      type: Object,
      default: () => { }
    },
    labelPosition: { // 对齐方式
      type: String,
      default: 'right'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {}, // 表单绑定数据
      // 文件上传相关
      fileKey: '',
      format: []

    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val && Object.keys(val).length > 0) {
          this.formData = Object.assign({}, this.value)
        }
      }
    }
  },
  methods: {
    getFormItemRules (item) {
      return getFormItemRules(item, this.formList, this.formData)
    },

    // 文件上传前，保存上传文件键值
    beforeUpload (key, format = []) {
      this.fileKey = key
      this.format = format
    },
    /**
     * 文件上传成功回调函数
     * res -> 返回数据
     * file -> 上传文件
     */
    uploadSuccess (res, file) {
      // res.data.key 针对一个表单中的多文件上传 此时this.fileKey失效
      if (+res.code === 200) {
        this.fileKey = res.data.key || this.fileKey
        this.$set(this.formData, this.fileKey, file.name) // 保存上传文件名，用作表单校验
        this.$emit('on-file', file, res, this.fileKey)
      } else {
        this.$Message.error(res.msg || '上传失败，请重新上传')
      }
    },
    exceededSize (file) {
      this.$Message.error('上传文件大小超出限制')
    },
    formatError (file) {
      let str = ''
      if (this.format.length) {
        str = this.format.join(',')
      }
      let errorStr = str ? '请上传后缀为' + str + '的文件' : '上传文件格式错误，请重新上传'
      this.$Message.error(errorStr)
    },
    dateChange (e, key) { // 处理日期格式
      let data = typeof e === 'string' ? e : e[0] ? e.join(',') : ''
      this.$set(this.formData, key, data)
    },
    dateSave (key) { // value日期格式调整
      const date = this.formData[key]
      if (date && !Array.isArray(date) && date.indexOf(',') > -1) { // 时间段
        return date.split(',')
      } else { // 时间点
        return date
      }
    },
    stringTrim (str) {
      if (typeof str === 'string') {
        return str.trim()
      } else {
        return str
      }
    },
    submit () { // 表单提交函数
      let data = {}
      this.$refs.formData.validate(valid => {
        if (valid) {
          data = Object.assign({}, this.formData)
          Object.keys(this.formData).forEach(item => {
            data[item] = this.stringTrim(this.formData[item])
          })
        }
      })
      return data
    },
    reset () { // 表单重置
      if (this.formList.length) {
        this.$refs.formData.resetFields()
        this.formData = {}
      }
    },
    // 获取当前表单数据
    getFormData () {
      return this.formData
    }
  }
}
</script>

<style lang="less" scoped>
.form-ui {
  .inline {
    display: inline-block;
  }
  .br {
    display: block;
    margin: 0;
    padding: 0;
    height: 0;
  }
  .upload {
    & /deep/ .ivu-input-disabled {
      color: #9a99a3;
      background-color: #f5f7fa;
      cursor: pointer;
    }
  }
  .upload-icon {
    & /deep/ .ivu-input-icon {
      color: #5c86ff;
      font-weight: bold;
      font-size: 24px;
      margin-top: 3px;
    }
  }
}
</style>
