import React from 'react'
import { ColumnDef } from '@tanstack/react-table'   
import { IUnMandatedSubscribersDTO } from '../unmandatedsubscriberstypdef'
import DataTable from 'app/app/components/datatable/datatable'

const columns: ColumnDef<IUnMandatedSubscribersDTO>[] = [
    {
        accessorKey: "mid",
        header: "MID"
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber"
    },
    {
        accessorKey: "package",
        header: "Package"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "momo",
        header: "MoMo"
    },
    {
        accessorKey: "dos",
        header: "DoS"
    },
    {
        accessorKey: "facility",
        header: "Facility"
    },
    {
        accessorKey: "agent",
        header: "Agent"
    },
    {
        accessorKey: "amount",
        header: "Amount"
    },
    {
        accessorKey: "network",
        header: "Network"
    }
]
function unmandatedsubscriberstable() {

  return (
    <div>
        <DataTable hasAction={false} columns={columns} filterable="mid" filterablePlaceholder='Search MID or Subscriber' />
    </div>
  )
}

export default unmandatedsubscriberstable