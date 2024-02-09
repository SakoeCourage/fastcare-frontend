import PhoneInput from 'react-phone-input-2'
import { PhoneInputProps } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

interface Inputparams extends PhoneInputProps {
    label?: string,
    required?: boolean,
    error?: string | null,
    placeholder?: string,
    className?: string
}

const ContactInput = React.forwardRef<HTMLInputElement, Inputparams>(
    ({ label, required, className, placeholder, error, value, onChange, country, ...props }, ref) => {
        const [currentValue, setCurrentValue] = React.useState("")

        type onChangeParam = Parameters<typeof onChange>;

        const handleOnValueChange = (...args: onChangeParam) => {
            const [_value, data, event, formattedValue] = args
            onChange && onChange(...args);
            setCurrentValue(_value)
        }

        React.useEffect(() => {
            if (value == "" || value == null) {
                 setCurrentValue("")
            } else {
                setCurrentValue(value)
            }
        }, [value])

        return (
            <div className={`flex flex-col gap-2  ${className} `}>
                {label && <Label className="flex items-center gap-1 ">{label}
                    {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
                </Label>}
                <div className={`relative !z-[30] ${error && 'phone-input-error'}`}>
                    {error && <nav className="w-max z-30 v-error-container absolute top-0 bottom-0 right-0 text-red-500 flex gap-1 items-center px-2">
                        <nav className="hidden backdrop-blur-sm text-sm v-error-message">
                            {error}
                        </nav>
                        <svg className="cursor-pointer ml-auto v-error-svg text-red-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" /></svg>
                    </nav>}
                    <PhoneInput
                        disableDropdown={true}
                        countryCodeEditable={false}
                        placeholder={placeholder}
                        value={currentValue}
                        country={country ?? "gh"}
                        onChange={(...args) => handleOnValueChange(...args)}
                        {...props}
                    />
                </div>

            </div>
        )
    }
)

ContactInput.displayName = "ContactInput"

export default ContactInput 
