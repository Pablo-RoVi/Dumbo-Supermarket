import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${responseBody.token}`;
  return config;
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Auth = {
  login: (user) => requests.post("login", user).then(responseBody),
};

const agent = { requests, Auth };

export default agent;
