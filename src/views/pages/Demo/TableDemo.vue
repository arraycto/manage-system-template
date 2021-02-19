<template>
  <div id="demo-table">
    <h1 style="color: red;margin: 20px;">TableUI</h1>
    <TableUI :turnPage="true" :pageSizeOptions="pageSizeOptions" :total="total" :loading="loading" :columns="columns" :data="data" :actions="actions" :actionWidth="300" @on-page-change="pageHandler" @on-select="selectChange" @on-select-all="selectAll">
      <!-- 自定义操作列 -->
      <template slot-scope="{ row }" slot="action">
        <div class="action">
          <template v-for="action in actions">
            <a v-if="showAction(row, action.key)" :key="action.key" @click="actionHandler(row, action.key)">{{action.label}}</a>
          </template>
        </div>
      </template>
    </TableUI>
    <br>
    <p>表格展示组件</p>
    <div style="margin-left: 30px;">
      <p>1. 支持表格展示、自定义每列内容、行多选、换页、换每页条数</p>
      <p class="text-item">
        2. 组件传入参数 props
        <span>1) loading --- 表格加载状态</span>
        <span>2) columns --- 表头</span>
        <span>3) data --- 表格数据</span>
        <span>4) total --- 表格总行数</span>
        <span>5) turnPage --- 是否分页(可选)</span>
        <span>6) pageSizeOptions --- 表格每页条数(可选)</span>
        <span>7) maxHeight --- 表格最大高度, 超过此高度可滚动显示(可选)</span>
      </p>
      <p class="text-item">
        3. 组件触发事件 events
        <span>1) this.$emit('on-select', selection, row, true) --- 参数含义: 已选项, 当前选择项, 选中/取消选中(true/false)</span>
        <span>2) this.$emit('on-select-all', selection, true) --- 参数含义: 已选项, 全选/取消全选(true/false)</span>
        <span>3) this.$emit('on-page-change', this.page, this.pageSize)</span>
      </p>
      <p class="text-item" style="color: red;">4. 注意事项：
        <span>1) 组件支持自定义每列内容, 操作列可以在使用组件时自定义</span>
      </p>
    </div>
  </div>
</template>
<script>
import TableUI from '@/components/TableUI'
import { tableData } from './data/tableDemo.js'
export default {
  name: 'TableDemo',
  components: {
    TableUI
  },
  data () {
    return {
      pageSizeOptions: [10, 20, 30], // 每页条数切换的配置
      total: 100, // 总行数
      loading: false, // 加载中状态
      columns: tableData.columns,
      data: tableData.data,
      actions: tableData.actions
    }
  },
  methods: {
    pageHandler (page, pageSize) { // 换页
      console.log('page', page, pageSize)
    },
    selectChange (selection, row, selected) { // 多选
      console.log('selection', selection, row, selected)
    },
    selectAll (selection, selected) { // 全选/取消全选
      console.log('select all', selection, selected)
    },
    
    actionHandler (data, key) { // 操作列点击事件
      console.log('action', key, data)
    },
    showAction (row, key) {
      const { status } = row
      const actionMap = {
        1: ['search', 'edit', 'delete'], 
        2: ['search', 'edit'] 
      }
      
      return actionMap[status] && actionMap[status].includes(key)
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
#demo-table {
  .action {
    a {
      margin-left: 5px;
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
}

</style>
