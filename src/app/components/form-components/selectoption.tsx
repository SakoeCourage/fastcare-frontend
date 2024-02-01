"use client"
import { SelectProps } from "@radix-ui/react-select"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/form-components/partial/selectcomponents"
import React from 'react'
import { Label } from "./label"

export interface ISelectparams extends SelectProps {
    label?: string,
    required?: boolean,
    options: { key: string, value: any }[],
    placeholder?: string,
    className?: string
    error?: string
}

function Selectoption(props: ISelectparams) {
    const { label, options, placeholder, className, error, ...rest } = props
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <Label className="flex items-center gap-1">{label}
                {props.required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
            </Label>}
            <div className="relative ">
                {error && <nav className="w-max v-error-container absolute top-0 bottom-0 right-0 text-red-500 flex gap-1 items-center px-2">
                    <nav className="hidden backdrop-blur-sm text-sm v-error-message">
                        {error}
                    </nav>
                    <svg className="cursor-pointer ml-auto v-error-svg text-red-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" /></svg>

                </nav>}
                <Select {...rest} >
                    <SelectTrigger className={`w-full text-gray-600 bg-white ${error && 'border-red-400'}`}>
                        <SelectValue className="bg-white " placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[70]">
                        {options.map((option, i) => {
                            return <SelectItem className="cursor-pointer hover:!bg-gray-100" key={i} value={option.value}>{option.key}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

            </div>

        </div>
    )
}

export default Selectoption