"use client"
import DataTable from 'app/app/components/datatable/datatable'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Modal from 'app/app/components/ui/modal'
import Premiumpaymentform from './Premiumpaymentform'
import { PremiumPaymentSubscriberDTO } from 'app/app/types/entitiesDTO'
import { formatcurrency } from 'app/app/lib/utils'
import Tooltip from 'app/app/components/ui/tooltip'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'



function Makepaymenttable(props: Partial<ISelectData>) {
    const [showPremiumPaymentForm, setshowPremiumPaymentForm] = React.useState<PremiumPaymentSubscriberDTO | null>(null)

    const columns: ColumnDef<PremiumPaymentSubscriberDTO>[] = [
        {
            accessorKey: "membershipID",
            header: "MID"
        },
        {
            accessorKey: "name",
            header: "Subscriber"
        },
        {
            accessorKey: "subscriberType",
            header: "Type",
        },
        {
            accessorKey: "originalAmount",
            header: "Amount Due",
            cell: ({ row }) => formatcurrency(row.original.amountToDebit)
        },
        {
            accessorKey: "status",
            header: "Status"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <Tooltip toolTipText='Make Premium Payment' ><IconifyIcon onClick={() => setshowPremiumPaymentForm(row.original)} className=' cursor-pointer bg-transparent' icon='fluent:open-24-filled' /></Tooltip>
        },

    ]

    return (
        <div>
            <Modal size="3xl" open={showPremiumPaymentForm != null} closeModal={() => setshowPremiumPaymentForm(null)} title='Premium Payment'>
                <Premiumpaymentform
                    onCancel={() => setshowPremiumPaymentForm(null)}
                    onNewDataSucess={() => {
                        setshowPremiumPaymentForm(null)
                    }}
                    formData={showPremiumPaymentForm}
                    {...props}
                />
            </Modal>
            <DataTable
                hasAction={false}
                filterable="accountNumber"
                filterablePlaceholder='Search Name or Membership ID'
                dataSourceUrl='/payments/all-subscribers?pageSize=10&page=1&sort=id_desc'
                columns={columns}
            />
        </div>
    )
}

export default Makepaymenttable