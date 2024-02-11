'use strict';
import axios from 'axios';
import { RequestEvents } from './apiEvent';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { AxiosError } from 'axios';


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const Api = axios.create({
  baseURL: `${baseURL}/api/v1`,
});


Api.interceptors.request.use(async (config) => {
  RequestEvents.onRequestMadeEvent()
  const currentsession = await getSession()
  const sessionUser = currentsession?.user
  if (sessionUser) {
    config.headers["Authorization"] = `Bearer ${sessionUser.accessToken}`;
  }

  return config;
}, (error) => {
  RequestEvents.onRequestErrorEvent()
  return Promise.reject(error);
});

Api.interceptors.response.use(async (response) => {
  RequestEvents.onRequestCompleteEvent();
  return response;

}, async (error: AxiosError) => {
  window.localStorage.setItem(RequestEvents.REQUEST_CALLBACK_URL_CONSTACT, window.location.href)
  if (error.response?.status == 401) {
    await signOut({
      redirect: false
    })
    window.location.assign(encodeURIComponent(`/login`));
  }
  RequestEvents.onRequestCompleteEvent();
  return Promise.reject(error);
});

export default Api;
