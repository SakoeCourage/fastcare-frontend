import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

interface Inputparams extends InputProps {
    label?: string,
    required?: boolean,
    placeholder?: string,
    className?: string
}

const Input = React.forwardRef<HTMLInputElement, Inputparams>(
    ({ label, required, className, placeholder, type, ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-2 ${className}`}>
            {label && <Label className="flex items-center gap-1">{label}
                {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
            </Label>}
            <input
                type={type}
                placeholder={placeholder}
                className={cn(
                    "text-gray-600 placeholder:text-gray-400 flex h-10 w-full rounded-md border border-gray-400  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
