const axios = require("axios")
const moment = require("moment")
const crypto = require("crypto")

// Config
const baseURL = "http://gateway.marvel.com/v1/public";
const headers = { "Content-Type": "application/json" };
const marvelApiAxiosInstance = axios.create({ baseURL, headers });

// Request interceptor
marvelApiAxiosInstance.interceptors.request.use(
  (config) => {
    const ts = moment().unix();
    const hash = crypto
      .createHash("md5")
      .update(ts + process.env.pvkey + process.env.pbkey)
      .digest("hex");

    config.params = {
      ...config.params,
      ts: ts,
      apikey: process.env.pbkey,
      hash: hash,
    };

    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
marvelApiAxiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data);
    return response.data;
  },
  (error) => {
    console.log("Response error:", error);
    return Promise.reject(error);
  }
);

module.exports = marvelApiAxiosInstance;
