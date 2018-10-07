const Post = () => import("@/views/post");
const Photos = () => import("@/views/photos");
const Notes = () => import("@/views/notes");
const About = () => import("@/views/about");
const Setting = () => import("@/views/setting");
const Tags = () => import("@/views/tags");

const Blog = () => import("@/views/index/blog");
const BlogList = () => import("@/views/index/bloglist");

const Login = () => import("@/views/login");

export default [
  {
    path: "/",
    name: "post",
    component: Post,
    children: [
      {
        path: "/posts",
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
      },
      {
        path: "/tags",
        name: "tags",
        component: Tags
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
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];
