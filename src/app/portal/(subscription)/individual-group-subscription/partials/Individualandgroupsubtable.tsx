"use client"
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IndividualAndGroupType } from '../individualandgrouptypedef'
import DataTable from 'app/app/components/datatable/datatable'
import Newsubscriberform from './Newsubscriberform'
import Modal from 'app/app/components/ui/modal';
import Api from 'app/app/fetch/axiosInstance'
import { IndividualSubDTO } from 'app/app/types/entitiesDTO'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'

export const initialFormStateProp: {
    title: string | null,
    open: boolean;
} = {

    title: null,
    open: false
}



function Individualandgroupsubtable() {
    const [showForm, setShowForm] = useState(initialFormStateProp)
    const [subscriberData, setSubscriberData] = useState<IndividualSubDTO | null>(null)

    const handleFetchSubscriberData = (id: number | string | undefined) => {
        if (id == null) return
        Api.get('/individual-subscribers/' + id)
            .then((res: AxiosResponse<IndividualSubDTO>) => {
                setSubscriberData(res.data)
                setShowForm({ title: "UPDATE SUBSCRIBER - " + res.data.membershipID + " " + res.data.firstName, open: true })
            })
            .catch(err => {
                console.log(err)
                toastnotify("An Error Occured Fetching Subscriber Data")
            })
    }

    const columns: ColumnDef<IndividualSubDTO>[] = [
        {
            accessorKey: "membershipID",
            header: "MID",
        },
        {
            accessorKey: "firstName",
            header: "Full Name",
            cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`
        },
        {
            accessorKey: 'phoneOne',
            header: "Contact Number"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => handleFetchSubscriberData(row.original.id)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
        },

    ]

    const handleOnResetState = () => {
        setShowForm(initialFormStateProp);
        setSubscriberData(null)
    }

   

    return (
        <div>
            <Modal size='3xl' closeModal={() => { handleOnResetState() }} open={showForm.open} title={showForm.title ?? "Add New Subscriber"}>
                <Newsubscriberform onCancel={() => { handleOnResetState() }}
                    onNewDataSucess={() => { handleOnResetState(); resetTableData() }}
                    formData={subscriberData} />
            </Modal>

            <DataTable
                dataSourceUrl='/individual-subscribers?pageSize=10&page=1'
                onAction={() => setShowForm({ title: "Add New Subscriber", open: true })}
                filterable='firstName'
                actionName='Add Subscriber'
                filterablePlaceholder='Name or MID'
                columns={columns}
            />
        </div >
    )
}

export default Individualandgroupsubtable