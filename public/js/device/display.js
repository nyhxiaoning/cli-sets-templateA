import { command } from "../command.js";

class Display {
  constructor() {
    this.imageUrl = null; //设置图片的Url信息
    this.imageResolution = null; //设定输出图片分辨率
    this.text = null;  //设定屏幕上显示的文本
    this.textColor = null;   //设定文字颜色
    this.textSize = null;  //设定文字字号
    this.setLanguage = "Chinese";  //设定文字语言(Chinese,English)
  }
}

Display.prototype.setImage = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1200007",
      desc: [
        [
          {
            id: 1,
            type: "void",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.imageUrl=data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getImageUrl = function() {
  return this.imageUrl;
}

Display.prototype.setImageResolution = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1200008",
      desc: [
        [
          {
            id: 1,
            type: "void",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.imageResolution=data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getImageResolution = function() {
  return this.imageResolution;
}

Display.prototype.setText = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "LED3",
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.text=data.value
        console.log('text', this.text)
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        console.log('报错了', e)
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getText = function() {
  return this.text;
}

Display.prototype.setTextColor = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1200010",
      desc: [
        [
          {
            id: 1,
            type: "void",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.textColor = data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getTextColor = function() {
  return this.textColor;
}

Display.prototype.setTextSize = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1200011",
      desc: [
        [
          {
            id: 1,
            type: "void",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.textSize = data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getTextSize = function() {
  return this.textSize;
}

Display.prototype.setLanguage = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1200012",
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.setLanguage = data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

Display.prototype.getLanguage = function() {
  return this.setLanguage;
}

window.Display = Display;
export default Display;