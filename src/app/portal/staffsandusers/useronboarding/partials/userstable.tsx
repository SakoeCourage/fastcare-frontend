"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IUserDTO } from '../usertypedef'
import Modal from 'app/app/components/ui/modal'
import Newuserform from './newuserform'
import DataTable from 'app/app/components/datatable/datatable'

const columns: ColumnDef<IUserDTO>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "facility",
        header: "Facility"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        accessorKey: "",
        header: "Action"
    }
]

function userstable() {
    const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false)
    return (
        <div>
            <Modal size='xl' open={showNewUserForm} title='New User Onboarding' closeModal={() => setShowNewUserForm(false)} >
                <Newuserform />
            </Modal>
            <DataTable filterable="fullName" filterablePlaceholder='Search Email or FullName' onAction={() => setShowNewUserForm(true)} columns={columns} actionName='Onboard New User' />
        </div>
    )
}

export default userstable