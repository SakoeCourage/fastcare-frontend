'use client'
import React, { useEffect } from 'react'
import { Select2, Select2Data } from "select2-react-component";
import * as common from 'select2-component';
import "select2-component/dist/select2.min.css";
import { Label } from './label';

interface Iselect2classobj {
    data: common.Select2Data;
    value?: common.Select2UpdateValue;
    disabled?: boolean;
    minCountForSearch?: number;
    placeholder?: string;
    customSearchEnabled?: boolean;
    multiple?: boolean;
    update?: (value: common.Select2UpdateValue) => void;
    open?: () => void;
    search?: (text: string) => void;
    keydown?: (e: React.KeyboardEvent) => void;
    keyup?: (e: React.KeyboardEvent) => void;
    keypress?: (e: React.KeyboardEvent) => void;
    minimumInputLength?: number;
    maximumInputLength?: number;
    keepSearchText?: boolean;
}

interface ISelect2Params extends Iselect2classobj {
    className?: string,
    label?: string,
    error?: string | null,
    required?: boolean,
    onChange?: (v: any) => void,
    searchPlaceholder?: string,
}

function Select2options(props: ISelect2Params) {
    const { className, onChange, label, required, searchPlaceholder, error, ...rest } = props;

    useEffect(() => {
        if (searchPlaceholder) {
            document.querySelector('.select2-search__field')?.setAttribute('placeholder', searchPlaceholder)
        }
    }, [])

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <Label className="flex items-center gap-1">{label}
                {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
            </Label>}
            <div className="relative ">
                {error && <nav className="w-max z-10 v-error-container absolute top-0 bottom-0 right-0 text-red-500 flex gap-1 items-center px-2">
                    <nav className="hidden backdrop-blur-sm text-sm v-error-message">
                        {error}
                    </nav>
                    <svg className="cursor-pointer ml-auto v-error-svg text-red-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" /></svg>
                </nav>}
                <Select2
                    update={value => props?.onChange && props?.onChange(value)}
                    {...rest}>
                </Select2>
            </div>

        </div>
    )
}

export default Select2options