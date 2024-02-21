"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import NewPackage from './newpackageform'
import { packageDTO } from 'app/app/types/entitiesDTO'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import Api from 'app/app/fetch/axiosInstance'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'

function Packagestable() {
    const [showNewPackageForm, setShowNewPackageForm] = useState<boolean>(false)
    const [selectedPackage, setSelectedPackage] = useState<packageDTO | null>(null)

    const columns: ColumnDef<packageDTO>[] = [
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
            accessorKey: "description",
            header: "Description"
        },
        {
            accessorKey: "amount",
            header: "Amount"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => {
                setSelectedPackage(row.original)
                setShowNewPackageForm(true)
            }} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]
    return (
        <div>
            <Modal open={showNewPackageForm} title={selectedPackage ? `UPDATE -  ${selectedPackage?.name}` : "New Package Setup"} closeModal={() => {
                setShowNewPackageForm(false);
                setSelectedPackage(null)
            }}>
                <NewPackage
                    formData={selectedPackage}
                    onNewDataSucess={() => { setShowNewPackageForm(false); resetTableData(); setSelectedPackage(null) }}
                    onCancel={() => { setShowNewPackageForm(false); setSelectedPackage(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/packages?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewPackageForm(true)}
                filterable='name'
                filterablePlaceholder='Search Name..'
                columns={columns}
                actionName='Add Package'
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

export default Packagestable