import React, { useEffect } from 'react';
import { Dialog, DialogContent } from "./partials/dialoguecomponents";
import IconifyIcon from './IconifyIcon';
import { Button } from '../form-components/button';
import SimpleBar from 'simplebar-react';

type Variants = "Danger" | "Sucess" | "Warning" | "Info"

const sizes = {
    "sm": "modal-sm",
    "md": "modal-md",
    "lg": "modal-lg",
    "xl": "modal-xl",
    "2xl": "modal-2xl",
    "3xl": "modal-3xl",
    "full": "modal-full",
};

const variantHasIcon: { variant: Variants, icon: string, style: React.CSSProperties }[] = [
    {
        variant: "Info",
        icon: "ooui:help-notice-ltr",
        style: {
            color: "#0284c7"
        }
    },
    {
        variant: "Danger",
        icon: "solar:danger-circle-bold",
        style: {
            color: "#dc2626"
        }
    },
    {
        variant: "Sucess",
        icon: "ooui:success",
        style: {
            color: "#16a34a"
        }
    },
    {
        variant: "Warning",
        icon: "dashicons:warning",
        style: {
            color: "#ea580c"
        }
    },
]

export interface IDialogue {
    open: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
    size?: keyof typeof sizes;
    promptText?: string,
    title?: string;
    className?: string;
    variant?: Variants
    okText?: string;
    cancelText?: string
}

const DialogBox: React.FC<IDialogue | null> = (props) => {

    if (props == null) return <></>

    const { title = "", className, onCancel, onConfirm, variant = "Info", promptText, size = "lg", open, okText, cancelText } = props

    const getPropsFromVariant = () => variantHasIcon.find(v => v.variant == variant);
    return <>
        {
            props && <Dialog open={open}>
                <DialogContent className={`md:rounded-lg !box-border w-[90vw]  pt-14 py-10 h-auto  fixed left-[50%]  bg-white top-[50%] z-[80] isolate grid space-x-0 space-y-0 !gap-0  translate-x-[-50%] translate-y-[-50%]  shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${className} ${sizes[size]}`} suppressHydrationWarning>
                    <div className='relative h-full overflow-hidden w-auto'>
                        <nav className="flex  h-[3.5rem] items-center justify-center ">
                            <IconifyIcon style={getPropsFromVariant()?.style} className='h-[3.5rem] w-[3.5rem] bg-transparent' fontSize="3.5rem" icon={getPropsFromVariant()?.icon ?? "ooui:help-notice-ltr"} />
                        </nav>
                        <SimpleBar className='!max-h-[calc(100vh-7rem)] min-h-32 isolate w-auto md:h-auto md:!max-h-[calc(min(90vh,700px)-7.0rem)]  border-none active:border-none active:outline outline-none focus:border-none focus:outline-none'>
                            <div className="flex flex-col gap-1 p-4 w-full justify-center items-center ">
                                <nav className='font-medium text-xl'>{title}</nav>
                                {promptText && <nav className='text-sm'>{promptText}</nav>}
                            </div>
                        </SimpleBar>
                        <nav className='col-span-1 h-[3.5rem] p-3  lg:col-span-2 flex items-center justify-center gap-3'>
                            <Button id='dialog_cancel' onClick={() => onCancel && onCancel()} variant='outline' size='md'>
                                {cancelText ?? ""}
                            </Button>
                            <Button id='dialog_confirm' onClick={() => onConfirm && onConfirm()} variant='primary' size='md'>
                                {okText ?? ""}
                            </Button>
                        </nav>
                    </div>
                </DialogContent>
            </Dialog>
        }
    </>;
};

export default DialogBox;
