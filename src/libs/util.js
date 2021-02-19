import Cookies from 'js-cookie'
import config from '@/config'
import axios from 'axios'

const { cookieExpires } = config
export const TOKEN_KEY = 'token'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const delToken = () => {
  Cookies.set(TOKEN_KEY, '')
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  if (!url) {
    return {}
  }
  try {
    const keyValueArr = url.split('&')
    let paramObj = {}
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
  } catch (e) {
    return {}
  }
}

/**
 * @param {Object} data
 * @description 序列化 AJAX FormData
 */
export const stringifyFormData = (data = {}) => {
  const _data = {}
  Object.keys(data).forEach(k => {
    const val = data[k]
    if (val instanceof Date) {
      // Date 类型
      _data[k] = dateFormatter(val, 'yyyy-MM-dd hh:mm:ss').replace(' 00:00:00', '')
    } else if (val instanceof Array && val.length > 0 && val[0] instanceof Date) {
      // Date 数组
      const temp = []
      val.forEach(v => {
        temp.push(dateFormatter(v, 'yyyy-MM-dd hh:mm:ss').replace(' 00:00:00', ''))
      })
      _data[k] = JSON.stringify(temp)
    } else if (val instanceof File) {
      // 文件类型
      _data[k] = val
    } else if (typeof val === 'object') {
      _data[k] = JSON.stringify(val)
    } else {
      _data[k] = val
    }
  })
  return _data
}

/**
 * @param {Date} date
 * @param {String} fmt
 * @description 格式化日期
 */
export const dateFormatter = (date, fmt) => {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}

export const alterData = (List, valueData, isMuti) => { // 表单数据结构处理 编辑 -> 查看
  let data = []
  // isMuti为true表示多选,否则为单选
  let isMutiSel = (isMuti === true)
  List.forEach(item => {
    let value = ''
    if (valueData && valueData[item.key]) {
      value = valueData[item.key]
    }
    if (value && (item.type === 'radio' || item.type === 'select')) {
      const result = item.children.filter(childItem => {
        if (isMutiSel || item.multiple) {
          return value.indexOf(childItem.key) > -1
        } else {
          return value === childItem.key
        }
      }).map(childItem => {
        return childItem.value
      })
      value = result.join(',') // 多选时逗号分隔
    } else if (item.type === 'input' || item.type === 'number') {
      if (item.prepend) {
        value = item.prepend + ' ' + value
      }
      if (item.append) {
        value += ' ' + item.append
      }
      if (item.appendKey) {
        const label = item.appendChildren.filter(i => {
          return i.key === valueData[item.appendKey]
        }).map(i => {
          return i.value
        })[0]
        value += ' ' + label
      }
    } else if (item.type === 'cascaderMuti') {
      // let arr = getArrayList(item.children)
      // const result = arr.filter(childItem => {
      //   return value.includes(childItem.value)
      // }).map(childItem => {
      //   return childItem.label
      // })
      let result = []
      item.children.forEach(cItem => {
        if (value && value.length && value[0] === cItem.value) {
          result.push(cItem.label)
          cItem.children.forEach(ccItem => {
            if (value.slice(1).includes(ccItem.value)) {
              result.push(ccItem.label)
            }
          })
        }
      })
      value = result.join('/')
    }
    if (item.type !== 'tooltip' && item.type !== 'button') {
      let obj = {
        type: 'text',
        label: item.label,
        value: value || '',
        download: item.download ? item.download : ''
      }
      if (!obj.download) {
        delete obj.download // 文件上传下载功能
      }
      if (item.isParent) {
        obj.isParent = item.isParent
      }
      if (item && item.isChildren) {
        obj.isParent = item.isChildren
      }
      if (item.isDisib) {
        obj.isDisib = item.isDisib
      }
      data.push(obj)
    }
  })
  return data
}

/* 
  downloadUrl -> 导出地址
  formValue -> 查询条件
*/
export const downloadHandler = (downloadUrl, formValue) => { // 导出函数
  let downloadparams = Object.keys(formValue).reduce((urls, url) => {
    if (formValue[url]) {
      urls += `&${url}=${formValue[url]}`
    }
    // urls = urls.substr(1)
    return urls
  }, '')
  if (downloadparams) {
    downloadparams = downloadparams.substr(1)
    window.open(downloadUrl + '?' + downloadparams)
  } else {
    window.open(downloadUrl)
  }
}

/* 
  obj -> 接收参数为对象 { a: 2 }
  返回: 
  {
    "a": "2"
  }
*/
export const formatJson = (obj) => {
  let rep = '~'
  let jsonStr = JSON.stringify(obj, null, rep)
  let str = ''
  for (let i = 0; i < jsonStr.length; i++) {
    str += jsonStr.charAt(i)
  }
  jsonStr = ''
  for (let i = 0; i < str.length; i++) {
    let text = str.charAt(i)
    jsonStr += rep === text ? '    ' : text
  }
  return jsonStr
}

/*
  menuName = this.$route.meta.menuName
  name = this.$route.meta.name
*/
export const getTabsList = (menuName, name, menuList) => {
  const menu = menuList.filter(item => {
    return item.menuName === menuName
  })
  if (menu.length > 0) {
    const newMenu = menu[0].subMenuList.filter(item => {
      return item.routeName === name
    })[0].tabsList
    return newMenu
  }
  return []
}

export const getSelectItem = (arr, item, temp_data) => {
  arr.map(v => {
    if (v.children && v.children.length) getSelectItem(v.children, item, temp_data)
    item.map(val => {
      if (v.value === val) {
        temp_data.unshift(v)
      }
    })
  })
}

export const getSelections = (arr, label, value, selections) => {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    item.__label = label ? label + ' / ' + item.label : item.label
    item.__value = value ? value + ',' + item.value : item.value

    if (item.children && item.children.length) {
      getSelections(item.children, item.__label, item.__value, selections)
      delete item.__label
      delete item.__value
    } else {
      selections.push({
        label: item.__label,
        value: item.__value,
        display: item.__label,
        item: item,
        disabled: !!item.disabled
      })
    }
  }
}

// 获取 api 请求函数
export const getApiMethod = (url, req) => {
  return axios.request({
    url,
    req
  })
}

/**
 * store 中通过 action 发起请求
 * @param {*} context
 * @param {*} reqData
 * @param {*} reqMethod
 * @param {*} mutations
 */
export const getResponse = function (
  context,
  reqData,
  reqMethod,
  mutations
) {
  return new Promise((resolve, reject) => {
    try {
      reqMethod(reqData)
        .then((res) => {
          const resObj = res.data
          if (+resObj.code === config.successCode) {
            if (mutations) {
              context.commit(mutations, resObj.data)
            }
            resolve(resObj.data)
          } else {
            reject(resObj.msg)
          }
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

// 根据formList中最长的label, 动态设置labelWidth
export const getLabelWidth = (baseWidth, formList) => {
  let width = baseWidth
  let maxLabel = []
  formList &&
    formList.forEach((item) => {
      if (item.label) {
        let label = item.label.split('')
        if (label.length > maxLabel.length) maxLabel = label
      }
    })
  width += maxLabel.length * 10
  return width
}
