<template>
  <div id="form-demo">
    <h1 style="color: red;margin: 20px;">FormUI-表单提交组件</h1>

    <div class="form-list">
      <div>
        <h3>无title新建表单</h3>
        <Form ref="formData" :itemWidth="itemWidth" :labelWidth="getLabelWidth(0, unTitleformList)" :formList="unTitleformList" :value="value" @on-change="changeHandler">
          <Button type="primary" @click="submitHandler">新建表单</Button>
        </Form>
      </div>
      <div>
        <h3>有title新建表单</h3>
        <Form ref="formData" :itemWidth="itemWidth" :labelWidth="getLabelWidth(40, formList)" :formList="formList" :value="value">
          <Button type="primary" @click="submitHandler">新建表单</Button>
        </Form>
      </div>
      <div>
        <h3>编辑表单</h3>
        <Form ref="alterData" :itemWidth="itemWidth" :labelWidth="getLabelWidth(40, alterList)" :formList="alterList" :value="formData">
          <Button type="primary" @click="submitHandler">编辑表单</Button>
        </Form>
      </div>
    </div>

    <div>
      <p>1. 表单支持 input输入、number数字输入、textarea文本框、select下拉选择、radio单选框、upload上传文件</p>
      <p>date, datetime, daterange日期选择、cascader级联选择、button按钮、btnA链接、tooltip提示、text文本展示</p>

      <p class="text-item">2. 组件接收参数 props
        <span>1) formList --- 渲染表单的数据结构（对象数组, 必传） </span>
        <span>2) value --- 表单绑定数据 (单层对象, 回填数据需要传入该项) </span>
        <span>3) itemWidth --- 表单项宽度 </span>
        <span>4) labelWidth --- 表单项题目宽度 </span>
      </p>
      <p class="text-item">3. 组件触发事件 events
        <span>1) @on-change --- 表单参数输入变化触发事件，其中input触发on-blur事件，其余item触发on-change事件 </span>
      </p>
      <p class="text-item">4. 组件暴露方法
        <span>1) submit --- 表单提交事件, 使用ref调用组件submit函数，校验成功返回表单数据，校验失败返回undefined </span>
        <span>2) reset --- 整体表单清空 </span>
        <span>3) getFormData --- 获取表单绑定数据, 需要获取用户输入时很有用</span>
      </p>
      <p class="text-item" style="color: red;">5. 注意事项：
        <span>1) datas中引入的数据需要赋值给本地data中声明的数据，无法直接作为参数传给组件</span>
      </p>
    </div>

  </div>
</template>
<script>
import { alterData, getLabelWidth } from '@/libs/util'
import { unTitleformList, formList, alterList } from './data/formDemo'
import Form from '@/components/FormUI'
export default {
  name: 'FormDemo',
  components: {
    Form
  },
  data () {
    return {
      value: { radio: 1 },
      formData: {}, // 表单编辑数据
      itemWidth: 200, // 表单项宽度
      labelWidth: 100, // 表单项题目宽度
      searchList: [], // 查看表单数据结构
      unTitleformList: [],
      formList: [],
      alterList: []
    }
  },
  methods: {
    getLabelWidth,
    submitHandler () { // 表单提交事件
      const data = this.$refs.formData.submit() // 调用组件校验函数
      console.log(data)
    },
    changeHandler (data) { // form表单数据变化触发事件
      // console.log(data)
    },
    buildEditData () {
      const obj = {}
      this.alterList.forEach(item => {
        obj[item.key] = item.value
      })
      console.log(JSON.stringify(obj))
      this.formData = obj
    }
  },
  created () {
    this.formList = [].concat(formList)
    this.unTitleformList = [].concat(unTitleformList)
    this.alterList = [].concat(alterList)
    this.buildEditData()
  }
}
</script>

<style lang="less" scoped>
#form-demo {
  Button {
    display: block;
  }
  .form-list {
    display: flex;
    > div {
      padding-left: 20px;
      width: 450px;
      border-left: 1px solid grey
    }
  }
}
div p {
  margin: 15px;
}
p.text-item span {
  display: block;
  margin: 15px;
  margin-left: 20px;
}
</style>
