/**
 * article模块接口列表
 */
import request from "./index.js"; // 导入http中创建的axios实例
const article = {
  // 分页查询文章（无文章内容）
  GetFyTitleAsync(pageIndex, pageSize, isDesc, cache) {
    return request({
      url:
        "/api/SnArticle/GetFyTitleAsync?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize +
        "&isDesc=" +
        isDesc +
        "&cache=" +
        cache,
      method: "get"
    });
  },
  // 按标签分页查询
  GetfyTestAsync(type, pageIndex, pageSize, isDesc, cache) {
    return request({
      url:
        "/api/SnArticle/GetfyTestAsync?type=" +
        type +
        "&pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize +
        "&isDesc=" +
        isDesc +
        "&cache=" +
        cache,
      method: "get"
    });
  },

  // 查询总数
  GetCountAsync() {
    return request({
      url: "/api/SnArticle/GetCountAsync?cache=false",
      method: "get"
    });
  },
  // 条件查询总数
  GetTypeCountAsync(type) {
    return request({
      url: "/api/SnArticle/GetTypeCountAsync?type=" + type + "&cache=false",
      method: "get"
    });
  },
  DeleteAsync(id) {
    return request({
      url: "/api/SnArticle/DeleteAsync?id=" + id,
      method: "delete"
    });
  },

  //主键查询
  GetByIdAsync(id) {
    return request({
      url: "/api/SnArticle/GetByIdAsync?id=" + id + "&cache=false",
      method: "get"
    });
  },

  // 添加数据
  AddAsync(data) {
    return request({
      url: "/api/SnArticle/AddAsync",
      method: "put",
      data: data
    });
  }

  // post提交
  // login(data) {
  //   return request({
  //     url: "/adduser",
  //     method: "post",
  //     data: qs.stringify(data), //注意post提交用data参数
  //     hideloading: true
  //   });
  // }
  // 其他接口…………
};
export default article;
