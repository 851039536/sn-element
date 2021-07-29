/**
 * labels模块接口列表
 */
import request from "./index.js"; // 导入http中创建的axios实例
const labels = {
  // 查询所有
  GetAllAsync() {
    return request({
      url: "/api/SnLabels/GetAllAsync?cache=false",
      method: "get"
    });
  },
  // 查询总数
  GetCountAsync() {
    return request({
      url: "/api/SnLabels/GetCountAsync?cache=false",
      method: "get"
    });
  },
  //分页查询
  GetfyAllAsync(pageIndex, pageSize, isDesc) {
    return request({
      url:
        "/api/SnLabels/GetfyAllAsync?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize +
        "&isDesc=" +
        isDesc +
        "&cache=false",
      method: "get"
    });
  },
  // 主键查询
  GetByIdAsync(id) {
    return request({
      url: "/api/SnLabels/GetByIdAsync?id=" + id,
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
export default labels;
