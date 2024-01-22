"use client"
import React, { useState } from 'react'
import { IPackagesListDTO } from '../packagetypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import NewPackage from './newpackageform'
const columns: ColumnDef<IPackagesListDTO>[] = [
    {
        accessorKey: "package",
        header: "Package"
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
        header: "Action"
    }
]
function packagestable() {
    const [showNewPackage, setShowNewPackage] = useState<boolean>(false)
    return (
        <div>
            <Modal open={showNewPackage} title='New Package Setup' closeModal={() => setShowNewPackage(false)}>
                <NewPackage />
            </Modal>
            <DataTable onAction={() => setShowNewPackage(true)} columns={columns} actionName='Add Package' />
        </div>
    )
}

export default packagestable