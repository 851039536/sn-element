/**
 * sort模块接口列表
 */
import request from "./index.js"; // 导入http中创建的axios实例
const sort = {
  // 分页查询文章（无文章内容）
  GetAllAsync() {
    return request({
      url: "/api/SnSort/GetAllAsync",
      method: "get"
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
export default sort;
