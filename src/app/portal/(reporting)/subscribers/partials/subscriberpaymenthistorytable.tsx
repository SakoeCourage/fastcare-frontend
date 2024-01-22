import React from 'react'
import DataTable from 'app/app/components/datatable/datatable'
import { ColumnDef } from '@tanstack/react-table'
import { ISubscriberPaymentHistooryDTO } from './subpaymenthistorytypedef'

function SubscriberPaymentHistoryHeader() {
    return <div className=' font-semibold gap-5  grid grid-cols-1 md:grid-cols-2 p-5 text-gray-600'>
        <nav className='border  flex overflow-hidden truncate items-center gap-2 rounded-md shadow-sm'>
            <nav className="flex bg-sky-50 h-full items-center justify-center basis-52">
                <svg className=' text-sky-700' xmlns="http://www.w3.org/2000/svg" width="35" height="35"  viewBox="0 0 24 24"><path fill="currentColor" d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08zM11 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c.68 0 1.5.09 2.41.26l-1.67 1.67l-.74-.03c-2.97 0-6.1 1.46-6.1 2.1v1.1h6.2L13 20H3v-3c0-2.66 5.33-4 8-4"/></svg>
            </nav>
            <nav className="flex flex-col gap-3 p-2 py-4">
                <div className='text-sky-700 font-bold text-lg whitespace-nowrap'>Subscriber</div>
                <span className=" whitespace-nowrap inline-block ">
                    PNOP10013630 - EBENEZER PAPA ASUOYE DODOO
                </span>
            </nav>
        </nav>
        <nav className='border  flex overflow-hidden truncate items-center gap-2 rounded-md shadow-sm'>
            <nav className="flex bg-red-50 h-full items-center justify-center basis-52">
                <svg className=' text-red-700' xmlns="http://www.w3.org/2000/svg" width="33" height="33"viewBox="0 0 24 24"><path fill="currentColor" d="M7 4C4.8 4 3 5.8 3 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m0 4c-3.9 0-7 1.8-7 4v2h11v-2H2c0-.6 1.8-2 5-2c1.8 0 3.2.5 4 1v-2.2c-1.1-.5-2.5-.8-4-.8M22 4h-7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-6 14h-1V6h1zm6 0h-4V6h4z"/></svg>
            </nav>
            <nav className="flex flex-col gap-3 p-2 py-4">
                <div className='text-red-700 font-bold text-lg whitespace-nowrap'>Total Payments</div>
                <span className=" whitespace-nowrap inline-block ">
                    GHS 283
                </span>
            </nav>
        </nav>

    </div>
}

const columns: ColumnDef<ISubscriberPaymentHistooryDTO>[] = [
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
    },
    {
        accessorKey: "mid",
        header: "MID",
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber",
    },
    {
        accessorKey: "package",
        header: "Package",
    },
    {
        accessorKey: "modeOfPayment",
        header: "Mode Of Payment",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]

function subscriberpaymenthistorytable() {
    return (
        <div>
            <DataTable
                heading={<SubscriberPaymentHistoryHeader />}
                columns={columns}
                hasAction={false}
                extendedFilter={{
                    enable: true,
                    filters: [
                        {
                            filterType: "DateFilter",
                            accessor: "start_date",
                            args: {
                                placeholder: "Start Date",
                            }
                        },
                        {
                            filterType: "DateFilter",
                            accessor: "end_date",
                            args: {
                                placeholder: "End Date",
                            }
                        }
                    ]
                }}
            />
        </div>
    )
}

export default subscriberpaymenthistorytable