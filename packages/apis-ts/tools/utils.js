import Cookies from 'vue-cookie'
import { ElMessage } from 'element-plus'
const systemToken = 'systemToken'

export const setToken = token => {
  Cookies.set(systemToken, token)
}

export const getToken = () => {
  return Cookies.get(systemToken) || ''
}

export const removeToken = () => {
  Cookies.remove(systemToken)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  const paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 *  @description 深拷贝数据..
 */
export const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') return obj
  var cpObj = obj instanceof Array ? [] : {}
  for (var key in obj) cpObj[key] = deepClone(obj[key])
  return cpObj
}

//时间格式化
/**
 *
 * Parse the time to string
 * @param {(object|string|number)} time
 * @param {string} cFormat
 * @name LiuXUeCHao
 * @returns {string | null}
 */
export function parseTime(time, cFormat = null) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}
// 去除数组中重复的对象
export function deteleObject(obj) {
  var uniques = []
  var stringify = {}
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i])
    keys.sort(function(a, b) {
      return Number(a) - Number(b)
    })
    var str = ''
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j])
      str += JSON.stringify(obj[i][keys[j]])
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i])
      stringify[str] = true
    }
  }
  // uniques = uniques
  return uniques
}

/**
 * elmessage global tips
 * @param {string} msg
 * @param {string} type
 */
export const openElMessage = (msg, type = 'success') => {
  ElMessage({
    message: msg,
    type: type,
  })
}

export const showElMessage = (code, msg, oper) => {
  code == 200
    ? openElMessage(`${oper}成功.`)
    : openElMessage(`${oper}失败，${msg}`, 'warning')
}

export const addLabelForList = list => {
  for (let i = 0; i < list?.length; i++) {
    list[i].label = list[i].name
    if (list[i].children && list[i].children?.length)
      addLabelForList(list[i].children)
    else delete list[i].children
  }
  return list
}

export const handleError = ({ code, data, msg }) => {
  if (code != 200) {
    ElMessage({
      message: msg,
      type: 'error',
    })
    return []
  }
  return data
}

/**
 *
 * @param {用于题目获取innerHtml的内容img的src} text
 * @returns
 */
export const getStrImg = text => {
  if (text == undefined) return false
  const img = text.match(/src="([^"]*)"/g) || []
  const imgs = img.map(element => {
    element = element.substring(5, element.length - 1)
    return element
  })
  return imgs
}

/**
 *
 * @param {用于重置未播放的音乐} text
 * @returns
 */
export const watchMusicState = () => {
  let timer = setTimeout(() => {
    let _audio = document.getElementsByTagName('audio')
    console.log(_audio.length)

    const addListen = (item, index) => {
      item.addEventListener('playing', function() {
        //播放状态Doing
        musicPause(index)
      })
      // item.addEventListener('pause', function() {
      //   //暂停状态Doing
      // })
    }

    const musicPause = index => {
      for (let i = 0; i < _audio.length; i++) {
        if (i != index) {
          _audio[i].load()
        }
      }
    }

    for (let i = 0; i < _audio.length; i++) {
      addListen(_audio[i], i)
    }

    clearTimeout(timer)
  }, 1000)
}

/**
 *
 * @param {用于存储、获取sessionStorage} text
 * @returns
 */
export const session = function(key, value) {
  if (value === void 0) {
    let lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    } else {
      return lsVal
    }
  } else {
    if (typeof value === 'object' || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value)
    }
    return sessionStorage.setItem(key, value)
  }
}
