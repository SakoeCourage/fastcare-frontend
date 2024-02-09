"use client"
import { SelectProps } from "@radix-ui/react-select"
import { Input } from "./input"
import classNames from "classnames"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/form-components/partial/selectcomponents"
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Label } from "./label"

export interface ISelectparams extends SelectProps {
    label?: string,
    enableSearch?: boolean,
    searchPlacholder?: string,
    required?: boolean,
    options: { key: string, value: any, disabled?: boolean }[],
    placeholder?: string,
    className?: string
    error?: string
}

function Selectoption(props: ISelectparams) {
    const { label, options, placeholder, className, error, enableSearch = false, onValueChange, searchPlacholder = "search", ...rest } = props
    const [searchKey, setSearchKey] = useState<string>("")
    const searchInput = useRef<HTMLInputElement | null>(null)

    const focusSearchInput = () => {
        try {
            if (searchInput.current) {
                searchInput.current.focus();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnSearchValueChange = (v: string) => {
        setSearchKey(v)
    }


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
                <Select onValueChange={(v) => { onValueChange(v); enableSearch && setSearchKey(null) }} {...rest} >
                    <SelectTrigger className={`w-full text-gray-600 bg-white ${error && 'border-red-400'}`}>
                        <SelectValue className="bg-white " placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent
                        style={{
                            minHeight: (enableSearch && !!options?.length ) && "15rem"
                        }}
                        className={
                            classNames(
                                {
                                    "bg-white z-[60]": true
                                }
                            )
                        }>
                        {enableSearch &&
                            <Input ref={searchInput} value={searchKey} onChange={(e) => handleOnSearchValueChange(e.target.value)} placeholder={searchPlacholder} className="w-full mb-1 focus:!ring-0" />
                        }
                        {options.map((option, i) => (
                            <SelectItem disabled={option.disabled ?? false} onFocus={() => enableSearch && focusSearchInput()}
                                className={
                                    classNames({
                                        "cursor-pointer hover:!bg-gray-100 ": true,
                                        "block": searchKey && option.key.toLowerCase().includes(searchKey.toLowerCase()),
                                        "hidden": searchKey && !option.key.toLowerCase().includes(searchKey.toLowerCase()),
                                    })
                                }
                                key={i} value={option.value}>
                                {option.key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>

        </div>
    )
}

export default Selectoption