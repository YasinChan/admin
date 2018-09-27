import Vue from "vue";
import Router from "vue-router";

const Index = () => import("./views/index");
const Photos = () => import("./views/photos");
const Notes = () => import("./views/notes");
const About = () => import("./views/about");
const Setting = () => import("./views/setting");

const Blog = () => import("./views/index/blog");
const BlogList = () => import("./views/index/bloglist");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/admin/",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "/",
          name: "",
          component: BlogList
        },
        {
          path: "newblog",
          name: "newblog",
          component: Blog
        },
        {
          path: "editblog/:id",
          name: "editblog",
          component: Blog
        }
      ]
    },
    {
      path: "/photos",
      name: "photos",
      component: Photos
    },
    {
      path: "/notes",
      name: "notes",
      component: Notes
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting
    }
  ]
});
