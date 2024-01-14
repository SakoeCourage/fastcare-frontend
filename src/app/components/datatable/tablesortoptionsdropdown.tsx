import React, { useEffect, useState } from 'react'
import IconifyIcon from '../ui/Iconsbutton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuCheckboxItem
} from "app/app/components/ui/dropdown";


type sortingOption = "asc" | "desc" | null

interface IDropdownParams {
    options: {key:String,value:sortingOption}[]
    value?: sortingOption
    getValue?: (v:sortingOption) => void
}
function Tablesortoptionsdropdown(params:IDropdownParams) {
   const [currentValue, setCurrentValue] = useState<sortingOption>(params?.value ?? null)

   const toggleCurrentSelection = (v:sortingOption) =>{
        if(currentValue == v) {
            setCurrentValue(null)
        }else{
            setCurrentValue(v)
        }
        params?.getValue && params.getValue((v))
   }

   
  return (
    <DropdownMenu >
    <DropdownMenuTrigger asChild>
        <button className=' focus:border-none focus:outline-none my-auto'>
        <IconifyIcon fontSize={15} icon='bx:sort'/>
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className=' bg-white' align="end">
        {params.options.map((option,i:number) => {
                return (
                    <DropdownMenuCheckboxItem
                        key={i}
                        className="capitalize"
                        checked={currentValue == option.value}
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