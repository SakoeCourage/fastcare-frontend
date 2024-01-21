import React from 'react'
import {
    Tooltip as TT,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./partials/tooltipcomponents"


interface ITooltip {
    toolTipText: string,
    children: React.ReactNode
}
function Tooltip(props: ITooltip) {
    const { toolTipText, children } = props
    return (
        <TooltipProvider>
            <TT>
                <TooltipTrigger>  {children}</TooltipTrigger>
                <TooltipContent>
                    {toolTipText}
                </TooltipContent>
            </TT>
        </TooltipProvider>
    )
}

export default Tooltip