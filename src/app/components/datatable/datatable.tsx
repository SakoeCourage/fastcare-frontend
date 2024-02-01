"use client"
import React, { useEffect, useState } from 'react'
import { DataTablePagination } from 'app/app/components/datatable/partials/tablepagination'
import { Button } from '../form-components/button'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, VisibilityState, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "app/app/components/datatable/partials/table"
import { ArrowUpDown } from "lucide-react"
import TableFilterOptions from './partials/tablefilteroptions'
import { DataTableProps, IActionOptions } from './partials/tabletypedefs'
import Tablesortoptionsdropdown from './tablesortoptionsdropdown'
import Extendedtablefilter from './partials/extendedtablefilter'
import { ExtendedFilterProps } from './partials/tabletypedefs'
import Api from 'app/app/fetch/axiosInstance'
import { updateUrlQueryParam, extractQueryParams, getQueryParamValue } from 'app/app/lib/utils'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'

export function resetTableData() {
    const customEvent = new Event('tableResetEvent');
    document.dispatchEvent(customEvent);
}


function DataTable<TData, TValue, K extends keyof TData>({
    columns,
    data,
    hasAction = true,
    filterable,
    sortableColumns = [],
    actionName,
    onAction,
    filterablePlaceholder,
    enableTableFilter = true,
    extendedFilter,
    enablePaginator = true,
    heading,
    dataSourceUrl,
    actionOptions = {
        asLink: false,
        link: ""
    },
}: DataTableProps<TData, TValue, K>) {

    const [rowSelection, setRowSelection] = React.useState({})
    const [tData, setTData] = useState<IPaginatedData<TData> | null>(null)
    const [fetchingData, setFetchingData] = useState(false);
    const [path, setPath] = useState<string | null>(null);

    const table = useReactTable({
        data: data ? data : tData!?.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
    })

    const fetchSourceData = async (url: string | null) => {
        if (!url) return;
        setFetchingData(true)
        try {
            const res = await Api.get<IPaginatedData<TData>>(url);
            if (res?.data) {
                setTData(res.data)
                console.log(res.data)
                setPath(url)
            }
        } catch (error) {
            toastnotify("Failed to fetch table data", "Error");
            console.log(error)
        } finally {
            setFetchingData(false)
        }
    }

    function getUrlParamValue(param: string) {
        if (path == null) return;
        return getQueryParamValue(path, param)
    }

    function handleUrlQuery(accessor: string, value: string | null) {
        if (path == null) return
        let newQueryUrl: string = updateUrlQueryParam(path, accessor, value)
        fetchSourceData(newQueryUrl)
    }


    function handleOnReset() {
        fetchSourceData(dataSourceUrl ?? null)
    }
    useEffect(() => {
        fetchSourceData(dataSourceUrl ?? null)
        document.addEventListener('tableResetEvent', handleOnReset);
        return () => {
            document.removeEventListener('tableResetEvent', handleOnReset);
        };
    }, []);




    return (
        <div className="rounded-md border h-max min-h-[32rem] bg-white  relative overflow-hidden ">

            {/* {fetchingData && <nav className="absolute top-[40%] z-20  rounded-md flex flex-col items-center gap-1 text-gray-600 justify-center bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 inset-x-[40%] w-max p-3  text-xs  pointer-events-none ">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" /></path></svg>
                Fetching New Data...
            </nav>} */}

            {typeof heading == "string" ? <nav className=' px-5  flex items-center !gap-0 text-gray-600 font-semibold py-2 border-b w-full '>
                <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2" /></svg>
                <nav className=''>{heading}</nav>
            </nav> : heading}

            {enableTableFilter && <TableFilterOptions hasAction={hasAction} filterablePlaceholder={filterablePlaceholder} handleUrlQuery={handleUrlQuery} actionOptions={actionOptions} filterable={filterable as string} actionName={actionName} table={table} onAction={onAction} />}
            {extendedFilter?.enable && <Extendedtablefilter handleUrlQuery={handleUrlQuery} path={path} filters={extendedFilter.filters} />}

            <Table className=' h-max' >
                <TableHeader className=' '>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className='  text-gray-600 font-medium whitespace-nowrap flex-nowrap' key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                        {sortableColumns.map((sc) => {
                                            if (sc.column.toString().replaceAll(/\_/g, "").toLowerCase().includes(header.column.columnDef.header?.toString().toLowerCase().replaceAll(/\s/g, ''))) {
                                                return (
                                                    <Tablesortoptionsdropdown
                                                        key={sc.accessor}
                                                        value={getUrlParamValue(sc.accessor)}
                                                        getValue={(value) => handleUrlQuery(sc?.accessor, value)}
                                                        options={sc.options}
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}

                </TableHeader>
                <TableBody >
                    {(data || tData) && table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                className=' text-gray-500/90 font-medium table-tr'
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"} >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className=' min-w-max' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className=''>
                            <TableCell colSpan={columns.length} className="h-[32rem] text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {tData &&
                !!table.getRowModel().rows?.length &&
                enablePaginator &&
                <DataTablePagination table={table} getDataAsync={fetchSourceData} tableData={tData} />}
        </div>
    )
}


export default DataTable