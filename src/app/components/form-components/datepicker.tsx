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


type IdatePickerParams = {
  label?: string,
  required?: boolean,
  placeholder?: string,
  className?: string,
  name?: string,
} & CalendarProps


export default function datepicker({ label, name,required, placeholder, className, onSelect, selected, mode, ...rest }: IdatePickerParams) {
  const [date, setDate] = React.useState<Date>()

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
              "w-[280px] !justify-start h-10 !py-2 items-center text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-4" />
            {date ? <span className=" whitespace-nowrap truncate">{format(date, "d/M/Y")}</span> : <span className=" whitespace-nowrap truncate">{placeholder ?? "Pick a date"} </span>}
          </Button>
        </nav>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar className=" bg-white"
          mode={"single"}
          selected={date}
          onSelect={setDate}
          initialFocus
          {...rest}
        />
      </PopoverContent>
    </Popover>
  )
}
