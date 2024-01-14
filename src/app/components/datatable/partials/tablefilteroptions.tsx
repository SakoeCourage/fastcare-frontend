"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown"
import { IActionOptions } from './tabletypedefs'
import Link from 'next/link'

interface IOptionsProps<TData extends import("@tanstack/table-core").Table<TData>> {
    filterable?: string
    table: TData,
    actionName?: string,
    actionOptions: IActionOptions
    onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

function TableFilterOptions<TData extends import("@tanstack/table-core").Table<TData>>(props: IOptionsProps<TData>): React.JSX.Element {
    const { filterable, table, actionName, actionOptions, onAction } = props

    return (
        <div className="flex items-center p-4">
            {filterable && <input type='text'
                placeholder={`Search ${filterable.toString().toLocaleLowerCase()}...`}
                value={table.getColumn(filterable as string)?.getFilterValue() as string}
                onChange={(event) =>
                    table.getColumn(filterable as string)?.setFilterValue(event.target.value)
                }
                className="max-w-sm border text-sm text-gray-700 border-gray-300 py-[0.6rem] px-3 outline-none focus:outline-none rounded-md"
            />}
            <div className=' flex items-center gap-2 ml-auto'>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button className=" border-gray-300 border rounded-md text-sm py-2 px-3 whitespace-nowrap !text-gray-600 flex-nowrap flex items-center gap-1 ml-auto">
                            <svg className='text-gray-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125" /></svg>
                            Columns
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=' bg-white' align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                {
                    !actionOptions.asLink ? <button onClick={(e) => onAction && onAction(e)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                        <span className=' whitespace-nowrap'>{actionName ?? "New"}</span>
                    </button> :
                        <Link href={actionOptions?.link} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                            <span className=' whitespace-nowrap'>{actionName ?? "New"}</span>
                        </Link>


                }
            </div>
        </div>
    )
}

export default TableFilterOptions