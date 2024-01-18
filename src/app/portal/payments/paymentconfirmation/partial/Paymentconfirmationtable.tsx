import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaymentConfirmationType } from '../paymentconfirmationtypedef'
import DataTable from 'app/app/components/datatable/datatable'

const columns: ColumnDef<PaymentConfirmationType>[] = [
    {
        accessorKey: "mid",
        header: "MID"
    },
    {
        accessorKey: "subscriber",
        header: "Subscriber"
    },
    {
        accessorKey: "modeOfPayment",
        header: "mode Of Payment",
    },
    {
        accessorKey: "dateOfPayment",
        header: "date Of Payment",
    },
    {
        accessorKey: "amount",
        header: "Amount (GHS)",
    },
    {
        accessorKey: "staff",
        header: "Staff",
    },
    {
        accessorKey: "",
        header: "Action"
    },

]
function Paymentconfirmationtable() {
    return (
        <div>
            <DataTable
                // onAction={() => setShowForm(true)}
                columns={columns}
                hasAction={false}
                extendedFilter={{
                    enable: true,
                    filters: [
                        {
                            filterType: "SelectFilter",
                            accessor: "saleExecutive",
                            args: {
                                options: [],
                                placeholder: "Sales Executives"
                            }
                        }
                    ]
                }}
            />
        </div>
    )
}

export default Paymentconfirmationtable