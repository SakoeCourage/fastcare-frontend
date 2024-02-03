import { AxiosResponse } from 'axios';
import { ZodType, ZodAny } from 'zod';

export type validationType<T> = Partial<Record<keyof T, ZodType<any, any, any>>> | null;
export type callbackParams<T> = {
    options?: RequestOptions<T>;
};

export type RequestOptions<T> = {
    onSuccess?: (res: AxiosResponse<T>) => void;
    onError?: (err: any) => void;
    config?: {
        asFormData?: boolean,
        validation?: {
            enable: boolean
        }
    }
};

export type RequestParams = {
    asFormData?: boolean
}

export type data<T> = Record<keyof T, any>;
export type errors<T> = Record<keyof T, string>;

export type setData<T> = {
    (key: keyof T, value?: any): void;
    (values: Partial<T>): void;
}

export type useForm<T extends Record<string, any>> = {
    data: data<T>;
    errors: errors<T> | null;
    processing: boolean;
    setData: setData<T>;
    put: (url: string, options?: RequestOptions<T>) => void;
    patch: (url: string, options?: RequestOptions<T>) => void;
    post: (url: string, options?: RequestOptions<T>) => void;
    delete: (url: string, options?: RequestOptions<T>) => void;
    reset: () => void;
    setValidation: (newValidationSchema: validationType<T>) => void;
};


