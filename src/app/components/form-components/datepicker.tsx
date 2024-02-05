"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { CalendarProps } from "./partial/calendarcomponents"
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


export default function Datepicker({ label, value, name, required, placeholder, error, onChange, className, onSelect, selected, mode, ...rest }: IdatePickerParams) {
  const [date, setDate] = React.useState<Date | undefined>()

  const handleOnDateChage = (v: Date) => {
    onChange && onChange(dateReformat(v as Date));
    setDate(v)
  }
  const handleOnMonthChange = (m: number) => {
    let newDate = date ? date.setMonth(m) : new Date().setMonth(m);
    handleOnDateChage(new Date(newDate))

  }
  const handleOnYearChange = (y: number) => {
    let newDate = date ? date.setFullYear(y) : new Date().setFullYear(y)
    handleOnDateChage(new Date(newDate))
  }

  function getYearsArray(endYear: string = "1900"): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = currentYear; year >= parseInt(endYear, 10); year--) {
      years.push(year);
    }

    return years;
  }


  function getMonthsArray(): { index: number; name: string }[] {
    const months: { index: number; name: string }[] = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName = new Date(2000, monthIndex, 1).toLocaleString('en-US', { month: 'short' });
      months.push({ index: monthIndex, name: monthName });
    }

    return months;
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
        {/* <div className="p-1 rounded-md boder-1 flex items-center w-full gap-1">
          <Selectoption className="w-full" placeholder="Year"
            onValueChange={(v) => handleOnYearChange(parseInt(v))}
            value={date && date.getFullYear().toString()}
            options={getYearsArray().map(year => ({ key: year.toString(), value: year.toString() }))}
          />
          <Selectoption className="w-full" placeholder="Month"
            onValueChange={(v) => handleOnMonthChange(parseInt(v))}
            value={date && date.getMonth().toString()}
            options={getMonthsArray().map(({ index, name }) => ({ key: name, value: index.toString() }))}
          />
        </div> */}
        <Calendar
          value={date}
          onChange={handleOnDateChage}
        />

      </PopoverContent>
    </Popover>
  )
}
