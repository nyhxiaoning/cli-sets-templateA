/**
 * @param {用于存储、获取sessionStorage} text
 * @returns
 */
export const session = function (key, value) {
  if (value === void 0) {
    let lsVal = sessionStorage.getItem(key);
    if (lsVal && lsVal.indexOf("autostringify-") === 0) {
      return JSON.parse(lsVal.split("autostringify-")[1]);
    } else {
      return lsVal;
    }
  } else {
    if (typeof value === "object" || Array.isArray(value)) {
      value = "autostringify-" + JSON.stringify(value);
    }
    return sessionStorage.setItem(key, value);
  }
};

/**
 * @param {用于获取html中的图片，只取第一个} text
 * @returns
 */
export const getHtmlTextImg = (html) => {
  let obj = {
    img: "",
    text: "",
  };
  if (html.indexOf("http") == 0) {
    obj.img = html;
  } else {
    let imgs = html.match(/src="([^"]*)"/g) || [];
    obj.img = imgs.length ? imgs[0].substring(5, imgs[0].length - 1) : "";
    obj.text = html
      .replaceAll(/<style>.*<\/style>/g, "")
      .replaceAll(/<\/?[a-zA-Z0-9\/:"\s=.-;-,()\\%#]*>/g, "");
  }
  return obj;
};
