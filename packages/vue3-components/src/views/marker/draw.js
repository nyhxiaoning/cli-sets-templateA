/**
 * 利用svg绘制图形 - vue自定义指令
 */
import { ElMessageBox } from 'element-plus';
import { useDebounceFn } from '@vueuse/core';

// 第一种方式esm的es6模块化

import PlainDraggable from '@/lib/js/plain-draggable.min.js';
// 第二种方式强行将当前的模块引入，
// import PlainDraggable from '@/lib/js/plain-draggable.min.js';
// 容器名
const containerId = 'svgId';
// 当前的操作的矩形的id值。
let currentOpetateId = '';
var draggable;

//这里是一个自定义指令，这里的自定义指令需要进行判断，自定义指令的值
// 钩子函数被赋予了以下参数：
/*
el：指令所绑定的元素，可以直接操作DOM。
binding：是一个对象，包含该指令的所有信息。
binding 包含的属性具体的分别为：

arg 自定义指令的参数名。
value 自定义指令绑定的值。
oldValue 指令绑定的前一个值。
dir 被执行的钩子函数
modifiers：一个包含修饰符的对象。
*/
/**
 * 拖拽画图指令
 */
export const drawDirectives = {
  beforeMount: function (el, binding) {
    console.log(el, 'el', binding, 'bingding');
    let isComplete, // 矩形是否绘制结束
      x1,
      y1,
      id = Math.random();

    // 鼠标点击摁下监听事件
    el.onmousedown = function (ev) {
      let ce = ev || event;
      // 获取鼠标点击后的坐标
      x1 = ce.offsetX;
      y1 = ce.offsetY;
      isComplete = false;

      // 鼠标移动事件监听
      document.onmousemove = function (ev) {
        let ce = ev || event;
        // 鼠标落定后，右下角的横坐标，纵坐标nx1,ny1
        let nx1 = ce.offsetX;
        let ny1 = ce.offsetY;
        // TODO:此时绘画停止，同时宽度和高度大于0
        if (!isComplete && !isNaN(nx1 - x1) && !isNaN(ny1 - y1)) {
          drawRect(x1, y1, nx1 - x1, ny1 - y1, id);
        }
      };
      // 鼠标松开事件监听
      document.onmouseup = function (ev) {
        id = Math.random();
        isComplete = true;
        // 与vue绑定数据
        binding.value.set(getActivityDiv());
        // 新增一个弹窗选择器
        // TODO:弹出关于是否保存的设置
        // setTimeout(() => {
        //   ElMessageBox.prompt(
        //     '请输入重点标注信息',
        //     '提示',
        //     {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //     },
        //     2000
        //   );
        // });
        document.onmouseup = null;
        document.onmousemove = null;
      };
    };

    // 监听双击事件 根据类型判断是否需要删除｜添加文本标记
    el.addEventListener('dblclick', e => {
      handleNodeName(e, binding.value.set, binding);
    });
    // TODO:增加键盘的按钮的删除按钮的新增，因为需要基于当前整个文档删除
    // 为什么el.addEventLisner触发不了，但是document.addEventLisner可以
    // 因为document是全局的整个dom文档，但是el是当前的区域
    // TODO:
    document.addEventListener('keydown', function (e) {
      // TODO:其实每一次删除之前，鼠标已经hover上去了，每一次存储一次当前的hoverId的鼠标的当前的最新位置
      if (e.keyCode == 46) {
        // handleNodeName(e, binding.value.set);
        console.log('---------获取当前的currentOpetateId', currentOpetateId);
        // removeEle(currentOpetateId);//删除标签
        // TODO:触发真实的视频删除的接口，同时好处是可以防抖
        ElMessageBox.confirm('请您确定要删除当前区间色块', '提示', {
          type: 'warning'
        }).then(() => {
          // 界面UI删除
          useDebounceFn(() => {
            removeEle(currentOpetateId);
          });
          // removeEle(currentOpetateId); //删除标签
          useDebounceFn(() => {
            binding.value.deleteSvgRect(currentOpetateId);
          });
        });
        // TODO:派发删除之后，此时处于黄色区块的内容

        const list = getActivityDiv();
        // const newList = list.filter((it) => it.id !== currentOpetateId);
        // handle(newList);
      }
    });
    // 增加对于鼠标移入事件的监听，这样可以拖动黄色的背景色
    // TODO:el是当前的操作的对象，但是document是全局的
    el.addEventListener('mouseover', e => {
      currentOpetateId = e.target.id;
      draggable = new PlainDraggable(document.getElementById(e.target.id));
      draggable.snap = { step: 30 };
    });
  },
  onMounted: function (el) {
    // const { $RectDialog } =
    //   getCurrentInstance().appContext.config.globalProperties;
    // console.log($RectDialog, '$RectDialog');
  },
  updated(el, binding) {
    if (binding.value.isFirst) {
      render(binding.value.original);
      binding.value.updateFirst();
    }

    if (binding.value.rectDialog) {
      binding.value.dialogUpdateFirst();
    }
  }
};

/**
 * 绘制矩形
 **/
function drawRect(px, py, w, h, id) {
  // 删除之前画的矩形(边画边删除，否则会出现层叠在一起的矩形)
  let delRect = document.getElementById(id);
  if (delRect != null) {
    delRect.remove();
  }

  // 创建矩形
  if (px >= 0 && py >= 0 && w >= 0 && h >= 0) {
    createSvg(px, py, w, h, id);
  }
}

/**
 * 获取形状信息,或是创建新的图形标记放入当前的数据中
 */
