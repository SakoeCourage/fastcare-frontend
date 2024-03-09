"use client"
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaymentConfirmationType } from '../paymentconfirmationtypedef'
import { premiumPaymentConfirmationDataDTO, staffDTO } from 'app/app/types/entitiesDTO'
import DataTable from 'app/app/components/datatable/datatable'
import { dateReformat, formatcurrency } from 'app/app/lib/utils'
import { SystemDialog, DialogService } from 'app/app/providers/Dailogueserviceprovider'
import Api from 'app/app/fetch/axiosInstance'
import { resetTableData } from 'app/app/components/datatable/datatable'
import Moretableoptions from 'app/app/components/datatable/moretableoptions'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { AxiosResponse } from 'axios'

export function Statusindicator({ status }: { status: "Paid" | "Unpaid" }): React.JSX.Element {
    return <nav>
        {status == "Paid" ? <nav className=" flex gap-1 whitespace-nowrap text-green-500 px-2 py-1 rounded-md  w-max  min-w-28 "> <span className="inline-block h-1 w-1 my-auto aspect-square rounded-full bg-green-500"></span> Confirmed</nav> :
            <nav className=" flex gap-1 whitespace-nowrap text-red-500 px-2 py-1 rounded-md  w-max  min-w-28 "> <span className="inline-block h-1 w-1 my-auto aspect-square rounded-full bg-red-500"></span>Not Confirmed</nav>
        }
    </nav>
}
const getSaleExcecutives = async (): Promise<staffDTO[] | null> => {
    try {
        const getStaffsResponse: AxiosResponse<IPaginatedData<staffDTO>> = await Api.get("/staff");
        if (getStaffsResponse && getStaffsResponse.data) {
            console.log(getStaffsResponse.data)
            return Promise.resolve(getStaffsResponse.data.data);
        } else {
            return null;
        }
    } catch (error) {
        toastnotify("Failed to fetch Sale Excecutives");
        return null;
    }
};

function Paymentconfirmationtable() {
    const { setDialogData } = DialogService()
    const [saleExecutive, setSaleExecutives] = useState<staffDTO[] | null>(null)

    const handleOnTogglePaymentConfirmation = (param: premiumPaymentConfirmationDataDTO) => {
        setDialogData({
            open: true,
            title: "Confirm Payment",
            promptText: <nav className='text-center'>
                <b>{param.subscriberName}</b>
                <br />
                <br />
                <nav>Payment Amount</nav>
                <b className='text-xs font-semibold text-gray-700'>{formatcurrency(param.amount)}</b>
                <br />
                <br />
                <nav>Payment Reference Code</nav>
                <b className='text-xs font-semibold text-gray-500'>{param.paymentReferenceCode}</b>
            </nav>,
            okText: "Confirm",
            cancelText: "Decline"
        })
            .onDialogConfirm(async () => {
                if (param?.id == null) return
                try {
                    const paymentConfirmationResponse = await Api.patch('/payments/confirm-payment/' + param.id)
                    if (paymentConfirmationResponse) {
                        toastnotify("Payment Confirmed", 'Success')
                        resetTableData()
                    }
                } catch (error) {
                    toastnotify("Failed to confirmed payment")

                }
            })
            .onDialogDecline(() => {

            })
    }

    const columns: ColumnDef<premiumPaymentConfirmationDataDTO>[] = [
        {
            accessorKey: "dateOfPayment",
            header: "Date Of Payment",
            cell: ({ row }) => dateReformat(row.original.dateOfPayment)
        },
        {
            accessorKey: "subscriberDbId",
            header: "Subscriber ID",
            cell: ({ row }) => row.original.subscriberDbId ?? <nav className=' text-center'>...</nav>
        },
        {
            accessorKey: "subscriberType",
            header: "Subcriber Type"
        },
        {
            accessorKey: "subscriberName",
            header: "Subscriber"
        },
        {
            accessorKey: "paymentMode",
            header: "Mode Of Payment",

        },
        {
            accessorKey: "amount",
            header: "Amount (GHS)",

        },
        {
            accessorKey: "paymentStatus",
            header: "Status",
            cell: ({ row }) => <Statusindicator status={row.original.confirmed ? "Paid" : "Unpaid"} />
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => row.original.confirmed
                ?
                "No Action Required"
                :
                <Moretableoptions
                    options={[
                        {
                            optionName: "Confirm Payment",
                            theme: "success",
                            onOptionSelected: () => {
                                handleOnTogglePaymentConfirmation(row.original)
                            },
                            icon: "line-md:circle-to-confirm-circle-transition"
                        }
                    ]}
                />
        },

    ]

    useEffect(() => {
        getSaleExcecutives().then(res => {
            setSaleExecutives(res)
        })
    }, [])

    return (
        <div>
            <DataTable
                // onAction={() => setShowForm(true)}
                columns={columns}
                hasAction={false}
                filterable="subscriberName"
                filterablePlaceholder='Search Payment Subscriber Name'
                dataSourceUrl='/payments/?pageSize=10&page=1&sort=id_desc'
                extendedFilter={{
                    enable: true,
                    filters: [
                        {
                            filterType: "SelectFilter",
                            accessor: "agentId",
                            args: {
                                options: saleExecutive ? saleExecutive?.map((e) => { return ({ key: `${e.firstName} ${e.lastName}`, value: e.id.toString() }) }) : [],
                                placeholder: "Sales Executives"
                            }
                        },
                        {
                            filterType: "SelectFilter",
                            accessor: "confirmed",
                            args: {
                                options: [
                                    { key: "Confirmed", value: "true" },
                                    { key: "Not Confirmed", value: "false" }
                                ],
                                placeholder: "Payment Confirmation"
                            }
                        }
                    ]
                }}
            />
        </div>
    )
}

export default Paymentconfirmationtable