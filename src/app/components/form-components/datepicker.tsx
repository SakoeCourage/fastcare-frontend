"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Label } from "./label"
import Selectoption from "./selectoption"
import { dateReformat } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./partial/popovercomponents"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import { CalendarProps, CalendarRef } from "@natscale/react-calendar/dist/utils/types"

export type IdatePickerParams = {
  label?: string,
  required?: boolean,
  placeholder?: string,
  className?: string,
  onChange?: (v: string | undefined) => void
  name?: string,
  value?: string,
  error?: string
} & CalendarProps


export default function Datepicker({ label, value, name, required, placeholder, error, onChange, className, ...rest }: IdatePickerParams) {
  const [date, setDate] = React.useState<Date | undefined>()

  const handleOnDateChage = (v: Date) => {
    onChange && onChange(dateReformat(v as Date));
    setDate(v)
  }
  
  React.useEffect(() => {
    if (value == "" || value == null) {
      setDate(undefined)
    } else {
      setDate(new Date(value))
    }
  }, [value])

  React.useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <nav className={`flex flex-col gap-2 ${className}`}>
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
            <Button type="button"
              // onClick={(e) => e.preventDefault()}
              variant="outline"
              size="full"
              className={cn(
                "!justify-start h-10 !py-[0.54rem] items-center text-left font-normal",
                !date && "text-muted-foreground",
                error && "!border-red-400"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-4" />
              {date ? <span className=" whitespace-nowrap truncate">{dateReformat(date)}</span> : <span className=" whitespace-nowrap truncate">{placeholder ?? "Pick a date"} </span>}
            </Button>
          </div>

        </nav>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[70]">
        <Calendar
          value={date}
          onChange={handleOnDateChage}
          
          {...rest}
          
        />

      </PopoverContent>
    </Popover>
  )
}
