import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.example.com/v1", // 👈 Base URL của bạn
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;