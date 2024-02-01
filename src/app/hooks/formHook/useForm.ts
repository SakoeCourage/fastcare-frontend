/**
 * @author Sakoe Courage
 * @description A mini form hook inspired by inertia's useform hook
 */

import { useEffect, useState } from 'react';
import Api from '../../fetch/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios';
import { RequestOptions, useForm, validationType } from './useFormtypes';
import { z, ZodError } from 'zod';
import { toastnotify } from 'app/app/providers/Toastserviceprovider';


const useForm = <T extends Record<string, any>>(
    initialValues: T
): useForm<T> => {

    let validationSchema: validationType<T> = null
    const [data, newData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<keyof T, string> | {}>({});
    const [processing, setProcessing] = useState<boolean>(false);

    function setData(key: keyof T, value?: any): void;

    function setData(values: Partial<T>): void;

    function setData(arg1: keyof T | Partial<T>, arg2?: any): void {
        if (typeof arg1 === 'object') {
            newData(arg1 as T)
        }
        else {
            newData((prevData) => ({ ...prevData, [arg1]: arg2 }));
        }
        setErrors({});
    }

    const createFormDataFromDataObject = (): FormData => {
        const formDataObj = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formDataObj.append(key, value);
        }
        return formDataObj;
    };
    const reset = () => {
        newData(initialValues);
    };

    const isIActionResponseError = (error: IActionResponseError): error is IActionResponseError => {
        return error.message !== null;
    }

    const handleRequest = async (
        url: string,
        requestFn: (url: string, data: any) => Promise<AxiosResponse<any>>,
        options?: RequestOptions<T>
    ) => {
        const { onError, onSuccess, config } = options || {};
        setProcessing(true);
        setErrors({});
        try {
            validationSchema && z.object(validationSchema).parse(data)
            const formData = config?.asFormData ? createFormDataFromDataObject() : data
            const res = await requestFn(url, formData);
            setErrors({});
            reset();
            onSuccess?.(res);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                setErrors(
                    error.errors.reduce((acc, err) => ({ ...acc, [err.path[0] as keyof T]: err.message }), {}),
                );
                toastnotify("Failed to process " + error?.errors[0].path[0].toString().toLocaleUpperCase())
            }
            if (error instanceof AxiosError) {
                onError?.(error);
                if (isIActionResponseError(error.response?.data)) {
                    let _err = error.response?.data.message
                    typeof _err == 'string' && toastnotify(_err)
                    Array.isArray(_err) && toastnotify(_err[0])
                }
            }
        } finally {
            setProcessing(false);

        }
    };

    const put = (url: string, options?: RequestOptions<T>) => handleRequest(url, Api.put, options);
    const post = (url: string, options?: RequestOptions<T>) => handleRequest(url, Api.post, options);
    const del = (url: string, options?: RequestOptions<T>) => handleRequest(url, Api.delete, options);
    const patch = (url: string, options?: RequestOptions<T>) => handleRequest(url, Api.patch, options);

    const setValidation = (newValidationSchema: validationType<T>) => {
        if (newValidationSchema) {
            validationSchema = newValidationSchema;
        }
    };
    return {
        data,
        errors,
        processing,
        setData,
        put,
        patch,
        post,
        delete: del,
        reset,
        setValidation
    };
};

export default useForm;
