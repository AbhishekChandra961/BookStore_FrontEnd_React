import axios from "axios";

class BookStoreReset {
  baseUrlForgot = "http://localhost:8080/usp";

  forgot(email) {
    return axios.put(`${this.baseUrlForgot}/forgot?email=${email}`);
  }
  reset(email, password) {
    return axios.put(
      `${this.baseUrlForgot}/reset?email=${email}&password=${password}`
    );
    // return axios.put(`${this.baseUrlForgot}/reset`, null, {
    //   params: {
    //     email: email,
    //     password: password,
    //   },
    // });
  }

  verifyResetOtp(obj) {
    return axios.put(`${this.baseUrlForgot}/varify`, obj);
  }
}
export default new BookStoreReset();
