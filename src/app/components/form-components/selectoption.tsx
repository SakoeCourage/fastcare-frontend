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

interface ISelectparams extends SelectProps {
    label?: string,
    required?: boolean,
    options: { key: string, value: string }[],
    placeholder?: string,
    className?: string
}

function selectoption(props: ISelectparams) {
    const { label, options, placeholder, className, ...rest } = props
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <Label className="flex items-center gap-1">{label}
                {props.required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
            </Label>}
            <Select {...rest}>
                <SelectTrigger className="w-full text-gray-600 bg-white ">
                    <SelectValue className="bg-white " placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {options.map((option, i) => {
                        return <SelectItem className="cursor-pointer hover:!bg-gray-100" key={i} value={option.value}>{option.key}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default selectoption