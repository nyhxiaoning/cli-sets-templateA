/**
 *
 * @param {父元素} pDom
 * @param {子元素集合} cDom
 */

export function isEllipsis(pDom, cDoms) {
  if (pDom && pDom.clientWidth) {
    const pWidth = pDom.clientWidth
    const cWidth = cDoms.reduce((prev, curt) => {
      if (curt.el) {
        return prev + curt.el.$el.clientWidth + 10
      } else {
        return 0
      }
    }, 0)
    return cWidth >= pWidth
  } else {
    return false
  }
}
