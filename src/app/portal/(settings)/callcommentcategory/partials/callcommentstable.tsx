"use client"
import React, { useState } from 'react'
import { ICallCommentDTO } from '../callcommenttypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newcallcommentform from './newcallcommentform'
const columns: ColumnDef<ICallCommentDTO>[] = [
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "",
        header: "Action"
    }
]
function facilitiestable() {
    const [showNewCallComment, setShowNewCallComment] = useState<boolean>(false)
    return (
        <div>
            <Modal open={showNewCallComment} title='New Call Comment Setup' closeModal={() => setShowNewCallComment(false)}>
                <Newcallcommentform />
            </Modal>
            <DataTable onAction={() => setShowNewCallComment(true)} columns={columns} actionName='Add Call Comment Category' />
        </div>
    )
}

export default facilitiestable