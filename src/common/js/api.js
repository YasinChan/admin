import { axiosInstance } from "./axiosInstance.js";

export const postLogin = param => axiosInstance.post("/api/login", param);
/**
 * 获取所有文章列表
 */
export const getPosts = () => axiosInstance.get("/api/post");

/**
 * 通过 id 获取文章详情
 * @param id 文章id
 * @returns {*}
 */
export const getPostById = id => axiosInstance.get(`/api/post/${id}`);

/**
 * 新建文章
 * @param param
 * @returns {*|void|AxiosPromise<any>}
 */
export const createPost = param =>
  axiosInstance.post("/api/post/create", param);

/**
 * 更新文章
 * @param param
 * @returns {*|void|AxiosPromise<any>}
 */
export const updatePost = param =>
  axiosInstance.post("/api/post/update", param);

/**
 * 删除文章
 * @param id
 * @returns {*}
 */
export const deletePostById = id => axiosInstance.delete(`/api/post/${id}`);

/**
 * 更新文章中的标签
 * @param param
 * @returns {*|void|AxiosPromise<any>}
 */
export const updatetagbypostid = param =>
  axiosInstance.post("/api/updatetagbypostid", param);

/**
 * 获取七牛的 token 用来前端上传图片到七牛
 * @returns {*}
 */
export const getUptoken = () => axiosInstance.get("/api/uptoken");

/**
 * 保存图片地址
 * @param param
 * @returns {*|void|AxiosPromise<any>}
 */
export const savePicture = param =>
  axiosInstance.post("/api/saveupload", param);

/**
 * 获取所有标签
 * @returns {*}
 */
export const getTags = () => axiosInstance.get("/api/tag");

export const updateTag = param => axiosInstance.post("/api/updatetag", param);

export const createTag = param => axiosInstance.post("/api/createtag", param);
