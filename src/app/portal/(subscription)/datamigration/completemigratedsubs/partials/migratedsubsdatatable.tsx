import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import { IMigratedSubsDTO } from '../migratedsubtypedef'

const columns: ColumnDef<IMigratedSubsDTO>[] = [
    {
        accessorKey: "mid",
        header: "MID",
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "contactNumber",
        header: "Contact Number",
    }
]

function migratedsubsdatatable() {
    return (
        <div>
            <DataTable columns={columns} filterable='fullName' filterablePlaceholder='Search by name or mid' hasAction={false} />
        </div>
    )
}

export default migratedsubsdatatable