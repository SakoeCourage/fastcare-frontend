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
        asFormData: boolean
    }
};

export type RequestParams = {
    asFormData?: boolean
}

export type useForm<T extends Record<string, any>> = {
    data: Record<keyof T, any>;
    errors: Record<keyof T, string> | null;
    processing: boolean;
    setData: {
        (key: keyof T, value?: any): void;
        (values: Partial<T>): void;
    };
    put: (url: string, options?: RequestOptions<T>) => void;
    patch: (url: string, options?: RequestOptions<T>) => void;
    post: (url: string, options?: RequestOptions<T>) => void;
    delete: (url: string, options?: RequestOptions<T>) => void;
    reset: () => void;
    setValidation: (newValidationSchema: validationType<T>) => void;
};


