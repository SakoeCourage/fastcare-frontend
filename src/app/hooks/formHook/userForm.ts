/**
 * @author Sakoe Courage
 * @description A mini form hook inspired by inertia's useform hook
 */

import { useEffect, useState } from 'react';
import Api from '../../fetch/axiosInstance';
import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { RequestOptions, useForm, callbackParams } from './userFormtypes';

const useForm = <T extends Record<string, any>>(initialValues: T): useForm<T> => {
    const [data, newData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<keyof T, string> | {}>({});
    const [processing, setProcessing] = useState<boolean>(false);

    const setData = (key: keyof T, value?: any) => {
        newData((prevData) => ({ ...prevData, [key]: value }));
    };

    const reset = () => {
        newData(initialValues);
    };

    const handleRequest = async (
        requestFn: (url: string, data: T) => Promise<AxiosResponse<any>>,
        { url, options }: callbackParams<T>
    ) => {
        const { onError, onSuccess } = options || {};
        setProcessing(true);
        setErrors({});
        try {
            const res = await requestFn(url, data);
            reset();
            setErrors({});
            onSuccess?.(res);
        } catch (err) {
            console.log(err);
            onError?.(err);

        } finally {
            setProcessing(false);
        }
    };

    const put = (params: callbackParams<T>) => handleRequest(Api.put, params);
    const post = (params: callbackParams<T>) => handleRequest(Api.post, params);
    const del = (params: callbackParams<T>) => handleRequest(Api.delete, params);
    const patch = (params: callbackParams<T>) => handleRequest(Api.patch, params);

    return {
        data,
        errors,
        processing,
        setData,
        put,
        patch,
        post,
        delete: del,
        reset
    };
};

export default useForm;
