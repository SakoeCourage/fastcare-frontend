"use client"
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { errorOptions, successOptions, warningOption, infoOptions } from './partials/toastoptions';
interface Itoastparams {
    children: React.ReactNode
}
function Toastserviceprovider({ children }: Itoastparams) {
    const [isToastVisible, setIsToastVisible] = useState(false);

    const toggleToastVisibility = () => {
        setIsToastVisible(!isToastVisible);
    };
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 5000
                }}
            />
            {children}
        </>
    )
}
type status = "Error" | "Success" | "Info" | "Warning";

const statusOptions: Record<status, ToastOptions> = {
    Error: errorOptions,
    Success: successOptions,
    Info: infoOptions,
    Warning: warningOption,
}

export const toastnotify = (message: string, status: status = "Error") => {
    toast.dismiss();
    return toast(message, statusOptions[status])
}


export default Toastserviceprovider