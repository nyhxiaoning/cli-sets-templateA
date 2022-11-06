import { ref } from 'vue'
const windowHeight = ref(0)

function repairBlur() {
  const ua = navigator.userAgent
  // 判断是否是ios设备
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    // 解决ios输入框弹出的页面样式问题
    document.querySelectorAll('input').forEach(item => {
      item.onblur = temporaryRepair
    })
    document.querySelectorAll('select').forEach(item => {
      item.onchange = temporaryRepair
    })
    document.querySelectorAll('textarea').forEach(item => {
      item.onblur = temporaryRepair
    })
  }
}

function temporaryRepair() {
  const windowFocusHeight = window.innerHeight
  if (windowHeight.value == windowFocusHeight) {
    return
  }
  console.log(windowHeight.value + '--' + windowFocusHeight)
  console.log('修复ios输入框复位')
  let currentPosition
  const speed = 1 // 页面滚动距离
  currentPosition = document.documentElement.scrollTop || document.body.scrollTop
  currentPosition -= speed
  window.scrollTo(0, currentPosition) // 页面向上滚动
  currentPosition += speed // speed变量
  window.scrollTo(0, currentPosition) // 页面向下滚动
}

export default repairBlur
