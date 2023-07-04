import axios from "axios";

class UserData {
  baseUrl = "http://localhost:8080/user";

  getUserByToken(token) {
    return axios.get(`${this.baseUrl + "/token"}`, {
      headers: {
        token: token,
      },
    });
  }
}
export default new UserData();
