/**
 * 加载svg容器，<embed> 标签定义嵌入的内容，比如插件，比如svg容器。
 * @param {*} src svg地址
 * @param {*} parent 容器
 */
export function createEmbedEle(src = 'svg地址', parent) {
  const embed = document.createElement('embed');
  parent = parent || document.body;
  // TODO:设置此时容器的大小，这里直接根据了当前的clientWidth宽度设置
  embed.width = '100%'; //获取当前的这里强行设置100%内容
  embed.height = '100%';
  embed.type = 'image/svg+xml';
  embed.src = src;
  embed.id = 'embed-container';
  debugger;
  parent.appendChild(embed);
}

/**
 * 创建svg-矩形标签
 * @param {*} parent 父级
 * @param {*} option 配置选项
 *  option 参数说明
// x: 横坐标
// y: 纵坐标
// width: 宽度
// height: 高度
 */
// option 参数说明
// x: 横坐标
// y: 纵坐标
// width: 宽度
// height: 高度

export function createRect(
  parent,
  option = {
    x: '0',
    y: '0',
    width: '10%',
    height: '10%'
  }
) {
  const svgEle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  svgEle.setAttribute('style', 'fill:#FFDD44;');
  svgEle.setAttribute('x', option.x);
  svgEle.setAttribute('y', option.y);
  svgEle.setAttribute('width', option.width);
  svgEle.setAttribute('height', option.height);
  svgEle.setAttribute('fill-opacity', 0.4);
  parent.children[0].appendChild(svgEle);
}

/**
 * 创建svg-文本标签
 * @param {*} parent 父级
 * @param {*} option 配置选项
 * x: 横坐标
 * y: 纵坐标
 * text: 标签内容
 */
// x: 横坐标
// y: 纵坐标
// text: 标签内容

export function createText(parent, option) {
  const svgEle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  svgEle.setAttribute('x', option.x);
  svgEle.setAttribute('y', option.y);
  svgEle.setAttribute('fill', 'red');
  svgEle.setAttribute('font-size', '120');
  svgEle.innerHTML = option.text;
  parent.children[0].appendChild(svgEle);
}

/**
 * 根据id给对应的svg标签填充颜色
 * @param {*} option 
 * option 参数说明
id: 标签ID
color: 填充颜色
parent: 容器
 */
// option 参数说明
// id: 标签ID
// color: 填充颜色
// parent: 容器
export function byIdToFill(
  option = {
    id: '#',
    color: 'red',
    parent: '父级容器'
  }
) {
  const svgEle = option.parent.getElementById(option.id);
  svgEle.setAttribute('fill', option.color);
}
