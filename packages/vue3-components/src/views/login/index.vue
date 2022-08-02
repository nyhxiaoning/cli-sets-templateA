<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import md5 from "md5";
import { ElMessage } from "element-plus";
import { loginToken, getUserinfo } from "/api/login";
const Store = useStore();
const Router = useRouter();
const loginRef = ref("");
const state = reactive({
  policy: false,
  loginForm: {
    client_id: "sch",
    client_secret: "654321",
    grant_type: "password",
    username: "",
    password: ""
  },
  loginRules: {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      {
        min: 6,
        max: 12,
        message: "长度在 6 到 12 个字符",
        trigger: "blur"
      }
    ]
  }
});
const login = () => {
  loginRef.value.validate(async (valid, validObj) => {
    if (valid) {
      const params = JSON.parse(JSON.stringify(state.loginForm));
      params.password = md5(params.password);
      let { code, data, msg } = await loginToken(params);
      if (code == 200) {
        Store.commit("common/setData", { token: data.token });
        Router.push({ path: "/" });
      } else {
        ElMessage({
          type: "error",
          message: msg
        });
      }
    }
  });
};
</script>

<template>
  <div class="bg">
    <div class="form">
      <el-form
        ref="loginRef"
        class="login"
        :model="state.loginForm"
        :login-rules="state.loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="state.loginForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="state.loginForm.password"
            placeholder="请输入密码"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="login">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="state.policy">
            登录即代表您已同意“隐私权相关政策”
          </el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg {
  background: url("@/assets/img/bg.webp") center center no-repeat;
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.form {
  position: fixed;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 430px;
  height: 340px;
  background: #fff;
  border-radius: 15px;
}
.login {
  padding: 40px;
}
</style>
