import axios from 'axios';
import moment from 'moment';
import crypto from 'crypto';

// Config
const baseURL = 'http://gateway.marvel.com/v1/public';
const headers = { 'Content-Type': 'application/json' };
const marvelApiAxiosInstance = axios.create({ baseURL, headers });

// Request interceptor
marvelApiAxiosInstance.interceptors.request.use(
  (config) => {
    const ts = moment().unix();

    if (!process.env.pvkey || !process.env.pbkey) return config;

    const hash = crypto
      .createHash('md5')
      .update(ts + process.env.pvkey + process.env.pbkey)
      .digest('hex');

    config.params = {
      ...config.params,
      ts: ts,
      apikey: process.env.pbkey,
      hash: hash,
    };

    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
marvelApiAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('Response error:', error);
    return Promise.reject(error);
  }
);

export default marvelApiAxiosInstance;
