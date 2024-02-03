import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BlankImagePlaceholder } from './fileuploadprops/blankimageplaceholder';
import IconifyIcon from './iconsbutton';
import { toastnotify } from 'app/app/providers/Toastserviceprovider';
import {
    fileUploadProps, regularExtensions, regularExtensionsArray, Rule,
    errorMessages, validationErrors, isValidationError, isBlob, isFile
} from './fileuploadprops/fileupload';
import Filetyperenderer from './fileuploadprops/filetyperenderer';


/**
 * @author Sakoe Courage
 * @param  [maxFileSize] - in bytes default 10485760 i.e 10mb -  10240Kb
 * @returns 
 */
const Fileupload = ({ getFiles,
    files: propFiles,
    maxNumber,
    maxFileSize = 10485760,
    onError,
    acceptType,
    placeholder
}: fileUploadProps) => {

    const [dragOver, setIsDragOver] = useState<boolean>(false)
    const [lvErrors, setlvErrors] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[] | Blob[]>([])




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
            console.log(file.type)
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

    const removeFile = (index: number): void => {
        if (index >= 0 && index < files.length) {
            const updatedFiles = [...files.slice(0, index), ...files.slice(index + 1)];
            setFiles(updatedFiles)
            getFiles!(updatedFiles);
        }
    };

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
                    handleMaxNumberValidation(Ifiles);
                    Array.from(Ifiles).forEach(handleFileValidation);
                } catch (error) {
                    validationErrors.push(errorMessages.maxNumber);
                }
            }
        } else if (event.type === 'drop') {
            event.preventDefault()
            const dragEvent = event as React.DragEvent;
            const Ifiles = dragEvent.dataTransfer.files;
            if (Ifiles) {
                try {
                    handleMaxNumberValidation(Ifiles);
                    Array.from(Ifiles).forEach(handleFileValidation);
                } catch (error) {
                    validationErrors.push(errorMessages.maxNumber);
                }
            }
        }

        try {
            const transferFiles: File[] = [...dataTransfer.files];
            let newFiles: File[] | Blob[] = [...transferFiles]
            if (!!files.length) { newFiles = [...newFiles, ...files] }
            setFiles(newFiles);
            getFiles!(newFiles);
        } catch (error) {
            console.log(error)
        }

        if (validationErrors.length > 0) {
            setlvErrors(validationErrors)
            onError && onError(validationErrors)
            validationErrors.forEach(err => toastnotify(err, 'Error'))
        }

        inputRef.current!.value = "";
    };

    useEffect(() => {
        if (!propFiles) return
        try {
            let inCommingFiles: Blob[] | File[] = []
            propFiles.forEach(file => {
                if (isBlob(file) || isFile(file)) {
                    inCommingFiles.push(file)
                }
            })
            !!inCommingFiles.length && setFiles(inCommingFiles)
        } catch (error) {
            console.warn("File Upload: ", error)
        }

    }, [propFiles])

    return (
        <div className="w-full"
            onDragEnter={(e) => {
                setIsDragOver(true)
            }}
            onDragLeave={(e) => {
                setIsDragOver(false)
            }}
            onDragOver={(e) => {
                setIsDragOver(true)
            }}
            onDrop={(e) => {
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
                    placeholder={placeholder}
                    isDragging={dragOver}
                    onImageUpload={() => inputRef.current!.click()}
                />
            )}
            <div className=" grid grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {!!files.length && files.map((file, index) => (
                    <Filetyperenderer key={index} file={file} index={index} removeFile={removeFile} />
                ))}
                {Boolean(files.length) &&
                    !(Number(files.length) === maxNumber) && (
                        <BlankImagePlaceholder
                            placeholder={placeholder}
                            isDragging={dragOver}
                            onImageUpload={() => inputRef.current!.click()}
                        />
                    )}
            </div>
        </div>

    );
};

export default Fileupload