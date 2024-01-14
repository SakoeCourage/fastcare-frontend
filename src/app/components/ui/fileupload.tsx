import React, { FormEvent, useEffect, useRef, useState } from 'react';
import useFileUpload from 'react-use-file-upload';
import { BlankImagePlaceholder } from './blankimageplaceholder';
import IconifyIcon from './Iconsbutton';
import { toaster } from 'app/app/providers/Toastserviceprovider';

type regularExtensions = "image/jpeg" | "image/jpg" | "image/png" | "application/pdf" | "application/msword" | "application/vnd.ms-excel" | "application/zip"

const regularExtensionsArray: regularExtensions[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.ms-excel",
    "application/zip"
];

const errorMessages = {
    maxFileSize: " One or more file exceeded recommended size",
    maxNumber: ` Maximum number of file exceeded`,
    acceptType: " One or more file format not supported",
};

type Rule = keyof typeof errorMessages;

type hasValidationError = {
    error: string[],
    file: null
}

type hasValidationPass = {
    error: null,
    file: File
}

type validationErrors = hasValidationPass | hasValidationError

const isValidationError = (error: validationErrors): error is hasValidationError => {
    return error.error !== null;
};


interface fileUploadProps {
    getFiles?: (files: File[]) => void;
    files?: File[] | undefined;
    maxNumber?: number;
    maxFileSize?: number;
    onError?: (error: string[]) => void;
    acceptType?: regularExtensions[]
}


/**
 * 
 * @param  [maxFileSize] - in bytes default 10485760 i.e 10mb -  10240Kb
 * @returns 
 */
const fileupload = ({ getFiles,
    files: propFiles,
    maxNumber,
    maxFileSize = 10485760,
    onError,
    acceptType
}: fileUploadProps) => {

    const [dragOver, setIsDragOver] = useState<boolean>(false)
    const [lvErrors, setlvErrors] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();


    function insertUnique<T>(arr: T[], values: T[]): T[] {
        const uniqueValues = values.filter((value) => !arr.includes(value));
        return [...arr, ...uniqueValues];
    }

    const getValidationRules = (): Rule[] | [] => {
        const rulesToApply: Rule[] = [];
        if (!!acceptType?.length) {
            rulesToApply.push('acceptType');
        }
        if (maxNumber) {
            rulesToApply.push('maxNumber');
        }
        if (maxFileSize) {
            rulesToApply.push('maxFileSize');
        }
        return rulesToApply;
    }

    const ruleValidator = (rules: Rule[], file: File): string[] => {
        const errors: string[] = []
        if (rules.includes('acceptType')) {
            if (!acceptType?.includes(file.type as regularExtensions)) {
                errors.push(errorMessages.acceptType)
            }
        }
        if (rules.includes('maxFileSize')) {
            if (file.size > maxFileSize) {
                errors.push(errorMessages.maxFileSize)
            }
        }
        return errors;
    }

    const handleMaxNumberValidation = (Ifiles: File[] | FileList) => {
        if (maxNumber) {
            if ((Ifiles.length + files.length) > maxNumber) {
                throw new Error(errorMessages.maxNumber)
            }
        }
    }

    const fileValidator = (file: File): validationErrors => {
        let validationErrors: string[] = []
        const validationRules = getValidationRules()
        const validatorError = ruleValidator(validationRules, file)

        if (!!validatorError.length) return { error: validatorError, file: null }
        
        return { error: null, file: file }
    }

    const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        setlvErrors([])
        onError && onError([])

        const dataTransfer: DataTransfer = new DataTransfer();
        let validationErrors: string[] = [];

        const handleFileValidation = (file: File) => {
            const validatorResponse = fileValidator(file);
            if (isValidationError(validatorResponse)) {
                const { error } = validatorResponse;
                validationErrors = insertUnique(validationErrors, error)
            } else {
                const { file: vFile } = validatorResponse;
                dataTransfer.items.add(vFile);
            }
        };

        if ('files' in event.target) {
            const Ifiles: FileList | null = inputRef.current?.files as FileList;
            if (Ifiles) {
                try {
                    handleMaxNumberValidation(Ifiles)
                    Array.from(Ifiles).forEach(handleFileValidation);
                } catch (error){
                    validationErrors.push(errorMessages.maxNumber)
                }
            }
        } else {
            const dragEvent = event as React.DragEvent;
            const Ifiles = dragEvent.dataTransfer.files;
            if (Ifiles) {
                try {
                    handleMaxNumberValidation(Ifiles)
                    Array.from(Ifiles).forEach(handleFileValidation);
                } catch (error) {
                    validationErrors.push(errorMessages.maxNumber)
                }
            }
        }
        
        setFiles({ dataTransfer }, 'a');
        getFiles && getFiles(files)

        if (validationErrors.length > 0) {
            setlvErrors(validationErrors)
            onError && onError(validationErrors)
            validationErrors.forEach(err => toaster(err, 'Error'))
        }

        inputRef.current!.value = "";
    };


    return (
        <div className=""
            onDragEnter={(e) => {
                setIsDragOver(true)
                handleDragDropEvent(e)
            }}
            onDragLeave={(e) => {
                setIsDragOver(false)
            }}
            onDragOver={(e) => {
                setIsDragOver(true)
                handleDragDropEvent(e)
            }}
            onDrop={(e) => {
                handleDragDropEvent(e);
                setIsDragOver(false)
                handleOnFileChange(e)
            }}
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                maxLength={maxNumber}
                style={{ display: 'none' }}
                onChange={(e) => {
                    handleOnFileChange(e)
                }}
            />
            {!files.length && (
                <BlankImagePlaceholder
                    isDragging={dragOver}
                    onImageUpload={() => inputRef.current!.click()}
                />
            )}
            <div className=" grid grid-cols-2 lg:grid-cols-3 gap-5">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className=" aspect-square w-full h-full border rounded-md object-cover relative"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {["image/jpeg", "image/jpg", "image/png"].includes(file.type) ?
                            <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                width=""
                                className=" w-full h-full object-contain aspect-square"
                            /> :
                            ["application/pdf"].includes(file.type) ?
                                <div className='truncate flex flex-col gap-2 items-center justify-center h-full w-full p-3'>
                                    <IconifyIcon className=' !h-16 !w-16' fontSize="3.5rem" icon='vscode-icons:file-type-pdf2' />
                                    <abbr title={file.name} className=' text-center text-decoration-none truncate text-gray-600 w-full'>{file.name}</abbr>
                                </div>
                                :
                                <div className='truncate flex flex-col gap-2 items-center justify-center h-full w-full p-3'>
                                    <IconifyIcon className=' !h-16 !w-16 text-gray-500' fontSize="3.5rem" icon='basil:file-outline' />
                                    <abbr title={file.name} className=' text-center text-decoration-none truncate text-gray-600 w-full'>{file.name}</abbr>
                                </div>

                        }

                        <div className="absolute top-1 right-1">
                            <button onClick={() => removeFile(file.name)}>
                                <svg
                                    className=" text-red-700"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="#ff0000"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.92 12.75H7.92C7.51 12.75 7.17 12.41 7.17 12C7.17 11.59 7.51 11.25 7.92 11.25H15.92C16.33 11.25 16.67 11.59 16.67 12C16.67 12.41 16.34 12.75 15.92 12.75Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                {Boolean(files.length) &&
                    !(Number(files.length) === maxNumber) && (
                        <BlankImagePlaceholder
                            isDragging={dragOver}
                            onImageUpload={() => inputRef.current!.click()}
                        />
                    )}
            </div>
        </div>

    );
};

export default fileupload