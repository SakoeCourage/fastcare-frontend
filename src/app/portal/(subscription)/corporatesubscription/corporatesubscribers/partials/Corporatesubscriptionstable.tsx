"use client"
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from 'app/app/components/datatable/datatable'
import Modal from 'app/app/components/ui/modal'
import NewCorpoarateclientform from './Newcorporateclientform'
import { corporateBeneficiaryDTO, corporateSubscriberDTO } from 'app/app/types/entitiesDTO'
import { dateReformat } from 'app/app/lib/utils'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import Api from 'app/app/fetch/axiosInstance'
import { initialFormStateProp } from '../../../individual-group-subscription/partials/Individualandgroupsubtable'
import { AxiosResponse } from 'axios'
import { resetTableData } from 'app/app/components/datatable/datatable'
import Tooltip from 'app/app/components/ui/tooltip'
import Sidemodal from 'app/app/components/ui/sidemodal'
import Corporatebeneficiarieslist from './Corporatebeneficiarieslist'
import Corporatebeneficiaryform from './Corporatebeneficiaryfom'
import MakeCorporatesubpayment from './Makecorporatesubpayment'


function Corporatesubscriptionstable() {
    const abortController = new AbortController();
    const { signal } = abortController;
    const [showNewCorporateClientForm, setShowNewCorporateClientForm] = useState(initialFormStateProp)
    const [coporateSubscriberData, setCoporateSubscriberData] = useState<corporateSubscriberDTO | null>(null)
    const [showCorporateBeneficiaryList, setShowCorporateBeneficiaryList] = useState<corporateSubscriberDTO | null>(null)
    const [currentBeneficiary, setcurrentBeneficiary] = useState<corporateBeneficiaryDTO | null>(null)
    const [showBeneficiaryForm, setShowBeneficiaryForm] = useState<boolean>(false)
    const [showPaymentForm, setShowPaymentForm] = useState<corporateSubscriberDTO | null>(null)

    const columns: ColumnDef<corporateSubscriberDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "corporateMembershipID",
            header: "MID"
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "contact",
            header: "Contact"
        },
        {
            accessorKey: "",
            header: "Beneficiaries",
            cell: ({ row }) => <nav onClick={() => setShowCorporateBeneficiaryList(row.original as corporateSubscriberDTO)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 px-2 bg-white border text-blue-600 border-blue-400 items-center text-xs'>
                    <nav><span className='!text-xs'>{row.original.beneficiaries?.length}</span> View</nav>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </nav>
        },
        {
            accessorKey: "",
            header: "Payment",
            cell: ({ row }) => <nav onClick={() => setShowPaymentForm(row.original as corporateSubscriberDTO)} role="navigation" className=' whitespace-nowrap  flex items-center gap-1 cursor-pointer'>
                <nav className=' whitespace-nowrap flex rounded-full p-1 px-2 bg-white border text-blue-600 border-blue-400 items-center text-xs'>
                    <nav>Make Payment</nav>
                    <IconifyIcon fontSize="1.1rem" className=' whitespace-nowrap bg-transparent !p-0 !w-[1rem] !h-[1rem]' icon='material-symbols:chevron-right' />
                </nav>
            </nav>
        },
        {
            accessorKey: "",
            header: "Actions",
            cell: ({ row }) => <Tooltip toolTipText='Edit'>
                <IconifyIcon onClick={() => {
                    setCoporateSubscriberData(row.original)
                    setShowNewCorporateClientForm({
                        title: `UPDATE - ${row.original.corporateMembershipID} ${row.original.name}`.toUpperCase(),
                        open: true
                    })
                }} className='bg-transparent cursor-pointer' icon='basil:edit-alt-solid' />
            </Tooltip>

        },

    ]


    const fetchCoporateData = () => {
        if (showCorporateBeneficiaryList?.id == null) return
        Api.get("/corporate-subscribers/" + showCorporateBeneficiaryList.id, { signal })
            .then((res: AxiosResponse<corporateSubscriberDTO>) => {
                setShowCorporateBeneficiaryList(res.data)
                resetTableData()
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleOnResetStateCorporateSubData = () => {
        setShowNewCorporateClientForm(initialFormStateProp);
        setCoporateSubscriberData(null)
    }


    return (
        <div>

            <Modal size='xl' open={showNewCorporateClientForm.open} title={coporateSubscriberData?.name ? `UPDATE - ${coporateSubscriberData.name}` : "Add Corporate Client"}
                closeModal={() => handleOnResetStateCorporateSubData()}>
                <NewCorpoarateclientform
                    formData={coporateSubscriberData}
                    onCancel={() => handleOnResetStateCorporateSubData}
                    onNewDataSucess={() => { handleOnResetStateCorporateSubData(); resetTableData(); }} />
            </Modal>

            <Sidemodal size='xl'
                open={!!showPaymentForm?.id}
                title="Make Payment"
                closeModal={() => setShowPaymentForm(null)}>
                <MakeCorporatesubpayment
                    formData={showPaymentForm}
                    onCancel={() => setShowPaymentForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowPaymentForm(null) }} />
            </Sidemodal>

            <Sidemodal className={`${showBeneficiaryForm && '!opacity-50'}`}
                size='xl' open={showCorporateBeneficiaryList != null}
                closeModal={() => { setShowCorporateBeneficiaryList(null); abortController.abort(); }}
                title={`${showCorporateBeneficiaryList ? showCorporateBeneficiaryList?.name : "Family"} Beneficiaries List`}>
                <Corporatebeneficiarieslist
                    currentBeneficiaryData={{
                        onCancel: () => { setcurrentBeneficiary(null); abortController.abort(); },
                        formData: currentBeneficiary,
                        onNewDataSucess: () => void (0)
                    }}
                    fetchCorporateData={fetchCoporateData}
                    setcurrentBeneficiary={setcurrentBeneficiary}
                    setShowBeneficiaryForm={setShowBeneficiaryForm}
                    corporateData={showCorporateBeneficiaryList!} />
            </Sidemodal>

            <Modal
                title={`${currentBeneficiary ? `Beneficiary - ${currentBeneficiary?.name}` : "Add Beneficiary"}`}
                size='lg' open={showBeneficiaryForm}
                closeModal={() => { setShowBeneficiaryForm(false); setcurrentBeneficiary(null); }}>
                <Corporatebeneficiaryform
                    corporateID={showCorporateBeneficiaryList?.id}
                    onNewDataSucess={() => {
                        setShowBeneficiaryForm(false);
                        setcurrentBeneficiary(null);
                        fetchCoporateData()
                    }}
                    onCancel={() => { setShowBeneficiaryForm(false); setcurrentBeneficiary(null); }}
                    formData={currentBeneficiary}
                />
            </Modal>

            <DataTable
                dataSourceUrl='/corporate-subscribers?pageSize=10&page=1&sort=createdAt_desc'
                onAction={() => setShowNewCorporateClientForm({ title: "Add Corporate Client", open: true })}
                filterable="name"
                columns={columns}
                actionName='Add Corporate Client'
            />
        </div>
    )
}

export default Corporatesubscriptionstable