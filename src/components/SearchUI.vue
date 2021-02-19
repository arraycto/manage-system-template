<template>
  <div id="search-ui">
    {{searchForm}}
    <Form ref="searchForm" inline :model="searchForm" @submit.native.prevent>
      <FormItem v-for="(item, index) in searchList" :key="index" :label="getLabel(item)" :label-width="getLabelWidth(item)">

        <!-- 气泡提示搜索框 -->
        <Poptip v-if="item.type === 'poptip'" title="选择搜索字段" placement="bottom-start" :class="popperShow" @on-popper-show="popperToggleHandler('show')" @on-popper-hide="popperToggleHandler">
          <Input v-model="searchForm[item.key]" class="shadow" prefix="ios-search" @click.native="popperTriggerHandler" @on-enter="searchHandler" placeholder="请选择搜索字段并输入搜索条件" :style="{width: (item.width || 300) + 'px'}" />
          <div slot="content">
            <Button v-for="(v, i) in item.opts" :type="searchForm[item.keywordKey] === v.key ? 'primary' : 'default'" :key="i" size="small" style="margin: 5px;" @click="keywordLabelChangeHandler(item.keywordKey, v.key, item.key)">{{ v.label }}</Button>
          </div>
        </Poptip>

        <!-- text输入搜索框 -->
        <Input v-else-if="item.type === 'input'" :maxlength="item.max" v-model="searchForm[item.key]" :disabled="item.disabled || false" :placeholder="item.placeholder || `请输入${item.label || ''}`" :style="{ width: itemWidth + 'px' }" :clearable="item.clearable" @on-blur="searchChange($event, item.key)" />

        <Select v-else-if="item.type === 'select'" v-model="searchForm[item.key]" :placeholder="item.placeholder || `请选择${item.label || ''}`" :disabled="item.disabled || false" :style="{ width: itemWidth + 'px' }" :clearable="item.clearable" :filterable="item.filterable" :multiple="item.multiple" @on-select="selectHandler($event, item.key)" @on-change="searchChange($event, item.key)">
          <Option v-for="(childItem, childIndex) in item.children" :key="childItem.key" :tag="childItem.key" :value="modifySelectValue(childItem.value, childIndex, childItem.key, item.key)">{{childItem.value}}</Option>
        </Select>

        <div v-else-if="item.type === 'button'">
          <Button type="primary" :disabled="item.disabled" :style="{ width: (item.width) + 'px' }" @click="$emit('on-click', item.key, searchData)">{{ item.title }}</Button>
        </div>

        <DatePicker v-else-if="item.type === 'daterange'" class="date-picker" type="daterange" :value="dateSave(item.key)" :disabled="item.disabled || false" :options="item.options" :placeholder="item.placeholder || `请输入${item.label || ''}`" :format="item.format" :style="{ width: (item.width || 220) + 'px' }" @on-change="dateChange($event, item.key)"></DatePicker>

        <Tooltip v-if="item.tips" placement="top-start" style="margin:0 10px" max-width="300">
          <Icon color="#9A99A3" type="ios-help-circle" :style="{ fontSize: '14px' }" />
          <div slot="content">
            <p v-for="(item, index) in item.tips" :key="index">{{item}}</p>
          </div>
        </Tooltip>

      </FormItem>
      <!-- 暴露插槽, 可自定义查询按钮 -->
      <slot></slot>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'SearchUI',
  props: {
    showLabel: {
      type: Boolean,
      default: false
    },
    itemWidth: { // 表单项宽度
      type: Number,
      default: 220
    },
    labelWidth: { // 标签宽度
      type: Number,
      default: 120
    },
    searchList: { // 表单结构
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => { }
    },
    initValue: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      searchForm: {}, // 查询条件
      searchData: {}, // 传给父组件的数据内容
      popperShow: '', // 控制 poptip 的显示
      selectKeyValue: {}, // 记录select中 key - value 对应值， { key: {childrenKey: childrenValue, childrenKey1: childrenValue1}}
      strArr: ['Â', 'È', 'Ê', 'Ë', 'Î', 'Û', 'Ç', 'Œ', 'Æ', '€'] // 区分optionValue 添加特殊字符
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val && Object.keys(val).length > 0) {
          let keys = Object.keys(val)
          keys.forEach(key => {
            const type = this.searchList.filter(item => item.key === key)[0].type === 'select'
            const data = (this.selectKeyValue[key] && this.selectKeyValue[key][val[key]])
            let ininData = ''
            if (this.initValue && this.initValue[key]) {
              let valueArr = this.initValue[key].split('ÛÛ')
              ininData = valueArr[0] + (valueArr[1] ? this.strArr[+valueArr[1]] : this.strArr[0])
            }
            this.$set(this.searchForm, key, type ? data || ininData : val[key])
            this.searchData[key] = val[key]
            console.log(this.searchForm, key, type, data, val[key])
          })
        }
      }
    }
  },
  methods: {
    getLabel (item) {
      if (this.showLabel) return item.label || ''
      return ''
    },
    getLabelWidth (item) {
      if (this.showLabel) return item.labelWidth || 0
      return 0
    },
    reset () { // 表单重置
      this.$refs.searchForm.resetFields()
      this.searchForm = {}
      this.searchData = {}
    },
    dateChange (e, key) {
      // 处理日期格式
      let data = typeof e === 'string' ? e : e.join(',')
      this.$set(this.searchForm, key, data)
      this.searchHandler()
    },
    dateSave (key) { // value日期格式调整
      const date = this.searchForm[key]
      if (date && !Array.isArray(date)) {
        return date.split(',')
      } else {
        return date
      }
    },
    searchHandler () {
      // 条件查询事件
      this.$emit('on-search', this.exportData())
    },
    selectHandler (selObj, key) { // iview 4.1.0+ 版本使用，select事件兼容 select模糊查询
      console.log(selObj, key)
      if (selObj.tag || selObj.tag === 0) {
        this.searchData[key] = selObj.tag
      } else {
        this.searchData[key] = ''
      }
    },
    searchChange (value, key) { // input-blur / select-change时触发
      if (!value) this.searchData[key] = ''
      this.searchHandler()
    },
    exportData () { // 导出父组件使用的数据，统一处理
      let formKeysList = Object.keys(this.searchForm)
      let dataKeysList = Object.keys(this.searchData)
      let otherFormData = {}

      // 下拉选择的元素经过特殊处理, 真实key值在 searchData 中 
      formKeysList.forEach(key => {
        let arr = this.searchList.filter(item => item.key === key)
        const type = arr.length ? arr[0].type === 'select' : false
        // 将下列选择的元素从 searchForm 剔除
        if (!dataKeysList.includes(key) || !type) {
          otherFormData[key] = this.searchForm[key]
        }
      })
      return { ...this.searchData, ...otherFormData }
    },
    // 原生的IView搜索功能, key和value都可被搜索; 现改为只能搜索value; 
    // 例如: {key:'111', value:'北京'} 搜索111无内容
    modifySelectValue (value, index, cKey, key) {
      let indexArr = ('' + index).split('')
      indexArr.forEach(item => {
        value += '' + this.strArr[+item]
      })

      if (key in this.selectKeyValue) {
        this.selectKeyValue[key]['' + cKey] = value
      } else {
        this.selectKeyValue[key] = {}
      }
      return value
    },
    keywordLabelChangeHandler (key, val, keyword) {
      this.$set(this.searchForm, key, val)
      if (this.searchForm[keyword]) {
        // 如果已经输入了关键字，改变选项时就进行查询
        this.searchHandler()
      }
    },
    popperTriggerHandler (ev) {
      // 如果poptip已经出现了,那么就不再触发该事件
      if (this.popperShow) {
        ev.stopPropagation()
      }
    },
    popperToggleHandler (type) {
      // poptip input 样式控制
      if (type === 'show') {
        this.popperShow = 'popper-show'
      } else {
        this.popperShow = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
#search-ui {
  .date-picker {
    .ivu-input {
      font-size: 12px;
    }
  }
}
</style>
