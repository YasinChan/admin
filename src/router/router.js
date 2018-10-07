import Vue from "vue";
import Router from "vue-router";

import routes from "./routes.js";

import jwt from "jsonwebtoken";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/admin/",
  routes: routes
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const v = jwt.decode(token);
    const password = v.password;
    if (password === "cyy08167915") {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  }
});

export default router;
