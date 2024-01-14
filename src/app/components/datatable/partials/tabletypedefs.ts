import { ColumnDef } from "@tanstack/react-table";
export type IActionOptions =  {
    asLink?: boolean,
    link: string ,
}

export interface DataTableProps<TData, TValue, K extends keyof TData> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterable?: K;
    sortableColumns?: (keyof TData)[];
    actionName?: string,
    onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    actionOptions?: IActionOptions,
    enablePaginator?: boolean
    enableTableFilter?: boolean,
    heading?: string
}