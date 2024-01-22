"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IStaffDTO } from '../staffstypedef'
import DataTable from 'app/app/components/datatable/datatable'
import NewstaffForm from './newstaffForm'
import Modal from 'app/app/components/ui/modal'

const columns: ColumnDef<IStaffDTO>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name"
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
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "",
        header: "Action"
    }
]
function staffstable() {
    const [showNewStaffForm, setShowNewStaffForm] = useState<boolean>(false)
    return (
        <div>
            <Modal size='xl' open={showNewStaffForm} title='New Staff Onboarding' closeModal={() => setShowNewStaffForm(false)}>
                <NewstaffForm />
            </Modal>
            <DataTable onAction={()=>setShowNewStaffForm(true)} columns={columns} actionName='Onboard New Staff' />
        </div>
    )
}

export default staffstable