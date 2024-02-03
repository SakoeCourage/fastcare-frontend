"use client"
import React, { useRef, useEffect } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown"
import { IActionOptions } from './tabletypedefs'
import Link from 'next/link'
import { debounce } from 'app/app/lib/utils'
import IconifyIcon from '../../ui/IconifyIcon'

interface IOptionsProps<TData extends import("@tanstack/table-core").Table<TData>> {
    filterable?: string
    table: TData,
    hasAction?: boolean,
    actionName?: string,
    actionOptions: IActionOptions,
    filterablePlaceholder?: string,
    onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleUrlQuery: (accessor: string, value: string) => void
}

function TableFilterOptions<TData extends import("@tanstack/table-core").Table<TData>>(props: IOptionsProps<TData>): React.JSX.Element {
    const { filterable, table, hasAction, actionName, actionOptions, onAction, filterablePlaceholder, handleUrlQuery } = props
    const searchInput = useRef<HTMLInputElement | null>(null)


    const handleSearch = () => {
        if (searchInput.current == null) return
        let value = searchInput.current.value
        handleUrlQuery("search", value)
    }

    function handleOnReset() {
        if (searchInput.current == null) return
        searchInput.current.value = ""
    }

    useEffect(() => {
        document.addEventListener('tableResetEvent', handleOnReset);
        return () => {
            document.removeEventListener('tableResetEvent', handleOnReset);
        };
    }, [])

    return (
        <div className="flex items-center p-4">
            {filterable && <div className='border border-gray-300  pl-3 gap-3 flex items-center justify-center rounded-md'>
                <input ref={searchInput} type='text'
                    placeholder={`Search ${filterablePlaceholder ?? filterable.toString().toLocaleLowerCase()}...`}
                    value={table.getColumn(filterable as string)?.getFilterValue() as string}
                    onKeyUp={(e) => e.key == "Enter" && handleSearch()}
                    className="max-w-sm  text-sm text-gray-700   outline-none focus:outline-none"
                />
                <button onClick={handleSearch} className=' bg-blue-400/80 rounded-r-md py-1 px-2'><IconifyIcon className=' text-white bg-transparent' icon='ep:search' /></button>
            </div>}
            <div className=' flex items-center gap-2 ml-auto'>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button className=" border-gray-300 border rounded-md text-sm py-2 px-3 whitespace-nowrap !text-gray-600 flex-nowrap flex items-center gap-1 ml-auto">
                            <svg className='text-gray-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125" /></svg>
                            <span className='hidden lg:block'>
                                Columns
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=' bg-white z-[60]' align="end">
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
                {hasAction && <>
                    {
                        !actionOptions.asLink ? <button onClick={(e) => onAction && onAction(e)} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                            <span className=' whitespace-nowrap hidden lg:block'>{actionName ?? "New"}</span>
                        </button> :
                            <Link href={actionOptions?.link} className=" border-gray-300 border rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                                <span className=' whitespace-nowrap hidden lg:block'>{actionName ?? "New"}</span>
                            </Link>
                    }

                </>

                }
            </div>
        </div>
    )
}

export default TableFilterOptions