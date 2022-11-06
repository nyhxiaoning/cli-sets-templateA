module.exports = {
    root: true,
    env: {
        node: false
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    // 这里第一个属性表示基本的eslint校验，第二个是格式化
    // "eslint:recommended"这里声明了没有使用报错
    /**
     * 0 or 'off': 关闭规则
     * 1 or 'warn': 打开规则，并且作为一个警告，字体颜色为黄色（并不会导致检查不通过）
     * 2 or 'error': 打开规则，并且作为一个错误 ，色体颜色为红色(退出码为1，检查不通过)
     */
    rules: {
        "prettier/prettier": "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "space-before-function-paren": ["off", "always"], // 函数定义时括号前面要有空格 - 关闭
        "no-spaced-func": "error", // 函数调用时 函数名与()之间不能有空格
        "no-const-assign": "error", // 禁止修改const声明的变量
        "comma-dangle": 0, // 对象字面量项尾不能有逗号
        indent: ["off", 2, { SwitchCase: 1 }], // 缩进风格
        camelcase: "off", //强制驼峰法命名 - 关闭
        "no-var": "off", //禁用var，用let和const代替
        "no-unused-vars": "off", // 关闭不能有声明后未被使用的变量或参数
        "no-with": "off", // 禁用with
        "arrow-parens": "off", // 箭头函数用小括号括起来 - 关闭
        "no-alert": "off", //禁止使用alert confirm prompt - 关闭
        "vue/attribute-hyphenation": "off", // vue属性连子
        "vue/prop-name-casing": "off", // props必须为小驼峰式["off", "camelCase"]
        "vue/order-in-components": [
            // 组件属性顺序规范
            "off",
            {
                order: ["el", "name", ["components", "directives"], "extends", "mixins", "filters", "inheritAttrs", "model", ["props", "propsData"], "data", "computed", "watch", ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeDestroy", "destroyed"], "methods", "head", ["template", "render"], "renderError"]
            }
        ]
        // "vue/component-name-in-template-casing": [
        //   "error",
        //   "kebab-case",
        //   {
        //     registeredComponentsOnly: false,
        //     ignores: []
        //   }
        // ]
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