export function getActivityDiv() {
  const container = document.getElementById(containerId),
    parentWidth = container.clientWidth,
    parentHeight = container.clientHeight,
    list = Array.from(container.children),
    tempCotainer = [];
  // TODO:当前的所有的矩形id汇总
  console.log('获取当前的dom节点内容container.children', container.children); //Array.from转换成真实的数组

  list.forEach(div => {
    // TODO:左上角的位置，x,y坐标
    const x = div.getAttribute('x'),
      y = div.getAttribute('y'),
      width = div.getAttribute('width'),
      height = div.getAttribute('height'),
      text = div.innerHTML,
      _divId = div.getAttribute('id');

    if (!text && ((width && width <= 5) || (height && height <= 5))) {
      // 删除掉误差范围内的图形
      document.getElementById(_divId).remove();
    } else {
      tempCotainer.push({
        x: (x.indexOf('%') > 0 && x) || getRatio(x, parentWidth),
        y: (y.indexOf('%') > 0 && y) || getRatio(y, parentHeight),
        w:
          (width && width.indexOf('%') > 0 && width) ||
          getRatio(width, parentWidth),
        h:
          (width && height.indexOf('%') > 0 && height) ||
          getRatio(height, parentHeight),
        _divId: div.getAttribute('id'),
        // 当前的标记文字
        text: text || null
        // 当前的video的信息内容id标记
        // videoId: '',
      });
    }
  });

  return tempCotainer;
}

/**
 * 比例
 * @param {*} child 子标签
 * @param {*} parent 父标签
 */
function getRatio(child, parent) {
  return ((child / parent) * 100).toFixed(2) + '%';
}

/**
 * 创建rect矩形的标记的图标
 * @param {*} px
 * @param {*} py
 * @param {*} w
 * @param {*} h
 * @param {*} id
 */
function createSvg(px, py, w, h, id) {
  const svg = document.getElementById(containerId),
    rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  // 利用createElementNS创建，基于rect
  rect.setAttribute('id', id);
  rect.setAttribute('x', px);
  rect.setAttribute('y', py);
  rect.setAttribute('width', w);
  rect.setAttribute('height', h);
  rect.setAttribute('style', 'fill:#FFDD44;');
  rect.setAttribute('fill-opacity', 0.4);
  // 将绘制好的矩形添加到svg中
  debugger;
  svg.appendChild(rect);
  // 然后弹窗出来设置分句的跟唱
}

/**
 * 根据json数据绘制div
 * @param {*} data json
 */
export function render(data) {
  const svg = document.getElementById(containerId);
  data.forEach(item => {
    const { x, y, w, h, _divId, text } = item;
    if (!text) {
      // 图形标注
      createSvg(x, y, w, h, _divId);
    } else {
      // 文本标注
      createText(
        {
          x,
          y,
          text
        },
        svg
      );
    }
  });
}

/**
 * 分割地址
 * @param {*} str
 */
export function splitPosition(str) {
  str = str.split(',');
  let obj = {};
  str.map(item => {
    item = item.split(':');
    obj[item[0]] = item[1];
  });
  return obj;
}

/**
 * 根据node名处理添加标记还是删除
 * @param {*} node
 * @param {*} handle
 */
function handleNodeName(e, handle, bind) {
  const node = e.target;
  // TODO:删除直接点击色块外的标记功能
  // if (node.nodeName === 'svg') {
  //   // 点击空白区域，添加文本标签
  //   ElMessageBox.prompt('请输入重点标注信息', '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //   })
  //     .then(({ value }) => {
  //       const svg = document.getElementById(containerId);
  //       createText(
  //         {
  //           x: e.offsetX,
  //           y: e.offsetY,
  //           text: value,
  //         },
  //         svg
  //       );
  //       const list = getActivityDiv();
  //       handle(list);
  //     })
  //     .catch(() => {});
  // }

  if (node.nodeName === 'rect') {
    // 删除标签
    // ElMessageBox.confirm('您真的要删除标记吗？', '提示', {
    //   type: 'warning',
    // })
    //   .then(() => {
    //     removeEle(node.id);
    //     const list = getActivityDiv();
    //     const newList = list.filter((it) => it.id !== node.id);
    //     handle(newList);
    //     // 清除数据记录
    //   })
    //   .catch(() => {});
    //  TODO:强制通信将dialog展示出来，设置为true
    // store.state.dialogRectFlag = true;
    // TODO:强行将整个rectDialog弹窗展示
    bind.value.rectDialog = true;
    // 弹窗出来后，此时这里的拖动属性做成false
    // TODO:这样会导致页面中某一个元素的id上增加一个draggle的标记
    // console.log(draggable, 'draggle');
    // draggable.disabled = true;
    // TODO:方法1，如何通过库里面属性关闭此时的draggle作用区间
    // TODO:触发弹窗的实现
    if (bind.value.rectDialog) {
      // TODO:同时将此时的双击哪一个黄色区块发送一下，同时整个列表传出去
      bind.value.rectDialogFn(node.id, getActivityDiv());
    }
  }

  // else if (node.nodeName === 'text') {
  //   ElMessageBox.confirm('您真的要播放当前的标签吗？', '提示', {
  //     type: 'warning',
  //   })
  //     .then(() => {
  //       removeEle(node.id);
  //       const list = getActivityDiv();
  //       const newList = list.filter((it) => it.id !== node.id);
  //       handle(newList);
  //       // 清除数据记录
  //     })
  //     .catch(() => {});
  // }
}

/**
 * 删除标签
 * @param {*} id
 */
function removeEle(id) {
  document.getElementById(id).remove();
}

function createText(option, container) {
  const ele = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  ele.setAttribute('x', option.x);
  ele.setAttribute('y', option.y);
  ele.setAttribute('fill', '#FF7E41');
  ele.setAttribute('font-size', '15');
  ele.setAttribute('id', Math.random());
  ele.innerHTML = option.text;
  debugger;
  container.appendChild(ele);
}
