"use client"
import DataTable from 'app/app/components/datatable/datatable'
import React from 'react'
import { PremiumPaymentsListType } from '../premiumpaymentstypdef'
import { ColumnDef } from '@tanstack/react-table'
import Modal from 'app/app/components/ui/modal'
import Premiumpaymentform from './Premiumpaymentform'

const columns: ColumnDef<PremiumPaymentsListType>[] = [
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
        header: "Type",
    },
    {
        accessorKey: "LPD",
        header: "LPD"
    },
    {
        accessorKey: "DSLP",
        header: "DSLP(Days)"
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
        accessorKey: "moMoNumber",
        header: "MoMo Number"
    },
    {
        accessorKey: "",
        header: "Action"
    },

]

function Makepaymenttable() {
    const [showForm, setShowForm] = React.useState<boolean>(false)
    return (
        <div>
            <Modal size="md" open={showForm} closeModal={() => setShowForm(false)} title='Premium Payment'>
                <Premiumpaymentform />
            </Modal>
            <DataTable
                onAction={() => setShowForm(true)}
                filterable="subscriber"
                filterablePlaceholder='Name or Membership ID'
                columns={columns}
            />
        </div>
    )
}

export default Makepaymenttable