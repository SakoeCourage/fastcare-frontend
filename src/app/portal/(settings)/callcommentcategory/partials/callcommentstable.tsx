"use client"
import React, { useState } from 'react'
import { callCommentDTO } from 'app/app/types/entitiesDTO'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newcallcommentform from './newcallcommentform'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'

function Callcommentstable() {
    const [curentCallComment, setCurentCallComment] = useState<callCommentDTO | null>(null)


    const columns: ColumnDef<callCommentDTO>[] = [
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
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setCurentCallComment(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]

    return (
        <div>
            <Modal open={curentCallComment !== null} title='Call Comment Setup' closeModal={() => setCurentCallComment(null)}>
                <Newcallcommentform
                    onCancel={() => setCurentCallComment(null)}
                    onNewDataSucess={() => { resetTableData(); setCurentCallComment(null) }}
                    formData={curentCallComment}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/call-comment-categories?pageSize=10&page=1'
                onAction={() => setCurentCallComment({} as callCommentDTO)}
                columns={columns} actionName='Add Call Comment Category' />
        </div>
    )
}

export default Callcommentstable