import axios from "axios";

// Set the base URL for API requests
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Enable sending credentials with cross-origin requests
axios.defaults.withCredentials = true;

// Intercept requests to add Authorization header with token
axios.interceptors.request.use((config) => {
  // Add the Authorization header with the token from the responseBody
  config.headers.Authorization = `Bearer ${responseBody.token}`;
  return config;
});

/**
 * Intercept responses to check for errors
 * @param {*} response 
 * @returns 
 */
const responseBody = (response) => response.data;

/**
 * Requests object containing methods for making requests
 * @type {{get: (function(*): Promise<AxiosResponse<any>>), post: (function(*, *): Promise<AxiosResponse<any>>), put: (function(*, *): Promise<AxiosResponse<any>>), delete: (function(*): Promise<AxiosResponse<any>>)}}
 * @property {function(url)} get - GET request
 * @property {function(url, body)} post - POST request
 * @property {function(url, body)} put - PUT request
 * @property {function(url)} delete - DELETE request
 * @property {function(user)} login - Login request
 */
const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

/**
 * Auth object containing methods for making requests
 * @type {{login: (function(user): Promise<AxiosResponse<any>>)}}
 * @property {function(user)} login - Login request
 */
const Auth = {
  // Login request
  login: (user) => requests.post("login", user).then(responseBody),
};

/**
 * Agent object containing methods for making requests
 * @type {{requests: {get: (function(*): Promise<AxiosResponse<any>>), post: (function(*, *): Promise<AxiosResponse<any>>), put: (function(*, *): Promise<AxiosResponse<any>>), delete: (function(*): Promise<AxiosResponse<any>>)}}, Auth: {login: (function(user): Promise<AxiosResponse<any>>)}}}
 * @property {object} requests - Requests object
 * @property {object} Auth - Auth object
 */
const agent = { requests, Auth };

// Export the agent for use in the application
export default agent;
