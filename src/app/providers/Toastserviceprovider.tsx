"use client"
import toast, { Toaster, ToastOptions } from 'react-hot-toast';
import React, { useEffect } from 'react'
import { errorOptions, successOptions, warningOption, infoOptions } from './partials/toastoptions';
interface Itoastparams {
    children: React.ReactNode
}
function Toastserviceprovider({ children }: Itoastparams) {
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

export const toaster = (message: string, status: status = "Error") => {
    return toast(message, statusOptions[status])
}


export default Toastserviceprovider