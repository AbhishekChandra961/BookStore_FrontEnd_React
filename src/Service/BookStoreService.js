import axios from "axios";

class BookStoreService {
  baseUrl = "http://localhost:8080/us";
  // baseUrlForgot = "http://localhost:8080/usp";

  addUser(data) {
    return axios.post(`${this.baseUrl + "/adduser"}`, data);
  }
  // getById(user_id) {
  //   return axios.get(`${this.baseUrl}/${user_id}`);
  // }
  verifyOtp(obj) {
    return axios.put(`${this.baseUrl}/verification`, obj);
  }
  login(obj) {
    return axios.put(`${this.baseUrl}/login`, obj);
  }
}
export default new BookStoreService();
