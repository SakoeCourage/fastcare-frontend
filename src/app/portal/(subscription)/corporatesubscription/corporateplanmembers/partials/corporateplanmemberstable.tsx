"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import { ICorporatePlanMembersDTO } from '../corporateplanmemberstypedef'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import Tooltip from 'app/app/components/ui/tooltip'
import Newcorporatememberforms from './newcorporatememberforms'
import Modal from 'app/app/components/ui/modal'
import Sidemodal from 'app/app/components/ui/sidemodal'
import Simplestepper from './stepper/simplestepper'
import { Step } from './stepper/steppertypes'
import Beneficiarieslist from './beneficiarieslist'
import Csvfileupload from './csvfileupload'


function Corporateplanmemberstable() {
    const [showNewFamilyMemberForm, setShowNewFamilyMemberForm] = useState<boolean>(false)
    const [showSubcriptionPackages, setShowSubcriptionPackages] = useState<boolean>(false)
    const [showFileUploadModal, setShowFileUploadModal] = useState<boolean>(false)

    const columns: ColumnDef<ICorporatePlanMembersDTO>[] = [
        {
            accessorKey: "family",
            header: "Corporate Subcribers",
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
        component: () => <Beneficiarieslist setShowFileUploadModal={setShowFileUploadModal} showNewCorporateMemberForm={showNewFamilyMemberForm} setShowNewCorporateMemberForm={setShowNewFamilyMemberForm} />
    },
    {
        label: "Fast Care Starter",
        component: () => <Beneficiarieslist setShowFileUploadModal={setShowFileUploadModal} showNewCorporateMemberForm={showNewFamilyMemberForm} setShowNewCorporateMemberForm={setShowNewFamilyMemberForm} />
    },
    {
        label: "Fast Care Basic",
        component: () => <Beneficiarieslist setShowFileUploadModal={setShowFileUploadModal} showNewCorporateMemberForm={showNewFamilyMemberForm} setShowNewCorporateMemberForm={setShowNewFamilyMemberForm} />
    }

    ]

    return (
        <div>
            <Sidemodal className={`${(showNewFamilyMemberForm || showFileUploadModal) && '!opacity-50'}`} size='xl' open={showSubcriptionPackages} closeModal={() => setShowSubcriptionPackages(false)} title='Family Name Subscribed Packages'>
                <Simplestepper options={{ scrollable: { enable: true, offset: 0, scrollableElement: "#side-modal-scroller .simplebar-content-wrapper" } }} steps={steps} />
            </Sidemodal>
            <Modal size='lg' open={showNewFamilyMemberForm} closeModal={() => setShowNewFamilyMemberForm(false)} title='Add Corporate Members'>
                <Newcorporatememberforms />
            </Modal>
            <Modal size='lg' open={showFileUploadModal} closeModal={() => setShowFileUploadModal(false)} title='Upload Corporate Members'>
                <Csvfileupload />
            </Modal>
            <DataTable
                dataSourceUrl="/familypackagemembers"
                filterable="family"
                filterablePlaceholder='Search by Corporate Name'
                hasAction={false}
                columns={columns}
            />
        </div>
    )
}

export default Corporateplanmemberstable