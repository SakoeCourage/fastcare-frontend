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
    const [curentBankData, setCurentBankData] = useState<bankDTO | null>(null)


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
            cell: ({ row }) => <IconifyIcon onClick={() => setCurentBankData(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]

    return (
        <div>
            <Modal open={curentBankData !== null} title='Bank Setup' closeModal={() => setCurentBankData(null)}>
                <Newbankform
                    onCancel={() => setCurentBankData(null)}
                    onNewDataSucess={() => { resetTableData(); setCurentBankData(null) }}
                    formData={curentBankData}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/banks?pageSize=10&page=1&sort=createdAt_desc'
                filterable="name"
                filterablePlaceholder='Search Name..'
                onAction={() => setCurentBankData({} as bankDTO)}
                columns={columns} actionName='Add Bank' 
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

export default Banktable