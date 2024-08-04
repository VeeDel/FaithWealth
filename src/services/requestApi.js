import http from "./http-Pos";

class DataService {
  Login(data) {
    return http.post("/Login", data);
  }
}
export default new DataService();
