// (无标题)新建表单数据结构
export const unTitleformList = [
  {
    type: 'input',
    key: 'input',
    label: '',
    placeholder: '请输入。。。',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'tooltip',
    tips: ['提示内容'],
    labelWidth: 20,
    inline: true
  },
  {
    type: 'br'
  },
  {
    type: 'number',
    key: 'number',
    label: '',
    placeholder: '请输入数字',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'button',
    key: 'add',
    title: '按钮',
    width: 100,
    labelWidth: 20,
    inline: true
  },
  {
    type: 'textarea',
    key: 'textarea',
    label: '',
    placeholder: '请输入。。。限制。。字',
    max: 10,
    required: true,
    clearable: true
  },
  {
    type: 'select',
    key: 'select',
    label: '',
    placeholder: '请选择。。。',
    required: true,
    clearable: true,
    filterable: true,
    multiple: false,
    inline: true,
    opts: [
      {
        key: '1',
        value: '北京'
      },
      {
        key: '2',
        value: '上海'
      },
      {
        key: '3',
        value: '西安'
      }
    ]
  },
  {
    type: 'input',
    key: 'input',
    label: '',
    width: 80,
    labelWidth: 20,
    inline: true
  },
  {
    type: 'upload',
    key: 'upload',
    label: '',
    format: ['txt', 'csv'],
    required: true,
    action: '/user/login',
    tips: '*样本支持xlsx格式(<= 10M)'
  },
  {
    type: 'radio',
    key: 'radio',
    label: '',
    required: true,
    opts: [
      {
        key: 1,
        label: '是'
      },
      {
        key: 0,
        label: '否'
      }
    ]
  },
  {
    type: 'date', // 日期选择
    key: 'date',
    placeholder: '请选择日期',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'datetime', // 日期+时间选择
    key: 'datetime',
    placeholder: '请选择时间',
    clearable: true
  },
  {
    type: 'daterange', // 日期范围
    key: 'daterange',
    placeholder: '请选择日期范围',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'cascader',
    key: 'cascader',
    label: '',
    children: [
      {
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
    ],
    inline: true
  },
  {
    type: 'btnA',
    key: 'btnA',
    label: '',
    value: 'aaaaa',
    labelWidth: 20,
    inline: true
  }
]

export const formList = [
  {
    type: 'input',
    key: 'input',
    label: '输入框',
    placeholder: '请输入。。。',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'tooltip',
    tips: ['提示内容'],
    labelWidth: 20,
    inline: true
  },
  {
    type: 'br'
  },
  {
    type: 'number',
    key: 'number',
    label: '数字输入框',
    placeholder: '请输入数字',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'button',
    key: 'add',
    title: '按钮',
    width: 100,
    labelWidth: 20,
    inline: true
  },
  {
    type: 'textarea',
    key: 'textarea',
    label: '文本域输入框',
    placeholder: '请输入。。。限制。。字',
    max: 10,
    required: true,
    clearable: true
  },
  {
    type: 'select',
    key: 'select',
    label: '下拉选择框',
    placeholder: '请选择。。。',
    required: true,
    clearable: true,
    filterable: true,
    multiple: false,
    inline: true,
    opts: [
      {
        key: '1',
        label: '1xx'
      },
      {
        key: '2',
        label: '2xx'
      },
      {
        key: '3',
        label: '3xx'
      }
    ]
  },
  {
    type: 'input',
    key: 'input',
    label: '后缀输入框',
    width: 120,
    inline: true
  },
  {
    type: 'upload',
    key: 'upload',
    label: '上传组件',
    format: ['txt', 'csv'],
    required: true,
    action: '/user/login',
    tips: '*样本支持xlsx格式(<= 10M)'
  },
  {
    type: 'radio',
    key: 'radio',
    label: '单选',
    required: true,
    opts: [
      {
        key: 1,
        label: '是'
      },
      {
        key: 0,
        label: '否'
      }
    ]
  },
  {
    type: 'date', // 日期选择
    key: 'date',
    placeholder: '请选择日期',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'datetime', // 日期+时间选择
    key: 'datetime',
    placeholder: '请选择时间',
    clearable: true
  },
  {
    type: 'daterange', // 日期范围
    key: 'daterange',
    placeholder: '请选择日期范围',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'cascader',
    key: 'cascader',
    label: '级联单选输入框',
    children: [
      {
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
    ],
    inline: true
  },
  {
    type: 'btnA',
    key: 'btnA',
    label: 'a链接',
    labelWidth: 60,
    value: 'aaaaa',
    inline: true
  }
]

export const alterList = [
  {
    type: 'input',
    key: 'input',
    value: 'aaaaa',
    label: '输入框',
    placeholder: '请输入。。。',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'tooltip',
    tips: ['提示内容'],
    labelWidth: 20,
    inline: true
  },
  {
    type: 'br'
  },
  {
    type: 'number',
    key: 'number',
    value: 1111,
    label: '数字输入框',
    placeholder: '请输入数字',
    required: true,
    clearable: true,
    inline: true
  },
  {
    type: 'button',
    key: 'add',
    title: '按钮',
    width: 100,
    labelWidth: 20,
    inline: true
  },
  {
    type: 'textarea',
    key: 'textarea',
    value: '文本域输入框',
    label: '文本域输入框',
    placeholder: '请输入。。。限制。。字',
    max: 10,
    required: true,
    clearable: true
  },
  {
    type: 'select',
    key: 'select',
    value: '1',
    label: '下拉选择框',
    placeholder: '请选择。。。',
    required: true,
    clearable: true,
    filterable: true,
    multiple: false,
    inline: true,
    opts: [
      {
        key: '1',
        label: '1xx'
      },
      {
        key: '2',
        label: '2xx'
      },
      {
        key: '3',
        label: '3xx'
      }
    ]
  },
  {
    type: 'input',
    key: 'appendInput',
    value: '后缀输入框',
    label: '后缀输入框',
    width: 120,
    inline: true
  },
  {
    type: 'upload',
    key: 'upload',
    label: '上传组件',
    format: ['txt', 'csv'],
    required: true,
    action: '/user/login',
    tips: '*样本支持xlsx格式(<= 10M)'
  },
  {
    type: 'radio',
    key: 'radio',
    value: 0,
    label: '单选',
    required: true,
    opts: [
      {
        key: 1,
        label: '是'
      },
      {
        key: 0,
        label: '否'
      }
    ]
  },
  {
    type: 'date', // 日期选择
    key: 'date',
    placeholder: '请选择日期',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'datetime', // 日期+时间选择
    key: 'datetime',
    placeholder: '请选择时间',
    clearable: true
  },
  {
    type: 'daterange', // 日期范围
    key: 'daterange',
    placeholder: '请选择日期范围',
    format: 'yyyy-MM-dd',
    clearable: true
  },
  {
    type: 'cascader',
    key: 'cascader',
    value: ['beijing', 'gugong'],
    label: '级联单选输入框',
    children: [
      {
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
    ],
    inline: true
  },
  {
    type: 'btnA',
    key: 'btnA',
    label: 'a链接',
    labelWidth: 70,
    value: 'aaaaa',
    inline: true
  }
]
