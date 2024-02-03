export type regularExtensions = "image/jpeg" | "image/jpg" | "image/png" | "application/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/zip" | "text/csv"

export const regularExtensionsArray: regularExtensions[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/zip"
];

export const errorMessages = {
    maxFileSize: " One or more file exceeded recommended size",
    maxNumber: ` Maximum number of file exceeded`,
    acceptType: " One or more file format not supported",
};

export type Rule = keyof typeof errorMessages;

export type hasValidationError = {
    error: string[],
    file: null
}

export type hasValidationPass = {
    error: null,
    file: File
}

export type validationErrors = hasValidationPass | hasValidationError

export const isValidationError = (error: validationErrors): error is hasValidationError => {
    return error.error !== null;
};

export const isFile = (value: unknown): value is File => {
    return value instanceof File && ('name' in value);
};

export const isBlob = (value: unknown): value is Blob => {
    return value instanceof Blob && !('name' in value);
};

export interface fileUploadProps {
    getFiles?: (files: File[] | Blob[]) => void;
    files?: File[] | Blob[] | undefined;
    maxNumber?: number;
    maxFileSize?: number;
    placeholder?: string,
    onError?: (error: string[]) => void;
    acceptType?: regularExtensions[]
}
