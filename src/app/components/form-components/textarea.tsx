"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
export interface InputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

interface Inputparams extends InputProps {
    label?: string,
    required?: boolean,
    placeholder?: string,
    className?: string
}
const Textarea = React.forwardRef<HTMLTextAreaElement, Inputparams>(
    ({ label, required, className, placeholder, ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-2 ${className}`}>
                {label && <Label className="flex items-center gap-1">{label}
                    {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
                </Label>}
                <textarea
                    placeholder={placeholder}
                    className={cn(
                        "text-gray-600 min-h-[80px] placeholder:text-gray-400  w-full rounded-md border border-gray-400  px-3 py-2 text-sm ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>

        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
