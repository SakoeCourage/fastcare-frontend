import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "app/app/components/ui/dropdown";
import IconifyIcon from "../ui/iconsbutton";
import { useState } from "react";
import classNames from "classnames";
const optionThemes = {
    "primary": "#004b95",
    "danger": "#ef4444",
    "warning": "#f97316",
    "secondary": "#3b82f6",
    "success": "#22c55e",
    "neutral": "#4b5563",
}

interface ITableOptionsProps {
    optionName: string,
    icon: string,
    theme?: keyof typeof optionThemes
    onOptionSelected: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

/**
 * 
 * For Table use only 
 * 
 */
const Moretableoptions = ({ options }: { options: ITableOptionsProps[] }) => {
    const [isOpened, setisOpened] = useState<boolean>(false)
    return (
        <DropdownMenu onOpenChange={setisOpened} >
            <DropdownMenuTrigger>
                <IconifyIcon
                    fontSize="1.2rem"
                    className={
                        classNames({
                            "text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:text-green-500 focus:text-green-500 ": true,
                            "!bg-gray-300 text-white scale-105 ": isOpened
                        })
                    }
                    icon="radix-icons:dots-vertical"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col bg-white z-[70]">
                {options?.map((option, i) => {
                    return <DropdownMenuItem onClick={(e) => { e.preventDefault(); option.onOptionSelected(e) }} key={i} className={`cursor-pointer flex items-center gap-1 py-1 hover:bg-gray-50/50 ${(i == 0 || i < (options.length - 1)) && 'border-b'}`}>
                        <IconifyIcon
                            fontSize="1rem"
                            className="bg-transparent"
                            style={{ color: option.theme ? optionThemes[option?.theme] : optionThemes.neutral }}
                            icon={option.icon}

                        />
                        <span className=" font-medium" style={{ color: option.theme ? optionThemes[option?.theme] : optionThemes.neutral }} >{option.optionName}</span>
                    </DropdownMenuItem>
                })}
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default Moretableoptions