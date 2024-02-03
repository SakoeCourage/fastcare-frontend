"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { userDTO } from 'app/app/types/entitiesDTO'
import Modal from 'app/app/components/ui/modal'
import Newuserform from './newuserform'
import DataTable from 'app/app/components/datatable/datatable'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'

function Userstable() {
    const [showNewUserForm, setShowNewUserForm] = useState<userDTO | null>(null)

    const columns: ColumnDef<userDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "username",
            header: "User Name"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setShowNewUserForm(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
        }
    ]
    return (
        <div>
            <Modal size='xl' open={showNewUserForm !== null} title='New User Onboarding' closeModal={() => setShowNewUserForm(null)} >
                <Newuserform
                    formData={showNewUserForm}
                    onCancel={() => setShowNewUserForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowNewUserForm(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/users?pageSize=10&page=1'
                filterable="username"
                filterablePlaceholder='Search username'
                onAction={() => setShowNewUserForm({} as userDTO)} columns={columns} actionName='Onboard New User' />
        </div>
    )
}

export default Userstable