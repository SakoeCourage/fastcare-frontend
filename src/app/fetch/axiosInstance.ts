'use strict';
import axios from 'axios';
import { RequestEvents } from './apiEvent';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const Api = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

Api.interceptors.request.use((config) => {
  RequestEvents.onRequestMadeEvent()
  return config;
}, (error) => {
  RequestEvents.onRequestErrorEvent()
  return Promise.reject(error);
});

Api.interceptors.response.use((response) => {
  RequestEvents.onRequestCompleteEvent();
  return response;
}, (error) => {
  RequestEvents.onRequestCompleteEvent();
  return Promise.reject(error);
});

export default Api;
