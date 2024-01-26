import {AxiosResponse } from 'axios';

export type callbackParams<T> = {
    url: string;
    options?: RequestOptions<T>;
};

export type RequestOptions<T> = {
    onSuccess?: (res: AxiosResponse<T>) => void;
    onError?: (err: any) => void;
};

export type useForm<T extends Record<string, any>> = {
    data: Record<keyof T, any>;
    errors: Record<keyof T, string> | {};
    processing: boolean;
    setData: (key: keyof T, value?: any) => void;
    put: (arg: callbackParams<T>) => void;
    patch: (arg: callbackParams<T>) => void;
    post: (arg: callbackParams<T>) => void;
    delete: (arg: callbackParams<T>) => void;
    reset: () => void;
};


