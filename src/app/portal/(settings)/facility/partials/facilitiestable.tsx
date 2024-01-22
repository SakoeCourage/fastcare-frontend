"use client"
import React, { useState } from 'react'
import { IFaciltyListDTO } from '../facilitytypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newfacilityform from './newfacilityform'
const columns: ColumnDef<IFaciltyListDTO>[] = [
    {
        accessorKey: "facility",
        header: "Facility"
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number"
    },
    {
        accessorKey: "location",
        header: "Location"
    },
    {
        accessorKey: "address",
        header: "Address"
    }
]
function facilitiestable() {
    const [showNewFacilityForm, setShowNewFacilityForm] = useState<boolean>(false)
    return (
        <div>
            <Modal open={showNewFacilityForm} title='New Facility Setup' closeModal={() => setShowNewFacilityForm(false)}>
                <Newfacilityform />
            </Modal>
            <DataTable onAction={() => setShowNewFacilityForm(true)} columns={columns} actionName='Add Facility' />
        </div>
    )
}

export default facilitiestable