"use client"
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import DataTable from '@/components/datatable/datatable'
import { formatcurrency } from 'app/app/lib/utils'

type Order = {
    MID: string,
    Subscriber: string,
    Amount: number,
    Mode: string,
    status: "Paid" | "Pending",
}

const orders: Order[] = [
    {
        MID: "STACO1700057815408",
        Subscriber: "Staco Insurance company Limited",
        Mode: "Cheque",
        status: "Paid",
        Amount: 2332,
    },
    {
        MID: "ABC123456789",
        Subscriber: "John Doe",
        Mode: "Cash",
        status: "Pending",
        Amount: 750,
    },
    {
        MID: "XYZ987654321",
        Subscriber: "Jane Smith",
        Mode: "Cheque",
        status: "Paid",
        Amount: 1125,
    },
    {
        MID: "DEF567890123",
        Subscriber: "Acme Corporation",
        Mode: "MoMo",
        status: "Pending",
        Amount: 3000,
    },
    {
        MID: "GHI456789012",
        Subscriber: "Tech Solutions Ltd",
        Mode: "MoMo",
        status: "Paid",
        Amount: 450,
    },
    {
        MID: "JKL234567890",
        Subscriber: "Happy Customers Inc",
        Mode: "Cash",
        status: "Pending",
        Amount: 1200,
    },
];


export function Statusindicator({status}: {status: "Paid" | "Pending"}): React.JSX.Element {
    return <nav>
        {status == "Paid" ? <nav className=" bg-green-200 whitespace-nowrap text-green-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-green-600"></span> Paid</nav> :
            <nav className=" bg-red-200 whitespace-nowrap text-red-700 px-2 py-1 rounded-md shadow w-max  min-w-28 "> <span className="inline-block h-2 w-2 aspect-square rounded-full bg-red-600"></span> Pending</nav>
        }
    </nav>
}


export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "MID",
        header: "MID",
    },
    {
        accessorKey: "Subscriber",
        header: "Subscriber",
    },
    {
        accessorKey: "Amount",
        header: "Amount",
        cell: ({ row }) => `${formatcurrency(row.original.Amount)}`
    },
    {
        accessorKey: "Mode",
        header: "Mode",
    },
    {
        accessorKey: "Status",
        header: "Status",
        cell: ({row})=> <Statusindicator status={row.original.status}/>,
      
        
    },


]

export default function Recentpayments() {


    return (
        <div className=" lg:col-span-3">
            <DataTable
                enableTableFilter={false}
                enablePaginator={false}
                heading='Recent Payments'
                columns={columns} data={orders} />
        </div>
    )
}