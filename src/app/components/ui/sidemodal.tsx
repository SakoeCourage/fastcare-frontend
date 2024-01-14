"use client"
import IconifyIcon from './Iconsbutton';
import React from 'react'
import SimpleBar from 'simplebar-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"


const variants = {
    "sm": "modal-sm",
    "md": "modal-md",
    "lg": "modal-lg",
    "xl": "modal-xl",
    "2xl": "modal-2xl",
    "full": "moda-full",
};


interface Imodal {
    open: boolean;
    closeModal: () => void;
    size?: keyof typeof variants;
    children?: React.ReactNode | React.JSX.Element;
    title?: string;
    showDivider?: boolean;
}

const Sidemodal: React.FC<Imodal> = ({ open = false, size = "md", title, children, closeModal }) => {
    return (
        <Sheet  open={open}>
            <SheetContent className={`${variants[size]}`} suppressHydrationWarning >
                <nav className=' flex items-center justify-between  border-b h-[3.5rem]'>
                    <nav className='pl-3 text-sm my-auto'>
                        {title}
                    </nav>
                    <IconifyIcon onClick={() => closeModal()} className='text-gray-700 mr-3 my-auto cursor-pointer' icon='iconamoon:close-light' />
                </nav>
                <SimpleBar className=' h-[calc(100vh-3.5rem)] border-none focus:border-none outline-none focus:outline-none'>
                    {children}
                </SimpleBar>
            </SheetContent>
        </Sheet>

    )
}

export default Sidemodal