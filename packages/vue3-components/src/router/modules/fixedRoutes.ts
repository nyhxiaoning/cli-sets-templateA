export default [
  {
    path: "/",
    redirect: "/course"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  }
];
