import enquireJs from 'enquire.js'
import {refreshToken} from '../services/user'
import axios from 'axios'

export function isDef (v){
  return v !== undefined && v !== null
}
// 更新token
export function handleRefreshToken (){
  refreshToken().then(res => {
    if (res.data.statusCode===200&&res.data.success===1) {
      let userInfor = JSON.parse(localStorage.getItem('userInfor'));
      userInfor.token = res.data.resultValue.token
      localStorage.setItem('userInfor', JSON.stringify(userInfor));
    } else if (res.data.statusCode !== '82050013') {
      this.$message.error(res.data.message)
    }
  })
}

export function setTimeFunc() {
  setInterval(() => {
    let userInfor = JSON.parse(localStorage.getItem('userInfor'));
    if (userInfor) {
      handleRefreshToken();
    }
  }, 180000)
}
/**
 * Remove an item from an array.
 */
export function handleDictionaryObj(arr) {
  let obj = {}
  arr.forEach(item => {
    obj[item.id] = item.name
  })
  return obj
}

export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

export function enquireScreen(call) {
  const handler = {
    match: function () {
      call && call(true)
    },
    unmatch: function () {
      call && call(false)
    }
  }
  enquireJs.register('only screen and (max-width: 767.99px)', handler)
}

const _toString = Object.prototype.toString

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
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
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
export async function getImage(url) {
  const { data } = await axios({
    method: "GET",
    url: "/upload" + url,
    responseType: "blob"
  })
  return data;
}

export function downloadIamge(imgsrc, name) {
  var image = new Image();
  // 解决跨域 Canvas 污染问题
  // image.setAttribute("crossOrigin", "Anonymous");
  image.crossOrigin = 'Anonymous'
  image.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
  
    var a = document.createElement("a"); // 生成一个a元素
    var event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
}

export function ajax(url, callback, options, onprogress) {
  window.URL = window.URL || window.webkitURL;
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  if (options.responseType) {
      xhr.responseType = options.responseType;
  }
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr);
      }
  };
  xhr.onprogress = function(event) {
    if (onprogress) {
      onprogress( ~~(event.loaded/event.total*100))
    }
  }
  xhr.send();
}
export function downloadAjax(url, name, onprogress) {
  let innerurl = url;// 文件地址
  ajax(innerurl, function (xhr) {
      let filename = name + '.mp4';
      let content = xhr.response;
      let a = document.createElement('a');
      let blob = new Blob([xhr.response]);
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
  }, {
      responseType: 'blob'
  }, onprogress);
}

export function getUrlBase64(url) {
  return new Promise(resolve => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.crossOrigin = 'Anonymous' //允许跨域
    img.src = url
    img.onload = function() {
    canvas.height = 300
    canvas.width = 300
    ctx.drawImage(img, 0, 0, 300, 300)
    let dataURL = canvas.toDataURL('image/png')
    canvas = null
    resolve(dataURL)
    }
  })
}
export function download(url) {
  getUrlBase64(url).then(base64 => {
    let link = document.createElement('a')
    link.href = base64
    link.download = 'qrCode.png'
    link.click()
  })
}

export function downloadFile(res, fileName) {
  if (!res) {
      return;
  }
  if (window.navigator.msSaveBlob) {
      // IE以及IE内核的浏览器
      try {
          window.navigator.msSaveBlob(res, fileName); // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
          // window.navigator.msSaveOrOpenBlob(res, fileName); //此方法类似上面的方法，区别可自行百度
      } catch (e) {
          console.log(e);
      }
  } else {
      let url = window.URL.createObjectURL(new Blob([res]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName.replace(new RegExp('"', 'g'), '')); // 文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成移除元素
      window.URL.revokeObjectURL(url); // 释放掉blob对象
  }
}

export function downloadByFile(res, fileName) {
  var blob = new Blob([res], {//这个里面的data 的二进制文件 创建一个文件对象
    type:'text/plain;charset=utf-8'
  })
  var downloadElement = document.createElement('a')//创建一个a 虚拟标签
  var href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) 
}