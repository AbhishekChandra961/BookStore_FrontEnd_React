import axios from "axios";

class BookAddService {
  baseUrl = "http://localhost:8080/book";

  addBook(data) {
    return axios.post(`${this.baseUrl + "/add"}`, data);
  }
  allBook() {
    return axios.get(`${this.baseUrl + "/allbooks"}`);
  }
}
export default new BookAddService();
