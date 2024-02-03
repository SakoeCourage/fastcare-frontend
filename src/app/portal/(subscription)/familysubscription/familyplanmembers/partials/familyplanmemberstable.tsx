"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import { IFamilyPlanMembersDTO } from '../familyplanmemberstypedef'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import Tooltip from 'app/app/components/ui/tooltip'
import Newfamilymemberforms from './newfamilymemberforms'
import Modal from 'app/app/components/ui/modal'
import Sidemodal from 'app/app/components/ui/sidemodal'
import Simplestepper from './stepper/simplestepper'
import { Step } from './stepper/steppertypes'
import Beneficiarieslist from './beneficiarieslist'



function familyplanmemberstable() {
    const [showNewFamilyMemberForm, setShowNewFamilyMemberForm] = useState<boolean>(false)
    const [showSubcriptionPackages, setShowSubcriptionPackages] = useState<boolean>(false)

    const columns: ColumnDef<IFamilyPlanMembersDTO>[] = [
        {
            accessorKey: "family",
            header: "Family",
        },
        {
            accessorKey: "",
            header: "Allowed Members",
            cell: ({ row }) => <nav>2</nav>
        },
        {
            accessorKey: "",
            header: "Subscribed Packages",
            cell: ({ row }) => <nav>3 Subscription(s)</nav>
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => <nav onClick={() => setShowSubcriptionPackages(true)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 pl-2 bg-white border border-gray-400 items-center text-xs'>
                    <span> View </span>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </nav>
        }
    ]

    const steps: Step[] = [{
        label: "Fast Care Premium",
        component: () => <Beneficiarieslist showNewFamilyMemberForm={showNewFamilyMemberForm} setShowNewFamilyMemberForm={setShowNewFamilyMemberForm} />
    },
    {
        label: "Fast Care Starter",
        component: () => <Beneficiarieslist showNewFamilyMemberForm={showNewFamilyMemberForm} setShowNewFamilyMemberForm={setShowNewFamilyMemberForm} />
    },
    {
        label: "Fast Care Basic",
        component: () => <Beneficiarieslist showNewFamilyMemberForm={showNewFamilyMemberForm} setShowNewFamilyMemberForm={setShowNewFamilyMemberForm} />
    }

    ]

    return (
        <div>
            <Sidemodal className={`${showNewFamilyMemberForm && '!opacity-50'}`} size='xl' open={showSubcriptionPackages} closeModal={() => setShowSubcriptionPackages(false)} title='Family Name Subscribed Packages'>
                <Simplestepper options={{ scrollable: { enable: true, offset: 0, scrollableElement: "#side-modal-scroller .simplebar-content-wrapper" } }} steps={steps} />
            </Sidemodal>
            <Modal size='lg' open={showNewFamilyMemberForm} closeModal={() => setShowNewFamilyMemberForm(false)} title='Add Family Members'>
                <Newfamilymemberforms />
            </Modal>
            <DataTable
                dataSourceUrl="/familypackagemembers"
                onAction={() => setShowNewFamilyMemberForm(true)}
                filterable="family"
                filterablePlaceholder='Search by family subscribers'
                columns={columns}
                hasAction={false}
            />
        </div>
    )
}

export default familyplanmemberstable