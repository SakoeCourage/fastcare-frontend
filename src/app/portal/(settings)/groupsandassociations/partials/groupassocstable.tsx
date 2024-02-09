"use client"
import React, { useState } from 'react'
import { groupDTO } from 'app/app/types/entitiesDTO'
import { ColumnDef } from '@tanstack/react-table'
import DataTable, { resetTableData } from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newgroupassform from './newgroupassform'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { dateReformat } from 'app/app/lib/utils'

function Groupassocstable() {
    const [showNewEntryForm, setShowNewEntryForm] = useState<groupDTO | null>(null)

    const columns: ColumnDef<groupDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setShowNewEntryForm(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
        }
    ]
    return (
        <div>
            <Modal open={showNewEntryForm !== null} title='New Group Setup' closeModal={() => setShowNewEntryForm(null)}>
                <Newgroupassform
                    formData={showNewEntryForm}
                    onCancel={() => setShowNewEntryForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowNewEntryForm(null) }}
                />
            </Modal>
            <DataTable
                filterable="name"
                filterablePlaceholder='Search Group Name..'
                dataSourceUrl='/groups?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewEntryForm({} as groupDTO)}
                columns={columns}
                actionName='Add New Group'
                sortableColumns={[
                    {
                        column: "createdAt",
                        accessor: "sort",
                        options: [
                            {
                                key: "Ascending",
                                value: "createdAt_asc"
                            },
                            {
                                key: "Descending",
                                value: "createdAt_desc"
                            }
                        ]
                    },
                    
                ]}
            />
        </div>
    )
}

export default Groupassocstable