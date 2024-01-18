"use client"
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaymentsListType, PaymentRes, PaymentList } from '../paymentstypedef'

import DataTable from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'

export function Statusindicator({ status }: { status: "paid" | "pending" }): React.JSX.Element {
    return <nav>
        {status == "paid" ? <nav className=" bg-green-200 whitespace-nowrap text-green-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-green-600"></span> Paid</nav> :
            <nav className=" bg-red-200 whitespace-nowrap text-red-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-red-600"></span> Pending</nav>
        }
    </nav>
}
export const columns: ColumnDef<PaymentRes>[] = [
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => dateReformat(row.original.created_at)
    },
    {
        accessorKey: "mid",
        header: "MID"
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber"
    },
    {
        accessorKey: "mode",
        header: "Mode",
        cell: ({ row }) => row.original?.mode?.mode
    },
    {
        accessorKey: "amount",
        header: "amount"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Statusindicator status={row.original.status} />
    },

]

function Paymentstable() {
    return (
        <div>
            <DataTable
                dataSourceUrl='/paymentlist'
                sortableColumns={[{
                    column: 'created_at',
                    accessor: "sort",
                    options: [
                        { key: "Ascending", value: "created_asc" },
                        { key: "Descending", value: "created_desc" }
                    ]
                }]}
                columns={columns}
                filterable="subscriber"
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