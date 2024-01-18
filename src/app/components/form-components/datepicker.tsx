"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { CalendarProps } from "./partial/calendarcomponents"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./partial/calendarcomponents"
import { Label } from "./label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./partial/popovercomponents"
import { space } from "postcss/lib/list"
import { version } from "os"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export type IdatePickerParams = {
  label?: string,
  required?: boolean,
  placeholder?: string,
  className?: string,
  onChange?: (v: string | undefined) => void
  name?: string,
  value?: string,
} & CalendarProps


export default function Datepicker({ label, value, name, required, placeholder, onChange, className, onSelect, selected, mode, ...rest }: IdatePickerParams) {
  const [date, setDate] = React.useState<Date | undefined>()

  React.useEffect(() => {
    if (value == "" || value == null) {
      setDate(undefined)
    } else {
      console.log(value)
      let dd = "23/04/2024"; 
      let parts: string[] = value.split("/");
      let date = new Date(`${parts[2]}, ${Number(parts[1]) - 1} , ${parts[0]}`);
      console.log(date)
      //TO-DO set Incomming Value

      // setDate(new Date(value));
    }

  }, [value])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <nav className={`flex flex-col gap-2 ${className}`}>
          {label && <Label className="flex items-center gap-1">{label}
            {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
          </Label>}
          <Button type="button"
            // onClick={(e) => e.preventDefault()}
            variant="outline"
            className={cn(
              "w-[280px] !justify-start h-10 !py-[0.54rem] items-center text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-4" />
            {date ? <span className=" whitespace-nowrap truncate">{format(date, "d/M/Y")}</span> : <span className=" whitespace-nowrap truncate">{placeholder ?? "Pick a date"} </span>}
          </Button>
        </nav>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[70]">
        <Calendar className=" bg-white "
          mode={"single"}
          selected={date}
          onSelect={(v) => { onChange && onChange(format(v as Date, "d/M/Y")); setDate(v) }}
          initialFocus
          {...rest}
        />
      </PopoverContent>
    </Popover>
  )
}
