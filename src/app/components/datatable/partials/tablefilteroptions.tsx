"use client"
import React, { useRef, useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown"
import { IActionOptions } from './tabletypedefs'
import Link from 'next/link'
import { debounce } from 'app/app/lib/utils'
import IconifyIcon from '../../ui/IconifyIcon'

interface IOptionsProps<TData extends import("@tanstack/table-core").Table<TData>> {
    filterable?: string
    table: TData,
    hasAction?: boolean,
    hasAnySearch: boolean,
    actionName?: string,
    actionOptions: IActionOptions,
    filterablePlaceholder?: string,
    onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleUrlQuery: (accessor: string, value: string) => void
}

function TableFilterOptions<TData extends import("@tanstack/table-core").Table<TData>>(props: IOptionsProps<TData>): React.JSX.Element {
    const { filterable, table, hasAction, actionName, hasAnySearch, actionOptions, onAction, filterablePlaceholder, handleUrlQuery } = props
    const searchInput = useRef<HTMLInputElement | null>(null)
    const [showResetButton, setShowResetButton] = useState(false)

    const handleSearch = () => {
        if (searchInput.current == null) return
        let value = searchInput.current.value
        if (value) {
            handleUrlQuery("search", value)
        }
    }

    function handleOnReset() {
        if (searchInput.current == null) return
        searchInput.current.value = ""
    }

    function handleOnSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value == "" && hasAnySearch) {
            handleUrlQuery("search", "")
        }
    }

    useEffect(() => {
        document.addEventListener('tableResetEvent', handleOnReset);
        return () => {
            document.removeEventListener('tableResetEvent', handleOnReset);
        };
    }, [])

    return (
        <div className="flex flex-col gap-2 lg:flex-row justify-between items-center p-4">
            {filterable && <div className='flex items-center gap-1 lg:w-auto w-full '>
                <div className='border border-gray-300  lg:w-auto w-full  pl-3 gap-3 flex items-center justify-center rounded-md'>
                    <input ref={searchInput}
                        type='search'
                        onChange={(e) => handleOnSearchChange(e)}
                        placeholder={` ${filterablePlaceholder ? filterablePlaceholder : "Search" + filterable.toString().toLocaleLowerCase()}...`}
                        value={table.getColumn(filterable as string)?.getFilterValue() as string}
                        onKeyUp={(e) => e.key == "Enter" && handleSearch()}
                        className="lg:min-w-[12rem] w-full  text-sm text-gray-700   outline-none focus:outline-none"
                    />
                    <button onClick={handleSearch} className=' bg-blue-400/80 rounded-r-md py-1 px-2'><IconifyIcon className=' text-white bg-transparent' icon='ep:search' /></button>
                </div>
            </div>
            }
            <div className=' flex items-center  gap-2 w-full lg:w-auto lg:ml-auto'>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button className=" w-full lg:w-auto border-gray-300 border rounded-md text-sm py-2 px-3 whitespace-nowrap !text-gray-600 flex-nowrap flex items-center gap-1 ml-auto">
                            <svg className='text-gray-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125" /></svg>
                            <span className='text-center'>
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
                        !actionOptions.asLink ? <button onClick={(e) => onAction && onAction(e)} className=" border-gray-300 border w-full lg:w-auto rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                            <span className=' whitespace-nowrap text-center'>{actionName ?? "New"}</span>
                        </button> :
                            <Link href={actionOptions?.link} className=" border-gray-300 border w-full lg:w-auto rounded-md text-sm py-2 px-3  flex items-center flex-nowrap gap-1 bg-blue-400/80 text-white ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                                <span className=' whitespace-nowrap text-center'>{actionName ?? "New"}</span>
                            </Link>
                    }

                </>

                }
            </div>
        </div>
    )
}

export default TableFilterOptions