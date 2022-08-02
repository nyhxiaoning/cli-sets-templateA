import { defineComponent as b, ref as g, openBlock as f, createElementBlock as v, Fragment as y, createElementVNode as o, toDisplayString as d, pushScopeId as k, popScopeId as $, createTextVNode as e, resolveComponent as i, createBlock as S, withCtx as n, createVNode as c } from "vue";
const a = (t) => (k("data-v-8fe7e3eb"), t = t(), $(), t), x = { class: "card" }, V = /* @__PURE__ */ a(() => /* @__PURE__ */ o("p", null, [
  /* @__PURE__ */ e(" Edit "),
  /* @__PURE__ */ o("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ e(" to test HMR ")
], -1)), j = /* @__PURE__ */ a(() => /* @__PURE__ */ o("p", null, [
  /* @__PURE__ */ e(" Check out "),
  /* @__PURE__ */ o("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /* @__PURE__ */ e(", the official Vue + Vite starter ")
], -1)), I = /* @__PURE__ */ a(() => /* @__PURE__ */ o("p", null, [
  /* @__PURE__ */ e(" Install "),
  /* @__PURE__ */ o("a", {
    href: "https://github.com/johnsoncodehk/volar",
    target: "_blank"
  }, "Volar"),
  /* @__PURE__ */ e(" in your IDE for a better DX ")
], -1)), C = /* @__PURE__ */ a(() => /* @__PURE__ */ o("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1)), H = /* @__PURE__ */ b({
  __name: "HelloWorld",
  props: {
    msg: null
  },
  setup(t) {
    const l = g(0);
    return (s, r) => (f(), v(y, null, [
      o("h1", null, d(t.msg), 1),
      o("div", x, [
        o("button", {
          type: "button",
          onClick: r[0] || (r[0] = (u) => l.value++)
        }, "count is " + d(l.value), 1),
        V
      ]),
      j,
      I,
      C
    ], 64));
  }
});
const m = (t, l) => {
  const s = t.__vccOpts || t;
  for (const [r, u] of l)
    s[r] = u;
  return s;
}, M = /* @__PURE__ */ m(H, [["__scopeId", "data-v-8fe7e3eb"]]), O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: M
}, Symbol.toStringTag, { value: "Module" })), W = {
  name: "MyButtom"
}, w = /* @__PURE__ */ e("Default"), D = /* @__PURE__ */ e("Primary"), B = /* @__PURE__ */ e("Success"), E = /* @__PURE__ */ e("Info"), N = /* @__PURE__ */ e("Warning"), P = /* @__PURE__ */ e("Danger"), T = /* @__PURE__ */ e("\u4E2D\u6587");
function z(t, l, s, r, u, R) {
  const _ = i("el-button"), h = i("el-row");
  return f(), S(h, { class: "mb-4" }, {
    default: n(() => [
      c(_, null, {
        default: n(() => [
          w
        ]),
        _: 1
      }),
      c(_, { type: "primary" }, {
        default: n(() => [
          D
        ]),
        _: 1
      }),
      c(_, { type: "success" }, {
        default: n(() => [
          B
        ]),
        _: 1
      }),
      c(_, { type: "info" }, {
        default: n(() => [
          E
        ]),
        _: 1
      }),
      c(_, { type: "warning" }, {
        default: n(() => [
          N
        ]),
        _: 1
      }),
      c(_, { type: "danger" }, {
        default: n(() => [
          P
        ]),
        _: 1
      }),
      c(_, null, {
        default: n(() => [
          T
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const q = /* @__PURE__ */ m(W, [["render", z]]), F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: q
}, Symbol.toStringTag, { value: "Module" })), p = Object.assign({ "./HelloWorld.vue": O, "./Mybutton.vue": F }), A = {
  install(t) {
    for (let l in p) {
      let s = p[l].default;
      t.component(s.name, s);
    }
  }
};
export {
  A as default
};
