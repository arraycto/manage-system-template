<template>
  <div class="table-ui">
    <Table ref="TableUI" :border="border" :columns="columns" :data="data" :row-key="rowKey" :loading="loading" :max-height="maxHeight" :no-data-text="noDataText" @on-select-cancel="selectCancel" @on-select="selectConfirm" @on-select-all="selectAll" @on-select-all-cancel="cancelAll">
      <!-- 自定义列内容 -->
      <template v-for="column in columns" :slot="column.slot || ''" slot-scope="params">
        <slot :name="column.slot || ''" v-bind="params"></slot>
      </template>
    </Table>
    <div v-if="turnPage" class="search-table-page">
      <Page :current="page" :transfer="true" :total="total" :page-size-opts="pageSizeOptions" :show-sizer="showSizer" show-elevator show-total size="small" @on-change="pageHandler" @on-page-size-change="pageSizeHandler"></Page>
      <div style="clear: both;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableUI',
  data () {
    return {
      page: 1, // 当前页数
      pageSize: 10 // 当前每页条数
    }
  },
  props: {
    turnPage: { // 是否翻页
      type: Boolean,
      default: false
    },
    pageSizeOptions: { // 表格每页条数
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    total: { // 表格总行数
      type: Number,
      default: 0
    },
    showSizer: { // 是否显示每页条数控制选择框
      type: Boolean,
      default: true
    },
    loading: { // 表格加载状态
      type: Boolean,
      default: false
    },
    columns: { // 表头
      type: Array,
      default: () => []
    },
    data: { // 表格数据
      type: Array,
      default: () => []
    },
    rowKey: { // 树形结构时, 指定的row-key, 例如id
      type: String,
      default: ''
    },
    noDataText: { // 无数据文字提示
      type: String,
      default: '暂无数据'
    },
    logoSrc: { // 无数据-图标
      type: String,
      default: require('../../public/noData.png')
    },
    border: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
  },
  methods: {
    
    selectConfirm (selection, row) { // 选中
      this.$emit('on-select', selection, row, true)
    },
    selectCancel (selection, row) { // 取消选中
      this.$emit('on-select', selection, row, false)
    },
    selectAll (selection) {
      this.$emit('on-select-all', selection, true)
    },
    cancelAll (selection) {
      this.$emit('on-select-all', selection, false)
    },
    pageHandler (page = 1) { // 换页
      this.page = page
      this.$emit('on-page-change', this.page, this.pageSize)
    },
    pageSizeHandler (pageSize) { // 切换每页展示条数
      this.pageSize = pageSize
      this.pageHandler()
    }
  }
}
</script>

<style scoped lang="less">
.table-ui {
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  clear: both;

  & /deep/ .ivu-table-wrapper {
    border: none;
    .ivu-table th {
      background-color: #fff;
    }
  }

  .search-table-page {
    margin-right: 20px;
    padding: 25px 0;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6c7381;
    letter-spacing: 0;
  }

  // 表格内容居中
  /deep/ .ivu-table {
    td,
    th {
      text-align: center;
    }

    .ivu-table-cell .disabledAction {
      color: #dcdfe6;
      cursor: default;
    }
  }

  /deep/ .ivu-table-cell-tree {
    margin-left: -15px;
    margin-right: 15px;
  }
}
</style>
