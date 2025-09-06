import axios from "axios";
import { account } from "./appwrite";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

axiosClient.interceptors.request.use(async (config) => {
  try {
    const response = await account.createJWT();

    if (response.jwt) {
      config.headers.Authorization = `Bearer ${response.jwt}`;
    }
  } catch (error) {
    console.error("No active session to create JWT from.");
  }

  return config;
});

export default axiosClient;
