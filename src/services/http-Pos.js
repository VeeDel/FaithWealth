import axios from "axios";
// import { isDev } from "../Constant/URL.js";

// const isDev = true;
export const BASEURL = {
  ENDPOINT_URL: "http://103.148.165.246:9000/auth/api",
};

export const authToken = localStorage.getItem("token");

export default axios.create({
  baseURL: `${BASEURL.ENDPOINT_URL}`,
  headers: {
    authtoken: `${authToken}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
