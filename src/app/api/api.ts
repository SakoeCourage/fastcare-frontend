'use strict';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const Api = axios.create({
  baseURL: `${baseURL}/api`,
});

Api.interceptors.request.use((config) => {
  // Here you can start your spinner
  console.log('Request made. Start spinner.');
  return config;
}, (error) => {
  console.log('Request error. Stop spinner.');
  return Promise.reject(error);
});

Api.interceptors.response.use((response) => {
  console.log('Response received. Stop spinner.');
  return response;
}, (error) => {
  console.log('Response error. Stop spinner.');
  return Promise.reject(error);
});

export default Api;
