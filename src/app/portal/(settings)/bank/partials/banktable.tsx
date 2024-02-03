"use client"
import React, { useState } from 'react'
import { bankDTO } from 'app/app/types/entitiesDTO'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newbankform from './newbankform'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'


function Banktable() {
    const [curentCallComment, setCurentCallComment] = useState<bankDTO | null>(null)


    const columns: ColumnDef<bankDTO>[] = [
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
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setCurentCallComment(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]

    return (
        <div>
            <Modal open={curentCallComment !== null} title='Bank Setup' closeModal={() => setCurentCallComment(null)}>
                <Newbankform
                    onCancel={() => setCurentCallComment(null)}
                    onNewDataSucess={() => { resetTableData(); setCurentCallComment(null) }}
                    formData={curentCallComment}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/banks?pageSize=10&page=1'
                onAction={() => setCurentCallComment({} as bankDTO)}
                columns={columns} actionName='Add Bank' />
        </div>
    )
}

export default Banktable