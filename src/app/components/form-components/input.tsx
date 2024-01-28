import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

interface Inputparams extends InputProps {
    label?: string,
    required?: boolean,
    error?: string | null,
    placeholder?: string,
    className?: string
}

const Input = React.forwardRef<HTMLInputElement, Inputparams>(
    ({ label, required, className, placeholder, type, error, ...props }, ref) => {

        return (
            <div className={`flex flex-col gap-2  ${className}`}>
                {label && <Label className="flex items-center gap-1">{label}
                    {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
                </Label>}
                <div className="relative ">
                    {error && <nav className="w-max v-error-container absolute top-0 bottom-0 right-0 text-red-500 flex gap-1 items-center px-2">
                        <nav className="hidden backdrop-blur-sm text-sm v-error-message">
                            {error}
                        </nav>
                        <svg className="cursor-pointer ml-auto v-error-svg text-red-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" /></svg>
                    </nav>}
                    <input
                        type={type}
                        placeholder={placeholder}
                        className={cn(
                            "text-gray-600 placeholder:text-gray-400 flex h-10 w-full rounded-md border border-gray-400  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed ",
                            className,
                            error && "border-red-400"
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>

            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
