<template>
  <div>
    <h1 style="color: red;margin: 20px;">searchUI</h1>
    <SearchUI class="search" ref="searchRef" :value="queryData" :showLabel="false" :searchList="searchList" @on-search="searchHandler">
      <Button type='primary' @click="searchHandler('searchBtn')">查询</Button>
      <Button type='primary' @click="download" class="download">导出</Button>
    </SearchUI>

    <p>条件查询组件</p>
    <div style="margin-left: 30px;">
      <p>1. 支持input输入、select下拉选择、daterange日期选择、poptip条件选择</p>
      <p>2. 默认inline展示</p>
      <p class="text-item">3. 组件传入参数 props
        <span>1) searchList --- 表单结构 (必传)</span>
        <span>2) showLabel --- 是否展示表单项标题, 默认false不展示</span>
        <span>3) itemWidth --- 表单项宽度, 默认220</span>
      </p>
      <p class="text-item">4. 组件触发事件 events
        <span>1) @on-search --- 查询条件改变, 触发查询事件, 返回查询条件对象</span>
      </p>
      <p class="text-item" style="color: red;">5. 注意事项：
        <span>1) 日期选择返回值为逗号分隔字符串，格式：'2020-10-11, 2020-10-12'</span>
        <span>2) 通过 slot 实现输入框后面的查询、导出按钮</span>
      </p>
    </div>

  </div>
</template>
<script>
import SearchUI from '@/components/SearchUI'
import { searchList } from './data/searchDemo'
export default {
  name: 'SearchDemo',
  components: {
    SearchUI
  },
  data () {
    return {
      queryData: {
        datas: '111'
      }, // 查询条件
      searchList: [] // 条件查询表单结构
    }
  },

  methods: {
    searchHandler (query) { // 条件查询函数
      if (query === 'searchBtn') { // 点击查询按钮才查询
        this.queryData = this.$refs.searchRef.exportData()
      } else { // 条件改变就查询
        this.queryData = query
      }
      console.log(JSON.stringify(this.queryData))
    },
    download () {
      console.log('下载')
    }
  },
  created () {
    this.searchList = [].concat(searchList)
  }
}
</script>

<style lang="less" scoped>
div p {
  margin: 15px;
}
p.text-item span {
  display: block;
  margin: 15px;
  margin-left: 20px;
}
.download {
  // float: left;
  margin-left: 20px;
}
.search {
  Button {
    margin-left: 20px;
  }
}
</style>
