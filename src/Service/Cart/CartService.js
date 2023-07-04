import axios from "axios";

class cart {
  baseUrl = "http://localhost:8080/cart";

  addToCart(obj) {
    return axios.post(`${this.baseUrl + "/add"}`, obj);
  }
  getById(token) {
    return axios.get(`${this.baseUrl + "/get"}`, {
      headers: {
        token: token,
      },
    });
  }
  updateQuantityByToken(token, cart_id, quantity) {
    return axios.put(
      `${this.baseUrl}/update?cart_id=${cart_id}&quantity=${quantity}`,
      null,
      {
        headers: {
          token: token,
        },
      }
    );
  }
  removeCart(cart_id) {
    return axios.delete(`${this.baseUrl}/deletecart/${cart_id}`);
  }
}
export default new cart();
