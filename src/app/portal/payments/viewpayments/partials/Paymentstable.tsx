"use client"
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { paymentDataDTO } from 'app/app/types/entitiesDTO'

import DataTable from 'app/app/components/datatable/datatable'
import { dateReformat, formatcurrency } from 'app/app/lib/utils'

export function Statusindicator({ status }: { status: "paid" | "pending" }): React.JSX.Element {
    return <nav>
        {status == "paid" ? <nav className=" bg-green-200 whitespace-nowrap text-green-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-green-600"></span> Paid</nav> :
            <nav className=" bg-red-200 whitespace-nowrap text-red-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-red-600"></span> Pending</nav>
        }
    </nav>
}
export const columns: ColumnDef<paymentDataDTO>[] = [
    {
        accessorKey: "dateOfPayment",
        header: "Date of Payment",
        cell: ({ row }) => dateReformat(row.original.dateOfPayment)
    },
    {
        accessorKey: "mandateId",
        header: "Mandate ID"
    },
    {
        accessorKey: "subscriberName",
        header: "Subscriber Name"
    },
    {
        accessorKey: 'paymentMode',
        header: "Mode",
        cell: ({ row }) => row.original?.paymentMode
    },
    {
        accessorKey: "amount",
        header: "amount",
        cell: ({ row }) => formatcurrency(Number(row.original.amount))
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Statusindicator status={row.original.confirmed ? "paid" : "pending"} />
    },

]

function Paymentstable() {
    return (
        <div>
            <DataTable
                dataSourceUrl='/payments?sort=createdAt_desc'
                sortableColumns={[{
                    column: "dateOfPayment",
                    accessor: "sort",
                    options: [
                        { key: "Ascending", value: "createdAt_asc" },
                        { key: "Descending", value: "createdAt_desc" }
                    ]
                }]}
                columns={columns}
                filterable="mandateId"
                actionName='New Payment'
                extendedFilter={{
                    enable: true,
                    filters: [
                        {
                            filterType: "DateFilter",
                            accessor: "start_date",
                            args: {
                                placeholder: "Start Date",
                            }
                        },
                        {
                            filterType: "DateFilter",
                            accessor: "end_date",
                            args: {
                                placeholder: "End Date",
                            }
                        },
                        {
                            filterType: "SelectFilter",
                            accessor: "status",
                            args: {
                                placeholder: "Status",
                                options: [
                                    { key: "Paid", value: "paid" },
                                    { key: "Pending", value: "pending" },

                                ],

                            }
                        }
                    ]
                }}

            />
        </div>
    )
}

export default Paymentstable