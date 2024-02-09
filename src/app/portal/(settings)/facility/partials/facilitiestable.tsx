"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newfacilityform from './newfacilityform'
import { facilityDTO } from 'app/app/types/entitiesDTO'
import { dateReformat } from 'app/app/lib/utils'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import Api from 'app/app/fetch/axiosInstance'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'

function Facilitiestable() {
    const [showNewFacilityForm, setShowNewFacilityForm] = useState<boolean>(false)
    const [facilityData, setFacilityData] = useState<facilityDTO | null>(null)


    const columns: ColumnDef<facilityDTO>[] = [
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
            accessorKey: "phoneNumber",
            header: "Phone Number"
        },
        {
            accessorKey: "address",
            header: "Address"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => {
                setFacilityData(row.original)
                setShowNewFacilityForm(true)
            }} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

        }
    ]
    return (
        <div>
            <Modal open={showNewFacilityForm} title={facilityData ? `UPDATE -  ${facilityData?.name}` : "New Facility Setup"} closeModal={() => setShowNewFacilityForm(false)}>
                <Newfacilityform
                    onNewDataSucess={() => { setShowNewFacilityForm(false); resetTableData(); setFacilityData(null) }}
                    onCancel={() => { setShowNewFacilityForm(false); setFacilityData(null) }}
                    formData={facilityData}
                />
            </Modal>
            <DataTable
                filterable='name'
                filterablePlaceholder='Search Name..'
                dataSourceUrl='/facilities?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewFacilityForm(true)}
                columns={columns} actionName='Add Facility'
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

export default Facilitiestable