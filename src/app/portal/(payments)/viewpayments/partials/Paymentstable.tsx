"use client"
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaymentsListType, PaymentList } from '../paymentstypedef'
import { Statusindicator } from 'app/app/portal/dashboard/partials/Recentpayments'
import DataTable from 'app/app/components/datatable/datatable'
export const columns: ColumnDef<PaymentsListType>[] = [

    {
        accessorKey: "date",
        header: "Date"
    },
    {
        accessorKey: "MID",
        header: "MID"
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber"
    },
    {
        accessorKey: "mode",
        header: "Mode"
    },
    {
        accessorKey: "amount",
        header: "amount"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row})=> <Statusindicator status={row.original.status}/>
    },

]

function Paymentstable() {
    return (
        <div>
            <DataTable
                sortableColumns={["mode"]}
                columns={columns}
                data={PaymentList}
                filterable="subscriber"
                actionName='New Payment'
            
            />
        </div>
    )
}

export default Paymentstable