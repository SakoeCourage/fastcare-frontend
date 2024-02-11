"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import NewstaffForm from './newstaffForm'
import Modal from 'app/app/components/ui/modal'
import { staffDTO } from 'app/app/types/entitiesDTO'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'
import Tableinitials from 'app/app/components/datatable/partials/tableinitials'

function Staffstable() {
    const [showNewStaffForm, setShowNewStaffForm] = useState<staffDTO | null>(null)
    const columns: ColumnDef<staffDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "fullName",
            header: "Full Name",
            cell: ({ row }) => <Tableinitials address={row.original.phoneNumber} name={`${row.original.firstName} ${row.original.lastName}`}/>
        },
        {
            accessorKey: "gender",
            header: "Gender"
        },
        {
            accessorKey: "dateOfBirth",
            header: "Date Of Birth"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setShowNewStaffForm(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]
    return (
        <div>
            <Modal size='xl' open={showNewStaffForm !== null} title='New Staff Onboarding' closeModal={() => setShowNewStaffForm(null)}>
                <NewstaffForm
                    formData={showNewStaffForm}
                    onCancel={() => setShowNewStaffForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowNewStaffForm(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/staff?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewStaffForm({} as staffDTO)}
                columns={columns}
                actionName='Onboard New Staff'
                filterable='lastName'
                filterablePlaceholder='Search Staff Name '
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

export default Staffstable