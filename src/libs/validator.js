/**
 * 表单校验规则
 * */

/**
 *
 * @param {当前输入值} value
 * @param {表单项对象} child
 */
const validateNumberRange = (value, child) => {
  console.log(value)
  const rangeStr = child.range.split('')
  // 根据range进行取值范围校验
  // 先取出括号
  const leftBracket = rangeStr[0]
  const rightBracket = rangeStr[rangeStr.length - 1]
  // 再取出最大最小值
  const range = child.range.split(',')
  // max 和 min 表示数字的最大值和最小值; 例如: [1, max) 表示最小为1, 最大不限
  const min = range[1].includes('min')
    ? Number.MIN_SAFE_INTEGER
    : parseInt(range[0].substring(1))
  const max = range[1].includes('max')
    ? Number.MAX_SAFE_INTEGER
    : parseInt(range[1])
  // 然后判断 4 种区间: (), [], (], [)
  const bracket = leftBracket + rightBracket
  const bracketMap = {
    '()': () => value > min && value < max,
    '[]': () => value >= min && value <= max,
    '(]': () => value > min && value <= max,
    '[)': () => value >= min && value < max
  }
  return bracketMap[bracket]()
}

const validateCsvVarNum = (item, rule, value, callback) => {
  // 将value中的逗号替换为英文逗号
  value = value.replace(/，/gi, ',')
  const splitValue = value.split(',').filter((val) => val)

  if (!value.includes(',')) {
    return callback(new Error(item.label + '必须用逗号分隔'))
  } else if (splitValue.length < item.CsvVarNum) {
    return callback(new Error(`至少填写${item.CsvVarNum}个值`))
  } else {
    callback()
  }
}

const validateInteger = (rule, value, callback) => {
  if (!Number.isInteger(value)) {
    callback(new Error('必须为整数'))
  } else {
    callback()
  }
}

const validateUnequal = (formData, formList, item, rule, value, callback) => {
  const unequalKey = item.unequal
  let unequalLabel = ''
  formList.forEach((item) => {
    if (item.key === unequalKey || unequalKey.includes(item.key)) {
      let label = ''
      if (item.label.split('-').length > 1) {
        label = item.label.split('-')[1]
      } else {
        label = item.label
      }
      unequalLabel += label + ', '
    }
  })
  unequalLabel = unequalLabel.substr(0, unequalLabel.length - 2)
  let flag = true
  if (Array.isArray(unequalKey)) {
    unequalKey.forEach((key) => {
      if (value && value === formData[key]) {
        flag = false
      }
    })
  } else if (value && value === formData[unequalKey]) {
    flag = false
  }
  if (!flag) {
    let primaryLabel = ''
    if (item.label.split('-').length > 1) {
      primaryLabel = item.label.split('-')[1]
    } else {
      primaryLabel = item.label
    }
    callback(new Error(primaryLabel + `不能和${unequalLabel}相同`))
  } else {
    callback()
  }
}

const validateLessThanOrEqual = (
  formData,
  formList,
  item,
  rule,
  value,
  callback
) => {
  let flag = true
  // 判断 value 是否小于等于 item.lessThanOrEqual 所代表的字段
  let lessThanOrEqualLabel = ''
  formList.forEach((formItem) => {
    if (formItem.key === item.lessThanOrEqual) {
      lessThanOrEqualLabel = formItem.label
    }
  })
  if (!(value <= formData[item.lessThanOrEqual])) {
    flag = false
  }
  if (flag) {
    callback()
  } else {
    callback(new Error(item.label + `必须小于等于${lessThanOrEqualLabel}`))
  }
}

const validateGreatThanOrEqual = (
  formData,
  formList,
  item,
  rule,
  value,
  callback
) => {
  let flag = true
  // 判断 value 是否大于等于 item.GreatThanOrEqual 所代表的字段
  let greatThanOrEqual = ''
  formList.forEach((formItem) => {
    if (formItem.key === item.greatThanOrEqual) {
      greatThanOrEqual = formItem.label
    }
  })
  if (!(value >= formData[item.greatThanOrEqual])) {
    flag = false
  }
  if (flag) {
    callback()
  } else {
    callback(new Error(item.label + `必须大于等于${greatThanOrEqual}`))
  }
}

const validateRequiredConditions = (formData, item, rule, value, callback) => {
  let flag = true
  const requiredConditions = item.requiredConditions
  requiredConditions.forEach((key) => {
    if (formData[key]) {
      // 关联字段已经填写了, 那么该字段也必须填写
      if (!value) flag = false
    }
  })
  if (flag) {
    callback()
  } else {
    callback(new Error(item.label + '不可为空'))
  }
}

const getFormItemType = (item) => {
  // 多选和级联选择
  if (
    (item.type === 'select' && item.multiple) ||
    item.type === 'cascaderMuti'
  ) {
    return 'array'
  } else if (item.type === 'number' || item.type === 'radio') return 'number'
  return 'string'
}

export const getFormItemRules = (item, formList, formData) => {
  let msglabel = item.label || ''
  let rules = [
    // 校验必填
    {
      type: getFormItemType(item),
      required: item.required,
      trigger: 'change',
      message: msglabel + '不能为空'
    }
  ]
  // 校验: requiredConditions中的字段如果填写了, 那么该字段就为必填; 示例: requiredConditions: ['a', 'b'], 如果字段a或b有一个填了,那么该字段就必填
  if (item.requiredConditions) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: (rule, value, callback) =>
        validateRequiredConditions(
          formData,
          item,
          rule,
          value,
          callback
        )
    })
  }
  // 校验: 取值范围 示例: range: '(0, 100]' 即0-100之间,不可为0
  if (item.type === 'number' && item.range) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      message: msglabel + '取值范围: ' + item.range,
      // 校验数字类型的取值范围
      validator: (rule, value) => {
        if (value === item.special) return true
        return validateNumberRange(value, item)
      }
    })
  }
  // 校验: 类型必须为整数 设置dataType: 'integer' 即可
  if (item.dataType === 'integer') {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: validateInteger
    })
  }
  // 校验: 逗号分隔的值必须大于CsvVarNum个; 示例: CsvVarNum: 3
  if (item.CsvVarNum) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: (rule, value, callback) =>
        validateCsvVarNum(item, rule, value, callback)
    })
  }
  // 校验: 该字段不能等于unequal字段; 示例: unequal: 'id' 即该字段不能和id字段的值相同, 支持数组 unequal: ['id', 'name']
  if (item.unequal) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: (rule, value, callback) =>
        validateUnequal(
          formData,
          formList,
          item,
          rule,
          value,
          callback
        )
    })
  }
  // 校验: 该字段小于等于某字段
  if (item.lessThanOrEqual) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: (rule, value, callback) =>
        validateLessThanOrEqual(
          formData,
          formList,
          item,
          rule,
          value,
          callback
        )
    })
  }
  // 校验: 该字段大于等于某字段
  if (item.greatThanOrEqual) {
    rules.push({
      type: getFormItemType(item),
      trigger: 'change',
      validator: (rule, value, callback) =>
        validateGreatThanOrEqual(
          formData,
          formList,
          item,
          rule,
          value,
          callback
        )
    })
  }

  return rules
}
