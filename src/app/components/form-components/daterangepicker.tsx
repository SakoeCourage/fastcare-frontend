"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { CalendarProps } from "./partial/calendarcomponents"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./partial/calendarcomponents"
import { Label } from "./label"
import { DateRange } from "react-day-picker"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./partial/popovercomponents"


type IdatePickerParams = {
    label?: string,
    required?: boolean,
    placeholder?: string,
    className?: string
} & CalendarProps


export default function daterangepicker({ label, required, placeholder, className, onSelect, selected, mode, ...rest }: IdatePickerParams) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <nav className={`flex flex-col gap-2  ${className}`}>
                        {label && <Label className="flex items-center gap-1">{label}
                            {required && <abbr className="text-red-500" title="This field is required ">*</abbr>}
                        </Label>}
                        <Button
                        type="button"
                        id="date"

                        variant="outline"
                        className={cn(
                            "w-[300px] !py-[0.54rem] whitespace-nowrap justify-start text-left font-normal bg-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <span className="whitespace-nowrap truncate">
                                    {format(date.from, "d/M/Y")} -{" "}
                                    {format(date.to, "d/M/Y")}
                                </span>
                            ) : (
                                format(date.from, "d/M/Y")
                            )
                        ) : (
                            <span >{placeholder ?? "Pick a date"}</span>
                        )}
                    </Button>
                    </nav>
                
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
