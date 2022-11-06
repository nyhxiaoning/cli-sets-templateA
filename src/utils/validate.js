import Vue from "vue";

export default {
  validatephone: function (rule, value, callback) {
    if (!value) {
      return callback(new Error("(必填)"));
    } else if (!/^[0-9]{11}$/.test(value)) {
      return callback(new Error("电话号码输入有误"));
    } else {
      callback();
    }

  },
  validatephoneNew:function(rule, value, callback){
    if(!value && rule.required==true){
      return callback(new Error("(必填)"));
    }else if (!/^[0-9]{11}$/.test(value) &&  !/^0\d{2,3}-?\d{7,8}$/.test(value) && value){
      return callback(new Error("电话有误!"));
    }else{
      callback();
    }
  },
  validatetel: function (rule, value, callback) {
    if (value == "") {
      callback();
    } else if (!/^[0-9]{11}$/.test(value)) {
      return callback(new Error("电话号码输入有误"));
    } else {
      callback();
    }
  },
  validateIDCard: function (rule, value, callback) {
    if (value == "") {
      callback(new Error("必填"));
    } else {
      let code = value;
      if (!code || !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/.test(code)) {
        return callback(new Error("证件号有误"));
      }else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            return callback(new Error("身份证号输入有误"));
            // return callback(new Error("电话号码输入有误"));
          } else {
            callback();
          }
        } else {
          return callback(new Error("身份证号码输入有误"));
        }
      }

    }
  },
  validateIDCardInfo: function (rule, value, callback) {
    if (value == "") {
      callback();
    } else {
      let code = value;
      if (!code || !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/.test(code)) {
        return callback(new Error("证件号有误"));
      }else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split('');
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            return callback(new Error("身份证号输入有误"));
            // return callback(new Error("电话号码输入有误"));
          } else {
            callback();
          }
        } else {
          return callback(new Error("身份证号码输入有误"));
        }
      }

    }
  },
  validateuser: function (rule, value, callback) {
    if (!value) {
      return callback(new Error("请输入用户名"));
    } else if (!/^[a-zA-Z\d]+$/.test(value)) {
      return callback(new Error("请正确输入用户名"))
    } else {
      callback();
    }


  },
  validatenumber: function (rule, value, callback) {
    var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    if (!value) {
      return callback(new Error("请输入数字"));
    } else if (!re.test(value)) {
      value = ""
      return callback(new Error("输入数字格式错误"));
    } else {
      callback();
    }
  },

  validatenumAlph: function (rule, value, callback) {
    var re = /^[a-z0-9]+$/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    if (!value) {
      return callback(new Error("输入数字或者字母"));
    } else if (!re.test(value)) {
      value = ""
      return callback(new Error("输入数字或者字母"));
    } else {
      callback();
    }
  },
  /**
   * 只能输入数字
   * @DateTime  2018-05-23
   * @param  rule 正则表达式   e 获取当前对象
   */
  format: function (rule, e) {
    //前后移动光标，不计入验证
    if (e.keyCode == 37 || e.keyCode == 39) {
      return;
    } else {
      let el = e.target;
      if (el.value) {
        el.value = el.value.replace(rule, '');
      }
    }
  },
  formatTwo: function (rule, e, num) {
    //前后移动光标，不计入验证
    if (e.keyCode == 37 || e.keyCode == 39) {
      return;
    } else {
      let el = e.target;
      if (el.value) {
        let value = el.value.replace(rule, '');
        el.value = value.substring(0, num);
        return el.value;
      }
    }
  },
  /**
   * 只能输入数字
   * @DateTime  2018-05-23
   * @param  rule 正则表达式  num  限制输入的位数  e 获取当前对象
   */
  formatNum: function (rule, num, e) {
    //前后移动光标，不计入验证
    if (e.keyCode == 37 || e.keyCode == 39) {
      return;
    } else {
      /* let pos=this.getCursorPos(e);//保存原始光标位置 
       let temp=e.target.value; //保存原始值 */
      let el = e.target;
      let value = el.value.replace(rule, '');
      el.value = value.substring(0, num);
      /*console.log("pos:"+pos)
      pos=pos-(temp.length-e.target.value.length);//当前光标位置 
      console.log("end:"+pos)
      this.setCursorPos(e,pos);//设置光标 */
      return el.value
    }
  },
  //只能输入数字或者字母
  numberAlphabet: function (e) {
    let el = e.target;
    var re = /[^a-zA-Z0-9]/g;//判断字符串是否为数字  字母组合
    //console.log(e.keyCode)
    if (e.keyCode == 37 || e.keyCode == 39) {
      return;
    } else {
      el.value = el.value.replace(re, '')
      return el.value;
    }
  },
  //判断跳转急救管理
  firstAid(obj) {
    if (obj == "commandDispatch") {
      /* const { href } = this.$router.resolve({
         name:obj,
       })
       console.log(href);*/
      let href = "#/" + obj;
      var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1"; //定义弹出窗口的参数
      if (window.screen) {
        var ah = screen.availHeight;
        var aw = screen.availWidth - 10;
        fulls += ",height=" + ah;
        fulls += ",innerHeight=" + ah;
        fulls += ",width=" + aw;
        fulls += ",innerWidth=" + aw;
        fulls += ",resizable"
      } else {
        fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually
      }
      console.log(href);
      console.log(screen.availWidth);
      var myWindow = window.open(href, "112", fulls, true);
      let mcpcScreen = localStorage.getItem('mcpcScreen');
      console.log(mcpcScreen);
      if (mcpcScreen != "1") {
        myWindow.moveTo(-screen.availWidth, 0); //1000是根据自己环境来设定的，应该有更好的方式。
        myWindow.focus();
        localStorage.setItem('mcpcScreen', "1")
      }
    }
  },

}
