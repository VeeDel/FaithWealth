import http from "./http-Pos";

class DataService {
  Login(data) {
    return http.post("/Login", data);
  }
  mysenttransaction(data) {
    return http.get("/mysenttransaction", data);
  }
  myreceivedtransaction(data) {
    return http.get("/myreceivedtransaction", data);
  }
  checkPayidExist(id){
    return http.post("/checkPayId", id);
  }
}
export default new DataService();
