import { ColumnDef } from "@tanstack/react-table";
import { IdatePickerParams } from "../../form-components/datepicker";
import { ISelectparams } from "../../form-components/selectoption";


export type ExtendedFilterTypes = "DateFilter" | "SelectFilter"

export type DateFilterParams = {
    accessor: string
    filterType: "DateFilter",
    args: IdatePickerParams
}

export type SelectFilterParams = {
    accessor: string,
    filterType: "SelectFilter",
    args: ISelectparams
}

export type filterParamTypes = SelectFilterParams | DateFilterParams

export type FilterCompsPropsTuple = IdatePickerParams | ISelectparams

export type ExtendedFilterProps = {
    enable: boolean,
    filters: filterParamTypes[]
} 

export type IActionOptions = {
    asLink?: boolean,
    link: string,
}

export type sortableColumnsType<TData> = {
    column: keyof TData,
    options: { key: string, value: string }[]
    accessor: string
}


export interface DataTableProps<TData, TValue, K extends keyof TData> {
    dataSourceUrl?: string,
    hasAction?: boolean,
    filterablePlaceholder?: string,
    columns: ColumnDef<TData, TValue>[];
    data?: TData[];
    filterable?: K;
    sortableColumns?: sortableColumnsType<TData>[];
    actionName?: string,
    onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    actionOptions?: IActionOptions,
    enablePaginator?: boolean
    enableTableFilter?: boolean,
    heading?: string,
    extendedFilter?:ExtendedFilterProps
}


