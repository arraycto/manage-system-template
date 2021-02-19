export const searchList = [
  {
    type: 'input',
    key: 'params',
    label: '服务变量',
    placeholder: '请输入服务变量',
    clearable: true
  },
  {
    type: 'select',
    key: 'datas',
    label: '条件变量',
    placeholder: '请选择条件变量',
    clearable: true,
    filterable: true,
    multiple: false,
    children: [
      {
        key: '111',
        value: '北京'
      },
      {
        key: '222',
        value: '上海'
      }
    ]
  },
  {
    type: 'daterange', // 时间段
    key: 'daterange',
    label: '起止时间',
    placeholder: '请选择起止时间',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'poptip',
    key: 'value',
    keywordKey: 'key',
    opts: [
      {
        key: 'userId',
        label: '用户ID'
      },
      {
        key: 'itemId',
        label: '物品ID'
      }
    ]
  }
]
