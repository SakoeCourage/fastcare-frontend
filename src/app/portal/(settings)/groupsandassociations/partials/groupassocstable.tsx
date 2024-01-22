"use client"
import React, { useState } from 'react'
import { IGroupAndAssDTO } from '../groupandassoctypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newgroupassform from './newgroupassform'
const columns: ColumnDef<IGroupAndAssDTO>[] = [
    {
        accessorKey: "name",
        header: "Groups"
    },
    {
        accessorKey: "",
        header: "Action"
    }
]
function groupassocstable() {
    const [showNewEntryForm, setShowNewEntryForm] = useState<boolean>(false)
    return (
        <div>
            <Modal open={showNewEntryForm} title='New Group Setup' closeModal={() => setShowNewEntryForm(false)}>
                <Newgroupassform />
            </Modal>
            <DataTable onAction={() => setShowNewEntryForm(true)} columns={columns} actionName='Add New Group' />
        </div>
    )
}

export default groupassocstable