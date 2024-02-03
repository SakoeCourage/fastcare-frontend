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

function packagestable() {
    const [showNewPackageForm, setShowNewPackageForm] = useState<boolean>(false)
    const [selectedPackage, setSelectedPackage] = useState<packageDTO | null>(null)

    const handleFetchPackageData = (id: number | undefined | null) => {
        if (!id) return
        Api.get('/packages/' + id)
            .then((res: AxiosResponse<packageDTO>) => {
                setSelectedPackage(res.data)
                console.log(res.data)
                setShowNewPackageForm(true)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const columns: ColumnDef<packageDTO>[] = [
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
            cell: ({ row }) => <IconifyIcon onClick={() => handleFetchPackageData(row.original.id)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]
    return (
        <div>
            <Modal open={showNewPackageForm} title={selectedPackage ? `UPDATE -  ${selectedPackage?.name}` : "New Package Setup"} closeModal={() => setShowNewPackageForm(false)}>
                <NewPackage
                    formData={selectedPackage}
                    onNewDataSucess={() => { setShowNewPackageForm(false); resetTableData(); setSelectedPackage(null) }}
                    onCancel={() => { setShowNewPackageForm(false); setSelectedPackage(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/packages?pageSize=10&page=1'
                onAction={() => setShowNewPackageForm(true)}
                columns={columns}
                actionName='Add Package' />
        </div>
    )
}

export default packagestable