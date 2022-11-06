// 手机号验证
export function isPhone(phone) {
  const pattern = /^1[3456789]\d{9}$/;
  return pattern.test(phone);
}
// 中文姓名验证
export function isCnName(name) {
  const pattern = /^[\u4E00-\u9FA5]{2,4}$/;
  return pattern.test(name);
}
// 身份证验证
export function isID(id) {
  const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]/;
  return pattern.test(id);
}
// 邮箱验证
export function isEmail(mail) {
  const pattern = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return pattern.test(mail);
}
// 证件号码
export function isdocID(id) {
  const pattern = /^\d{8,30}$/;
  return pattern.test(id);
}
// 证件号码
export function isWord(id, length) {
  let arr = length.split("-");
  const pattern = new RegExp(`^([\\u4E00-\\u9FA5\\w\\(\\)]){${arr[0]},${arr[1]}}$`);
  return pattern.test(id);
}
// 证件号码
export function isWord2(val, length) {
  let arr = length.split("-");
  const pattern = new RegExp(`^\\w{${arr[0]},${arr[1]}}$`);
  return pattern.test(val);
}
// 长度或
export function isWordlen(val, length) {
  let arr = length.split("-");
  // const pattern = /^\w{15}$|^\w{18}$/
  const pattern = new RegExp(`^\\w{${arr[0]}}$|^\\w{${arr[1]}}$`);
  return pattern.test(val);
}
export function isNumber(val) {
  return /\D/g.test(val);
}
export function validRule(type, msg = "不能为空", event = "change") {
  const validFuc = {
    zeo_func: (rule, val, cb) => {
      if (Number(val) === 0) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    pone_func: (rule, val, cb) => {
      if (!isPhone(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    singlePrecision: (rule, val, cb) => {
      const parttern = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^([^0][0-9]+|0)$/;
      if (!parttern.test(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    idCard: (rule, val, cb) => {
      if (!isID(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isdocID: (rule, val, cb) => {
      if (!isdocID(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord2to10: (rule, val, cb) => {
      if (!isWord(val, "2-10")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord15or18: (rule, val, cb) => {
      if (!isWordlen(val, "15-18")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord9or10: (rule, val, cb) => {
      if (!isWordlen(val, "9-10")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isEmial: (rule, val, cb) => {
      if (!isEmail(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    // 正整数
    integer_func: (rule, val, cb) => {
      if (Number.isNaN(Number(val))) {
        return cb(new Error("请输入正整数"));
      }
      let temp = Number(val);
      if (temp >= 0 && Number.isInteger(temp)) {
        cb();
      } else {
        cb(new Error("请输入正整数"));
      }
    },
    // 非零正整数
    nonZeroIntegerFunc: (rule, val, cb) => {
      if (val === "" || (val && Number(val) > 0 && Number.isInteger(Number(val)))) {
        cb();
      } else {
        cb(new Error("请输入大于0的正整数"));
      }
    },
    // 非空非零判断
    noneZeroRequired: (rule, val, cb) => {
      if (Number(val) === 0) {
        cb(new Error("该项不能为空"));
      } else {
        cb();
      }
    },
    // 非中文输入判断
    validNoChinese: (rule, val, cb) => {
      if (val && val.search(/[\u4e00-\u9fa5]/) > -1) {
        cb(new Error("此项不支持中文输入"));
      } else {
        cb();
      }
    },
    // 校验非法字符串
    validLegalName: (rule, val, cb) => {
      if (typeof val === "string") {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5&\-（）·]+$/gm;
        if (!String(val).match(reg)) {
          return cb(new Error(`不能输入非法字符`));
        }
        return cb();
      } else {
        return cb(new Error("请确保数据格式为字符串"));
      }
    },
    // 正整数
    validPosInt: (rule, val, cb) => {
      if (Number.isNaN(Number(val))) {
        return cb(new Error("请输入正整数"));
      }
      let temp = Number(val);
      if (temp >= 0 && Number.isInteger(temp)) {
        cb();
      } else {
        cb(new Error("请输入正整数"));
      }
    },
    // 两位小数点
    validDoublePrecision: (rule, val, cb) => {
      if (Number.isNaN(Number(val))) {
        cb(new Error("请输入合法数字"));
      }
      val = Number(val);
      // if (val <= 0) {
      //   return cb(new Error("输入的数字应大于零"));
      // }
      if (typeof val === "number") {
        let actualLen = String(val).indexOf(".") > -1 ? String(val).split(".")[1].length : 0;
        if (actualLen > 2) {
          cb(new Error("最多只支持两位精度小数"));
        } else {
          cb();
        }
      } else {
        cb(new Error("请输入最多两位精度的小数"));
      }
    },
    // 字符数量控制
    validUplimit: (rule, val, limit, cb) => {
      if (val === "") {
        cb();
      }
      if (val.length > Number(limit)) {
        cb(new Error(`字符请控制在${limit}字以内`));
      } else {
        cb();
      }
    },
    // 300字符
    valid_300: (rule, val, cb) => {
      validFuc.validUplimit(rule, val, 300, cb);
    },
    hotelUploadPic: (rule, val, cb) => {
      if (val.length <= 0) {
        cb(new Error("图片不能空"));
      } else {
        const sucImgList = val.filter(item => item.temporaryDeleted !== 1);
        if (sucImgList.length <= 0) {
          cb(new Error("图片不能空"));
        } else {
          cb();
        }
      }
    }
  };
  switch (type) {
    case "requiredOnly":
      return [{ required: true, message: msg, trigger: "change" }];
    case "requiredOnlyBlur":
      return [{ required: true, message: msg, trigger: "blur" }];
    // 非空非零
    case "noneZeroRequired":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.noneZeroRequired, message: msg, trigger: event }
      ];
    case "array":
      return [{ type: "array", required: true, message: msg, trigger: event }];
    case "phone":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.pone_func, message: "请输入正确手机格式号码", trigger: "blur" }
      ];
    case "noZeo":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.zeo_func, message: msg, trigger: "blur" }
      ];
    case "singlePrecision":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.singlePrecision, message: "请输入有效数值", trigger: "blur" }
      ];
    case "idCard":
      return [
        { required: true, message: msg, trigger: "change" },
        { validator: validFuc.idCard, message: "请输入有效身份证格式", trigger: "blur" }
      ];
    case "docId":
      return [
        { required: true, message: msg, trigger: "change" },
        { validator: validFuc.isdocID, message: "请输入有效证件格式", trigger: "blur" }
      ];
    case "isWord2to10":
      return [
        { required: true, message: msg, trigger: "change" },
        { validator: validFuc.isWord2to10, message: "请输入有效格式值", trigger: "blur" }
      ];
    case "isWord15or18":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isWord15or18,
          message: "格式不正确，请正确填写营业执照上的18位统一社会信用代码或15位注册号",
          trigger: "blur"
        }
      ];
    case "isWord9or10":
      return [
        { required: true, message: msg, trigger: "change" },
        { validator: validFuc.isWord9or10, message: "格式不正确", trigger: "blur" }
      ];
    case "email":
      return [
        { required: true, message: msg, trigger: "change" },
        { validator: validFuc.isEmial, message: "请输入有效邮箱格式", trigger: "blur" }
      ];
    case "nonZeroInteger":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.nonZeroIntegerFunc, trigger: event }
      ];
    // 必填，非中文
    case "requiredAndEnglish":
      return [
        { required: true, message: msg, trigger: "blur" },
        { validator: validFuc.validNoChinese, trigger: "blur" }
      ];
    // 校验非法字符串
    case "validLegalName":
      return [
        { required: true, message: msg, trigger: "blur" },
        { validator: validFuc.validLegalName, trigger: "blur" }
      ];
    // 必填、正整数
    case "validPosInt":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.validPosInt, trigger: event }
      ];
    // 必填、正整数、非0
    case "validPosIntNoneZero":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.validPosInt, trigger: event },
        { validator: validFuc.noneZeroRequired, message: msg, trigger: event }
      ];
    // 300字符，必填
    case "validRequired300":
      return [
        { required: true, message: msg, trigger: "blur" },
        { validator: validFuc.valid_300, trigger: "blur" }
      ];
    // 300字符，非必填
    case "valid300":
      return [{ validator: validFuc.valid_300, trigger: "blur" }];
    // 必填、两位小数、非0
    case "requiredAndDoublePrecision":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.noneZeroRequired, message: msg, trigger: event },
        { validator: validFuc.validDoublePrecision, trigger: event }
      ];
    // 必填、两位小数
    case "zeroAndDoublePrecision":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.validDoublePrecision, trigger: event }
      ];
    case "hotelUploadPic":
      return [{ required: true, validator: validFuc.hotelUploadPic, trigger: "change" }];
  }
}
