<template>
  <div class="inline">
    <ul class="ivu-cascader-menu">
      <CheckboxGroup v-model="checkBoxGroup" @on-change="handleCheckBoxChange">
        <li class="ivu-cascader-menu-item" v-for="(item, index) in data" :key="index" :class="{'ivu-cascader-menu-item-active': selected == index}">
          <!-- 多选checkbox -->
          <!-- 全局多选或者当前项为多选 -->
          <template v-if="multiple || item.multiple">
            <Checkbox :value="checkBoxGroup.indexOf(index) >= 0" :disabled="item.disabled" @click.native.stop="handleCheckBoxClick" :label="index" class="w-full">
              {{item.label}}
              <!-- 子级箭头标记 -->
              <i class="ivu-icon ivu-icon-ios-arrow-forward" v-if="item.children && item.children.length"></i>
            </Checkbox>
          </template>
          <!-- 单选p -->
          <template v-else>
            <p @click="handleClick(index)">
              {{item.label}}
              <!-- 子级箭头标记 -->
              <i class="ivu-icon ivu-icon-ios-arrow-forward" v-if="item.children && item.children.length"></i>
            </p>
          </template>
        </li>
      </CheckboxGroup>
    </ul>
    <casMultiPanel :value="value" @handleGetSelected="selectedData" v-if="children && children.length" :data="children" :multiple="multiple" @handleClose="handleClose"></casMultiPanel>
  </div>
</template>
<script>
import Emitter from 'view-design/src/mixins/emitter'
export default {
  name: 'casMultiPanel',
  mixins: [Emitter],
  props: {
    // 原始数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 默认绑定的值
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 当前已选择项
      checkBoxGroup: [],
      // 子组件数据
      children: [],
      // 单选组件被选中高亮
      selected: -1
    }
  },
  watch: {
    // 重新渲染组件
    data (val) {
      this.checkBoxGroup = []
      this.handleCheckBoxChange([])
      this.selected = -1
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    // 获取选择项数据
    selectedData (val = []) {
      // 获取当前组件内选择的值
      const arr = this.checkBoxGroup.map((v, k) => {
        return {
          label: this.data[v].label,
          value: this.data[v].value
        }
      })
      // 合并子组件传递的参数,并emit到父组件
      this.$emit('handleGetSelected', arr.concat(val))
    },
    // 防止时间冒泡到父组件handleClose事件
    handleCheckBoxClick () {},
    // checkGroup变更事件,返回已选中的数组
    handleCheckBoxChange (arr) {
      // 清空记录
      this.children = []
      // 遍历选择的数据
      arr.map((k, v) => {
        // 存在children字段则记录
        if (this.data[k].children && this.data[k].children.length) {
          // 记录数据并渲染到子组件
          Array.prototype.push.apply(this.children, this.data[k].children)
        } else if (!this.multiple && !this.data[k].multiple) {
          this.handleClose()
        }
      })
      // 触发父组件emit
      this.selectedData()
    },
    // 单选组件点击事件
    handleClick (index) {
      this.selected = index
      this.checkBoxGroup = [index]
      this.handleCheckBoxChange([index])
    }
  },
  created () {
    // 回填数据
    this.$nextTick(_ => {
      this.value.map(v => {
        this.data.map((val, k) => {
          if (v.value !== val.value) return
          // 全局多选或者当前项为多选
          if (this.multiple || v.multiple) {
            Array.prototype.push.apply(this.checkBoxGroup, [k])
            this.handleCheckBoxChange(this.checkBoxGroup)
          } else {
            this.handleClick(k)
          }
        })
      })
    })
  }
}
</script>
<style>
.inline {
  display: inline-block;
}
</style>
