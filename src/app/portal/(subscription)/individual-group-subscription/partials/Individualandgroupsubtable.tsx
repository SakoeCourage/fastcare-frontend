"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IndividualAndGroupType } from '../individualandgrouptypedef'
import DataTable from 'app/app/components/datatable/datatable'
import Newsubscriberform from './Newsubscriberform'
import Modal from 'app/app/components/ui/modal';

function Individualandgroupsubtable() {
    const [showForm, setShowForm] = useState<boolean>(false)

    const columns: ColumnDef<IndividualAndGroupType>[] = [
        {
            accessorKey: "MID",
            header: "MID",
        },
        {
            accessorKey: "fullName",
            header: "Full Name"
        },
        {
            accessorKey: "contactNumber",
            header: "Contact Number"
        },
        {
            accessorKey: "facility",
            header: "Facility",
        },
        {
            accessorKey: "",
            header: "Action",
        },

    ]

    return (
        <div>
            <Modal size='3xl' closeModal={() => setShowForm(false)} open={showForm} title='Add Individual Subscriber'>
                <Newsubscriberform />
            </Modal>
            <DataTable
                onAction={() => setShowForm(true)}
                filterable="fullName"
                actionName='Add Subscriber'
                filterablePlaceholder='Name or Membership ID'
                columns={columns}
            />
        </div>
    )
}

export default Individualandgroupsubtable