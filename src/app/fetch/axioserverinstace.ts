"use server"
import { cookies } from 'next/headers'
import axios from 'axios';
import { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';

const apiToken = cookies().get("apiToken")?.value
axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const serverReq = axios.create({
    baseURL: `${baseURL}/api/v1`,
});

serverReq.interceptors.request.use(async (config) => {
    if (apiToken) {
        config.headers["Authorization"] = `Bearer ${apiToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

serverReq.interceptors.response.use(async (response) => {
    return response;

}, async (error: AxiosError) => {
    if (error.response?.status == 401) {
        await signOut({
            redirect: true
        })
    }
    return Promise.reject(error);
});

export default serverReq;