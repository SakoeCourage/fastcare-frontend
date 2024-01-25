'use client'
import React, { useEffect } from 'react'
import { Select2, Select2Data } from "select2-react-component";
import * as common from 'select2-component';
import "select2-component/dist/select2.min.css";
import { Label } from './label';
import { UserDTO } from 'app/app/types/entitiesDTO';





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
    required?: boolean,
    onChange?: (v: any) => void,
    searchPlaceholder?: string,

}

function Select2options(props: ISelect2Params) {
    const { className, onChange, label, required, searchPlaceholder, ...rest } = props;
   
     useEffect(() => {
        if(searchPlaceholder){
            document.querySelector('.select2-search__field')?.setAttribute('placeholder', searchPlaceholder)
        }
     }, [])
     
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <Label className="flex items-center gap-1">{label}
                {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
            </Label>}
            <Select2
                update={value => props?.onChange && props?.onChange(value)}
                {...rest}>
            </Select2>
        </div>
    )
}

export default Select2options