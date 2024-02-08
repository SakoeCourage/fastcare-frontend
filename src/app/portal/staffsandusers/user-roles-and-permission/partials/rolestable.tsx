"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Newroleform from './newroleform'
import Modal from 'app/app/components/ui/modal'
import { roleDTO } from 'app/app/types/entitiesDTO'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import Tooltip from 'app/app/components/ui/tooltip'
import { dateReformat } from 'app/app/lib/utils'
import EditPermissions from './editpermission'
import Sidemodal from 'app/app/components/ui/sidemodal'


function Rolesstable() {
    const [showRolePermissions, setShowRolePermissions] = useState<roleDTO | null>(null)
    const [showRoleForm, setShowRoleForm] = useState<roleDTO | null>(null)
    const columns: ColumnDef<roleDTO>[] = [
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
            header: "Permissions",
            cell: ({ row }) => <button disabled={Boolean(row.original?.name?.trim().toLocaleLowerCase() == "Super Admin".toLocaleLowerCase())} onClick={() => setShowRolePermissions(row.original as roleDTO)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 px-2 bg-white border text-blue-600 border-blue-400 items-center text-xs'>
                    <nav className="text-xs text-center mr-1">
                        {row.original?.permissions?.length}
                    </nav>
                    <nav>View Permissions</nav>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </button>
        },
        {
            accessorKey: "",
            header: "Actions",
            cell: ({ row }) => <Tooltip toolTipText='Edit Family'>
                <IconifyIcon onClick={() => setShowRoleForm(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
            </Tooltip>
        },
    ]
    return (
        <div>
            <Sidemodal size="md" open={showRolePermissions !== null} title={showRolePermissions?.id ? `Edit Role Permission ${showRolePermissions.name}` : "User Role"} closeModal={() => setShowRolePermissions(null)}>
                <EditPermissions
                    formData={showRolePermissions}
                    onCancel={() => setShowRolePermissions(null)}
                    onNewDataSucess={() => { resetTableData(); setShowRolePermissions(null) }}
                />
            </Sidemodal>

            <Modal size="md" open={showRoleForm !== null} title={showRoleForm?.id ? `Edit Role ${showRoleForm.name}` : "User Role"} closeModal={() => setShowRoleForm(null)}>
                <Newroleform
                    formData={showRoleForm}
                    onCancel={() => setShowRoleForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowRoleForm(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/roles?pageSize=10&page=1&sort=createdAt_desc'
                filterable="name"
                filterablePlaceholder='Search Role Name'
                onAction={() => setShowRoleForm({} as roleDTO)}
                columns={columns}
                sortableColumns={[
                    {
                        column: "createdAt",
                        accessor: "sort",
                        options: [
                            {
                                key: "Ascending",
                                value: "createdAt_desc"
                            },
                            {
                                key: "Descending",
                                value: "createdAt_desc"
                            }
                        ]
                    }
                ]}
                actionName='Create A Role'
                
            />
        </div>
    )
}

export default Rolesstable