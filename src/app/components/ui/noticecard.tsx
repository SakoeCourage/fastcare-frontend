"use client"
import IconifyIcon from 'app/app/components/ui/IconifyIcon';
import React from 'react'

const options = {
    "info": {
        iconBgColor: "#38bdf8",
        icon: "akar-icons:info-fill",
        textBgColor: "#f0f9ff",
        textColor: "#0c4a6e"
    },
    "danger": {
        iconBgColor: "#f87171",
        icon: "solar:danger-circle-bold",
        textBgColor: "#fef2f2",
        textColor: "#7f1d1d"
    },
    "warning": {
        iconBgColor: "#fb923c",
        icon: "ion:warning",
        textBgColor: "#fff7ed",
        textColor: "#7c2d12"
    },
    "success": {
        iconBgColor: "#4ade80",
        icon: "ep:success-filled",
        textBgColor: "#f0fdf4",
        textColor: "#14532d"
    },
}

interface NoticeCardProps {
    variant?: keyof typeof options;
    children: React.ReactNode;
    className?: string
}
const Noticecard: React.FC<NoticeCardProps> = ({ variant = "info", children, className }) => {
    return (
        <div className={`flex flex-col md:flex-row bg-white border overflow-hidden rounded-md ${className}`}>
            <div style={{ backgroundColor: options[variant].textBgColor }} className=" basis-30 p-4 flex items-center justify-center bg-blue-300">
                <IconifyIcon className='   bg-transparent' style={{ color: options[variant].iconBgColor }} icon={options[variant].icon} />
            </div>
            <div
                style={{ backgroundColor: options[variant].textBgColor, color: options[variant].textColor }}
                className=" flex-grow flex items-center p-2 text-sm ">
                {children}
            </div>
        </div>
    );
};

export default Noticecard;