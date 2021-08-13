/*
 * @Author: your name
 * @Date: 2021-08-10 09:54:00
 * @LastEditTime: 2021-08-10 10:20:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\api\setBlog.js
 */
/**
 * setBlog模块接口列表
 */
import request from "./index.js"; // 导入http中创建的axios实例
const setBlog = {

  //查询总数
  GetCountAsync() {
    return request({
      url: "/api/SnSetBlog/GetCountAsync?cache=false",
      method: "get"
    });
  },

  //条件查询总数
  // CountTypeAsync(type) {
  //   return request({
  //     url: "/api/SnNavigation/CountTypeAsync?type=" + type + "&cache=false",
  //     method: "get"
  //   });
  // },

  //分页条件查询条件:00 -表示查询所有 
  GetFyAllAsync(type, pageIndex, pageSize, isDesc) {
    return request({
      url: "/api/SnSetBlog/GetfyAsync?type=" + type + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&isDesc=" + isDesc + "&cache=false",
      method: "get"
    });
  },
  // DeleteAsync(id) {
  //   return request({
  //     url: "/api/SnNavigation/DeleteAsync?id=" + id,
  //     method: "delete"
  //   });
  // },



  // 添加数据
  // AddAsync(data) {
  //   return request({
  //     url: "/api/SnArticle/AddAsync",
  //     method: "put",
  //     data: data
  //   });
  // }

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
export default setBlog;