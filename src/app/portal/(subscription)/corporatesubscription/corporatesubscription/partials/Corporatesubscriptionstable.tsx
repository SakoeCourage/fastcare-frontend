"use client"
import React, { useState } from 'react'
import { CorporateSubscriptionDTO } from '../corporatesubtypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newcorporateclientform from './Newcorporateclientform'
import Newcorporatesubscriptionform from './Newcorporatesubscriptionform'
export const columns: ColumnDef<CorporateSubscriptionDTO>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "contact",
        header: "Contact"
    }

]
function Corporatesubscriptionstable() {
    const [showNewCorporateClientForm, setShowNewCorporateClientForm] = useState<boolean>(false)
    const [showNewCorporateSubscriptionForm, setShowNewCorporateSubscriptionForm] = useState<boolean>(false)

    return (
        <div>
            <Modal size='xl' open={showNewCorporateClientForm} title="Add Corporate Client" closeModal={() => setShowNewCorporateClientForm(false)}>
                <Newcorporateclientform />
            </Modal>

            <Modal size='3xl' open={showNewCorporateSubscriptionForm} title="Add Corporate Subscription" closeModal={() => setShowNewCorporateSubscriptionForm(false)}>
                <Newcorporatesubscriptionform />
            </Modal>
            <DataTable
                onAction={() => setShowNewCorporateClientForm(true)}
                filterable="name"
                columns={columns}
                actionName='Add Corporate Client'
            />
        </div>
    )
}

export default Corporatesubscriptionstable