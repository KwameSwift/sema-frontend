import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  timeout: 10000
});

export const axiosClientWithHeaders = (token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
    timeout: 10000,
    headers: { Authorization: "Bearer " + token }
  });
}