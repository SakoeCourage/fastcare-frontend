import React, { useEffect, useState } from 'react'
import IconifyIcon from '../ui/IconifyIcon';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuCheckboxItem
} from "app/app/components/ui/dropdown";


interface IDropdownParams {
    options: { key: string, value: string }[]
    value?: string | null
    getValue?: (v: string) => void
}
function Tablesortoptionsdropdown(params: IDropdownParams) {
    const [currentValue, setCurrentValue] = useState<string | null>(params?.value ?? null)

    const toggleCurrentSelection = (v: string) => {
        if (currentValue == v) {
            setCurrentValue(null)
        } else {
            setCurrentValue(v)
        }
        params?.getValue && params.getValue((v))
    }

    useEffect(() => {
        document.addEventListener('tableResetEvent', () => setCurrentValue(null));
        return () => {
            document.removeEventListener('tableResetEvent', () => setCurrentValue(null));
        };
    }, [])
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button className=' focus:border-none focus:outline-none my-auto'>
                    <IconifyIcon fontSize={15} icon='bx:sort'
                        className={` bg-gray-50 !py-0' ${currentValue !== null && '!bg-green-100 text-green-600'}`} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' bg-white' align="end">
                {params.options.map((option, i: number) => {
                    return (
                        <DropdownMenuCheckboxItem
                            key={i}
                            className="capitalize"
                            checked={params?.value == option.value}
                            onCheckedChange={(v) => toggleCurrentSelection(option?.value)}
                        >
                            {option.key}
                        </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Tablesortoptionsdropdown