/*
 * @Author: your name
 * @Date: 2021-07-28 11:14:17
 * @LastEditTime: 2021-07-28 12:25:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\api\navigation.js
 */
/**
 * navigation模块接口列表
 */
import request from "./index.js"; // 导入http中创建的axios实例
const navigation = {

  //查询总数
  GetCountAsync() {
    return request({
      url: "/api/SnNavigation/GetCountAsync?cache=false",
      method: "get"
    });
  },

  //条件查询总数
  CountTypeAsync(type) {
    return request({
      url: "/api/SnNavigation/CountTypeAsync?type=" + type + "&cache=false",
      method: "get"
    });
  },

  //分页条件查询条件:all -表示查询所有 
  GetFyAllAsync(type, pageIndex, pageSize, isDesc) {
    return request({
      url: "/api/SnNavigation/GetFyAllAsync?type=" + type + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&isDesc=" + isDesc + "&cache=false",
      method: "get"
    });
  },
  DeleteAsync(id) {
    return request({
      url: "/api/SnNavigation/DeleteAsync?id=" + id,
      method: "delete"
    });
  },

  //SnNavigationType --NavType
  // 查询type所有
  GetNavTypeAllAsync() {
    return request({
      url: "/api/SnNavigationType/GetAllAsync?cache=false",
      method: "get"
    });
  },

  // DeleteAsync(id) {
  //   return request({
  //     url: "/api/SnArticle/DeleteAsync?id=" + id,
  //     method: "delete"
  //   });
  //},



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
export default navigation;