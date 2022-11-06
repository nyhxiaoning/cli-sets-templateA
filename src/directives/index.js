/**
 * 限制字符 1个汉字等于2个字符
 * len 为字符长度
 * trim 是否禁止输入空格
 */

export const emoji = {
  updated: function(el, binding, vnode) {
    const { len = 20, trim = false } = binding.value;
    let str = trim ? el.value.replace(/\s*/g, '') : str;
    if (!str && typeof str != 'undefined') {
      return '';
    }
    let num = 0;
    const str1 = str;
    for (let i = 0, lens = str1.length; i < lens; i++) {
      num += str1.charCodeAt(i) > 255 ? 2 : 1;
      if (num > len) {
        break;
      } else {
        str = str1.substring(0, i + 1);
      }
    }
    el.value = str;
    el.dispatchEvent(new Event('input'));
  },
  unbind: function(el) {}
};
