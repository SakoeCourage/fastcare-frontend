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

    const handleFetchFacilityData = (id: number | undefined | null) => {
        if (!id) return
        Api.get('/facilities/' + id)
            .then((res: AxiosResponse<facilityDTO>) => {
                setFacilityData(res.data)
                setShowNewFacilityForm(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const columns: ColumnDef<facilityDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "CreateAt",
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
            cell: ({ row }) => <IconifyIcon onClick={() => handleFetchFacilityData(row.original.id)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />

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
                dataSourceUrl='/facilities?pageSize=10&page=1'
                onAction={() => setShowNewFacilityForm(true)}
                columns={columns} actionName='Add Facility' />
        </div>
    )
}

export default Facilitiestable