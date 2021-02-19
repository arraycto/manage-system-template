export const tableData = {
  columns: [
    // 表头
    {
      type: 'selection', // 多选功能
      width: 60
    },
    {
      key: 'rule_id',
      title: '任务id'
    },
    {
      key: 'rule_name',
      title: '任务名称'
    },
    {
      key: 'rule_des',
      title: '任务描述'
    },
    {
      key: 'submitter',
      title: '提交人'
    },
    {
      key: 'submit_time',
      title: '提交时间'
    },
    {
      slot: 'action',
      title: '操作'
    }
  ],
  data: [
    // 列表数据
    {
      rule_id: 64271,
      rule_name: '黑名单统一测试',
      rule_des: '行内黑名单采购',
      submitter: 'zhangfei',
      submit_time: '2019-09-20 18:05:51',
      status: 1
    },
    {
      rule_id: 64272,
      rule_name: '黑名单统一测试',
      rule_des: '行内黑名单采购',
      submitter: 'zhangfei',
      submit_time: '2019-09-20 18:05:51',
      status: 2,
      disabled: ['search'] // 查看按钮不可操作
    }
  ],
  actions: [
    // 操作列
    {
      label: '查看',
      key: 'search'
    },
    {
      label: '编辑',
      key: 'edit'
    },
    {
      label: '删除',
      key: 'delete'
    }
  ]
}
