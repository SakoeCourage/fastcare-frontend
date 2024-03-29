"use client"
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Newsubscriberform from './Newsubscriberform'
import Modal from 'app/app/components/ui/modal';
import Api from 'app/app/fetch/axiosInstance'
import { IndividualSubDTO } from 'app/app/types/entitiesDTO'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'
import axios from 'axios'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'
import Tableinitials from 'app/app/components/datatable/partials/tableinitials'

export const initialFormStateProp: {
    title: string | null,
    open: boolean;
} = {

    title: null,
    open: false
}

function Individualandgroupsubtable(props: Partial<ISelectData>) {

    const [subscriberData, setSubscriberData] = useState<IndividualSubDTO | null>(null)
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const columns: ColumnDef<IndividualSubDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "membershipID",
            header: "MID",
        },
        {
            accessorKey: "firstName",
            header: "Full Name",
            cell: ({ row }) => <Tableinitials address={row.original.phoneOne} name={`${row.original.firstName.trim()} ${row.original.lastName.trim()}`} />

        },

        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <IconifyIcon onClick={() => setSubscriberData(row.original)} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
        },

    ]


    const handleFetchSubscriberData = (id: number | string | undefined) => {
        if (id == null) return
        Api.get('/individual-subscribers/' + id, {
            cancelToken: source.token
        })
            .then((res: AxiosResponse<IndividualSubDTO>) => {
                const { passportPicture } = res.data

                let file: File | null = null;
                if (typeof passportPicture === "string") {
                    const inputString = passportPicture as string;
                    const base64Data = inputString.split(",")[1];
                    const fileType = inputString.split(",")[0].replace(/^data:([^:]+):base64$/, '$1');;

                    const base64Buffer = Buffer.from(base64Data, 'base64');
                    const blob = new Blob([base64Buffer]);
                    const filename = "userprofile";
                    file = new File([blob], filename, { type: fileType });
                }
                if (file) {
                    setSubscriberData(cv => cv = { ...cv, passportPicture: file })
                }
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    // toastnotify("Fetch Canc");
                } else {
                    // toastnotify("Failed Passport Image")
                }

            })
    }

    const handleOnResetState = () => {
        if (subscriberData.id) {
            source.cancel('Request canceled by user');
        }
        setSubscriberData(null)
    }

    return (
        <div>
            <Modal size='3xl' closeModal={() => { handleOnResetState() }} open={subscriberData !== null} title={subscriberData?.membershipID ? `UPDATE SUBSCRIBER - ${subscriberData.membershipID}` : "Add New Subscriber"}>
                <Newsubscriberform onCancel={() => { handleOnResetState() }}
                    onNewDataSucess={() => { handleOnResetState(); resetTableData() }}
                    formData={subscriberData}
                    handleFetchSubscriberData={handleFetchSubscriberData}
                    {...props}
                />
            </Modal>

            <DataTable
                dataSourceUrl='/individual-subscribers?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setSubscriberData({} as IndividualSubDTO)}
                filterable='firstName'
                actionName='Add Subscriber'
                filterablePlaceholder='Name or MID'
                columns={columns}
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
        </div >
    )
}

export default Individualandgroupsubtable