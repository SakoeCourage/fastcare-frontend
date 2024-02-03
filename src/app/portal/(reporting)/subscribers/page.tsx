"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ISubscribersDTO } from './subscribertypedef'
import DataTable from 'app/app/components/datatable/datatable'
import Sidemodal from 'app/app/components/ui/sidemodal'
import Subscriberpaymenthistorytable from './partials/subscriberpaymenthistorytable'
const columns: ColumnDef<ISubscribersDTO>[] = [
    {
        accessorKey: "mid",
        header: "MID"
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "package",
        header: "Package"
    },
    {
        accessorKey: "facility",
        header: "Facility"
    },
    {
        accessorKey: "LPD",
        header: "LPD"
    },
    {
        accessorKey: "DSLP",
        header: "DSLP"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "amountDue",
        header: "Amount Due"
    },
    {
        accessorKey: "",
        header: "Action"
    },
]

function Page() {
    const [showPaymentHistory, setShowPaymentHistory] = useState<boolean>(false)
    return (
        <div className='container mx-auto'>
            <div className=' w-full mb-2 flex flex-col gap-2  md:flex-row p-5  items-center justify-between py-2'>
                <h1 className=' text-gray-500 font-medium text-lg flex items-center'>
                    Subscribers List
                </h1>
            </div>
            <Sidemodal size="3xl" open={showPaymentHistory} closeModal={() => setShowPaymentHistory(false)} title='Subscriber Payment History'>
                <Subscriberpaymenthistorytable />
            </Sidemodal>
            <DataTable columns={columns}
                filterable='subscriber'
                filterablePlaceholder='Search Subscriber Name'
                hasAction={false}
                extendedFilter={
                    {
                        enable: true,
                        filters: [
                            {
                                filterType: "SelectFilter",
                                accessor: "status",
                                args: {
                                    placeholder: "Status",
                                    options: []
                                }
                            },
                            {
                                filterType: "SelectFilter",
                                accessor: "facility",
                                args: {
                                    placeholder: "facility",
                                    options: []
                                }
                            },
                            {
                                filterType: "SelectFilter",
                                accessor: "staff",
                                args: {
                                    placeholder: "staff",
                                    options: []
                                }
                            },
                        ],
                    }}
            />
        </div>
    )
}

export default Page

