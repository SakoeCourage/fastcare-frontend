"use client"
import React, { useState } from 'react'
import { FamilySubscriptionDTO } from '../familysubtypedef'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newfamilyclientform from './Newfamilyclientform'
import Newfamilysubscriptionform from './Newfamilysubscriptionform'
export const columns: ColumnDef<FamilySubscriptionDTO>[] = [
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
function Familysubscriptionstable() {
    const [showNewFamilyClientForm, setShowNewFamilyClientForm] = useState<boolean>(false)
    const [showNewFamilySubscriptionForm, setShowNewFamilySubscriptionForm] = useState<boolean>(false)

    return (
        <div>
            <Modal size='xl' open={showNewFamilyClientForm} title="Add Family Client" closeModal={() => setShowNewFamilyClientForm(false)}>
                <Newfamilyclientform />
            </Modal>

            <Modal size='3xl' open={showNewFamilySubscriptionForm} title="Add Family Subscription" closeModal={() => setShowNewFamilySubscriptionForm(false)}>
                <Newfamilysubscriptionform />
            </Modal>
            <DataTable
                onAction={() => setShowNewFamilyClientForm(true)}
                filterable="name"
                columns={columns}
                actionName='Add Family Client'
            />
        </div>
    )
}

export default Familysubscriptionstable