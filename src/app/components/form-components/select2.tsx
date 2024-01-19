'use client'
import React from 'react'
import { Select2, Select2Data } from "select2-react-component";
import * as common from 'select2-component';
import "select2-component/dist/select2.min.css";


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
}

function Select2options(props: ISelect2Params) {
    const { className, ...rest } = props;
    return (
        <nav className={`w-full ${className}`}>
            <Select2 {...rest}>
            </Select2>
        </nav>
    )
}

export default Select2options