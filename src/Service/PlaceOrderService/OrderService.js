import axios from "axios";

class OrderService {
  baseUrl = "http://localhost:8080/order";

  placeOrder(token, address) {
    return axios.post(`${this.baseUrl}/placeOrder`, address, {
      headers: {
        token: token,
      },
    });
  }
  getByToken(token) {
    return axios.get(`${this.baseUrl}/getbytoken`, {
      headers: {
        token: token,
      },
    });
  }
  cancelOrder(token, order_id) {
    return axios.put(`${this.baseUrl}/cancel?order_id=${order_id}`, null, {
      headers: {
        token: token,
      },
    });
  }
}
export default new OrderService();
