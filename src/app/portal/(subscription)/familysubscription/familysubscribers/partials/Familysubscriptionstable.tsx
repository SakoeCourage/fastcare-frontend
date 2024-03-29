"use client"
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import Newfamilyclientform from './Newfamilyclientform'
import { familyBeneficiaryDTO, familySubsciberDTO } from 'app/app/types/entitiesDTO'
import { dateReformat } from 'app/app/lib/utils'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import Api from 'app/app/fetch/axiosInstance'
import { initialFormStateProp } from '../../../individual-group-subscription/partials/Individualandgroupsubtable'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'
import Tooltip from 'app/app/components/ui/tooltip'
import Sidemodal from 'app/app/components/ui/sidemodal'
import Familybeneficiarieslist from './Familybeneficiarieslist'
import Familybeneficiaryform from './Familybeneficiaryfom'
import Makefamilysubpayment from './Makefamilysubpayment'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'
import { getInitials } from 'app/app/lib/utils'
import Tableinitials from 'app/app/components/datatable/partials/tableinitials'

function Familysubscriptionstable(props: Partial<ISelectData>) {
    const abortController = new AbortController();
    const { signal } = abortController;
    const [showNewFamilyClientForm, setShowNewFamilyClientForm] = useState(initialFormStateProp)
    const [familySubscriberData, setFamilySubscriberData] = useState<familySubsciberDTO | null>(null)
    const [showFamilyBeneficiaryList, setShowFamilyBeneficiaryList] = useState<familySubsciberDTO | null>(null)
    const [currentBeneficiary, setcurrentBeneficiary] = useState<familyBeneficiaryDTO | null>(null)
    const [showBeneficiaryForm, setShowBeneficiaryForm] = useState<boolean>(false)
    const [showPaymentForm, setShowPaymentForm] = useState<familySubsciberDTO | null>(null)

    const columns: ColumnDef<familySubsciberDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: 'familyMembershipID',
            header: "FID"
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <Tableinitials address={row.original.contact} name={row.original.name}/>
        },
        {
            accessorKey: "",
            header: "Beneficiaries",
            cell: ({ row }) => <nav onClick={() => setShowFamilyBeneficiaryList(row.original as familySubsciberDTO)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 px-2 bg-white border text-blue-600 border-blue-400 items-center text-xs'>
                    <nav><span className='!text-xs'>{row.original.beneficiaries?.length}</span> View</nav>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </nav>
        },
        {
            accessorKey: "",
            header: "Payment",
            cell: ({ row }) => <nav onClick={() => setShowPaymentForm(row.original as familySubsciberDTO)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 px-2 bg-white border text-blue-600 border-blue-400 items-center text-xs'>
                    <nav>Make Payment</nav>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </nav>
        },
        {
            accessorKey: "",
            header: "Actions",
            cell: ({ row }) => <Tooltip toolTipText='Edit Family'>
                <IconifyIcon onClick={() => {
                    setFamilySubscriberData(row.original)
                    setShowNewFamilyClientForm({
                        title: `UPDATE - ${row.original.familyMembershipID} ${row.original.name}`.toUpperCase(),
                        open: true
                    })
                }} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
            </Tooltip>

        },

    ]



    const fetchFamilyData = () => {
        if (showFamilyBeneficiaryList?.id == null) return
        Api.get("/family-subscribers/" + showFamilyBeneficiaryList.id, { signal })
            .then((res: AxiosResponse<familySubsciberDTO>) => {
                console.log(res.data)
                setShowFamilyBeneficiaryList(res.data)
                resetTableData()
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleOnResetStateFamilySubData = () => {
        setShowNewFamilyClientForm(initialFormStateProp);
        setFamilySubscriberData(null)
    }





    return (
        <div>

            <Modal size='xl' open={showNewFamilyClientForm.open} title={familySubscriberData?.name ? `UPDATE - ${familySubscriberData.name}` : "Add Family Client"}
                closeModal={() => handleOnResetStateFamilySubData()}>
                <Newfamilyclientform
                    formData={familySubscriberData}
                    onCancel={() => handleOnResetStateFamilySubData}
                    onNewDataSucess={() => { handleOnResetStateFamilySubData(); resetTableData(); }} />
            </Modal>

            <Sidemodal size='xl'
                open={!!showPaymentForm?.id}
                title="Make Payment"
                closeModal={() => setShowPaymentForm(null)}>
                <Makefamilysubpayment
                    {...props}
                    formData={showPaymentForm}
                    onCancel={() => setShowPaymentForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowPaymentForm(null) }} />
            </Sidemodal>

            <Sidemodal className={`${showBeneficiaryForm && '!opacity-50'}`}
                size='xl' open={showFamilyBeneficiaryList != null}
                closeModal={() => { setShowFamilyBeneficiaryList(null); abortController.abort(); }}
                title={`${showFamilyBeneficiaryList ? showFamilyBeneficiaryList?.name : "Family"} Beneficiaries List`}>
                <Familybeneficiarieslist
                    currentBeneficiaryData={{
                        onCancel: () => { setcurrentBeneficiary(null); abortController.abort(); },
                        formData: currentBeneficiary,
                        onNewDataSucess: () => void (0)
                    }}
                    fetchFamilyData={fetchFamilyData}
                    setcurrentBeneficiary={setcurrentBeneficiary}
                    setShowBeneficiaryForm={setShowBeneficiaryForm}
                    familyData={showFamilyBeneficiaryList!} />
            </Sidemodal>

            <Modal
                title={`${currentBeneficiary ? `Beneficiary - ${currentBeneficiary?.name}` : "Add Beneficiary"}`}
                size='lg' open={showBeneficiaryForm}
                closeModal={() => { setShowBeneficiaryForm(false); setcurrentBeneficiary(null); }}>
                <Familybeneficiaryform
                    {...props}
                    familyId={showFamilyBeneficiaryList?.id}
                    onNewDataSucess={() => {
                        setShowBeneficiaryForm(false);
                        setcurrentBeneficiary(null);
                        fetchFamilyData()
                    }}
                    onCancel={() => { setShowBeneficiaryForm(false); setcurrentBeneficiary(null); }}
                    formData={currentBeneficiary}
                />
            </Modal>

            <DataTable
                dataSourceUrl='/family-subscribers?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewFamilyClientForm({ title: "Add Family Client", open: true })}
                filterable="name"
                filterablePlaceholder='Search Name or FID'
                columns={columns}
                actionName='Add Family Client'
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
        </div>
    )
}

export default Familysubscriptionstable