"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import { IDataImportDTO } from '../dataimportypedef'
import Modal from 'app/app/components/ui/modal'
import Csvdataimport from './csvdataimport'
export const columns: ColumnDef<IDataImportDTO>[] = [
    {
        accessorKey: "mid",
        header: "MID",
    },
    {
        accessorKey: "idType",
        header: "ID Type",
    },
    {
        accessorKey: "idNumber",
        header: "ID Number",
    },
    {
        accessorKey: "firstName",
        header: "F.Name",
    },
    {
        accessorKey: "lasName",
        header: "L.Name",
    },
    {
        accessorKey: "otherNamees",
        header: "O.Names",
    },
    {
        accessorKey: "dateOfBirth",
        header: "DoB",
    },
    {
        accessorKey: "contact",
        header: "Contact",
    },
    {
        accessorKey: "facility",
        header: "Facility",
    },
    {
        accessorKey: "emergencyPerson",
        header: "Em. Person",
    },
    {
        accessorKey: "emergencyContact",
        header: "Em. Phone",
    },
    {
        accessorKey: "package",
        header: "Package",
    },
    {
        accessorKey: "hasNHIS",
        header: "Has NHIS",
    },
    {
        accessorKey: "group",
        header: "Group",
    },
    {
        accessorKey: "dateOfSubs",
        header: "Date of Subs",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
]
function Importdatatable() {
    const [showFileUploadModal, setShowFileUploadModal] = useState<boolean>(false)
    return (
        <div>
            <Modal open={showFileUploadModal} title='UPLOAD SANITIZED DATA FROM CSV FILE' closeModal={() => setShowFileUploadModal(false)} >
                <Csvdataimport />
            </Modal>
            <DataTable onAction={() => setShowFileUploadModal(true)} columns={columns} hasAction={true} actionName='Import CSV Data' />
        </div>
    )
}

export default Importdatatable