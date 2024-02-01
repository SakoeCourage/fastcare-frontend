import React, { useEffect } from 'react'
import { familySubsciberDTO, familyPackageDTO } from 'app/app/types/entitiesDTO'
import Image from 'next/image';
import Selectoption from 'app/app/components/form-components/selectoption';
import { Input } from 'app/app/components/form-components/input';
import useForm from 'app/app/hooks/formHook/useForm';
import { Button } from 'app/app/components/form-components/button';

type PaymentMods = "Cash" | "Stading Order" | "CAGD" | "MOMO" | "Cheque";

interface IAvailablePaymentMethod {
    name: string,
    accessor: string,
    value: string,
    hints: string,
    icon: string
}

const AvailablePaymentMethods: Array<IAvailablePaymentMethod> = [
    {
        name: "Cash",
        accessor: "Cash",
        value: "Cash",
        hints: "Pay with cash",
        icon: "/images/paymentmethodthumbnails/cash.png"
    },
    {
        name: "MTN MoMo",
        accessor: "MOMO",
        value: "MTN",
        hints: "Use an MTN MoMO number to process payment",
        icon: "/images/paymentmethodthumbnails/mtn.svg"
    },
    {
        name: "Vodafon Cash",
        accessor: "MOMO",
        value: "VODAFONE",
        hints: "Use a Vodafone Cash number to process payment",
        icon: "/images/paymentmethodthumbnails/vodafone.png"
    },
    {
        name: "CAGD",
        accessor: "CAGD",
        value: "CAGD",
        hints: "Use a CAD number to process payment ",
        icon: "/images/paymentmethodthumbnails/cagd.png"
    },
    {
        name: "Standing Order",
        accessor: "Standing Order",
        value: "Standing Order",
        hints: "Use a bank and bank number to process payment",
        icon: "/images/paymentmethodthumbnails/bank.png"
    },
    {
        name: "Cheque",
        accessor: "Cheque",
        value: "Cheque",
        hints: "Use a cheque number to process payment",
        icon: "/images/paymentmethodthumbnails/cheque.png"
    }

]

function PaymentmethodCard(param: IAvailablePaymentMethod & {
    onChange: (v: IAvailablePaymentMethod) => void,
    isActive: boolean
}): React.ReactNode {
    const { name, accessor, value, hints, icon, onChange, isActive } = param


    return <nav onClick={() => onChange(param)} className=' flex items-start p-2 gap-1 border border-gray-400/60 rounded-md text-gray-700 '>
        <nav className=' basis-5 py-1 flex  justify-center'>
            <input type="radio" />
        </nav>
        <nav className='flex flex-col gap-0 grow '>
            <h1 className='text-sm font-medium opacity-90'>{name}</h1>
            <p className=' text-[0.7rem]'>
                {hints}
            </p>
        </nav>
        <nav className=' basis-[2.8rem] flex items-center justify-center self-center overflow-hidden'>
            <Image className=' bg-blend-screen h-10 w-10 aspect-square rounded-full object-contain my-auto' src={icon} alt={name} width={70} height={70} quality={100} />
        </nav>
    </nav>
}



function Makefamilysubpayment(props: IFormWithDataProps<familySubsciberDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, processing, errors, setValidation, post, patch } = useForm<Partial<familyPackageDTO>>({})

    useEffect(() => {
        if (data.paymentMode === "") {

        }

    }, [data])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] '>
            <div className='h-full py-2 px-5'>
                <nav className='mb-2 text-gray-600 font-medium'>
                    Select Payment Method
                </nav>
                <div className='grid grid-cols-1 gap-2'>
                    {AvailablePaymentMethods.map((method, i) => <PaymentmethodCard
                        isActive={false}
                        onChange={(v) => {
                            console.log(v)
                        }}
                        {...method} />)}
                </div>
                <nav className='mt-4 my-2 text-gray-600 font-medium'>
                    Provide Payment Info
                </nav>
                <nav className='flex flex-col gap-3'>
                    <nav className=' flex flex-col gap-3'>
                        <Selectoption required
                            options={[]}
                            value={data.bank}
                            onValueChange={(v) => setData('bank', v)}
                            error={errors?.bank}
                            label='Bank'
                            placeholder='Select Bank' />
                        <Input required
                            value={data.accountNumber}
                            onChange={(e) => setData('accountNumber', e.target.value)}
                            error={errors?.accountNumber}
                            label='Account Number'
                            placeholder='xxxxxxxxxxxxxxxxxxx' />
                    </nav>
                    <nav className=' flex flex-col gap-3'>
                        <Input required
                            value={data.chequeNumber}
                            onChange={(e) => setData('chequeNumber', e.target.value)}
                            error={errors?.chequeNumber}
                            label='Cheque Number'
                            placeholder='xxxxxxxxxxxxxxxxxxx' />
                    </nav>
                    <nav className=' flex flex-col gap-3'>
                        <Input required
                            value={data.CAGDStaffID}
                            onChange={(e) => setData('CAGDStaffID', e.target.value)}
                            error={errors?.CAGDStaffID}
                            label='CADG Staff Number' placeholder='xxxxxxxxxxxxxxxxxxx' />
                    </nav>
                    <nav className=' flex flex-col gap-3'>
                        <Input required
                            value={data.momoNumber}
                            onChange={(e) => setData('momoNumber', e.target.value)}
                            error={errors?.momoNumber}
                            label='MoMo Number'
                            placeholder='(00) (0000) (0000)' />
                    </nav>

                </nav>
            </div>
            <div className='bg-gray-100/90 w-full flex flex-col items-start  h-full pt-2 lg:pt-5  px-5'>
                <nav className=' py-4 pb-8 flex flex-col gap-1 border-b border-gray-300 w-full'>
                    <nav className=' font-semibold text-gray-600 '>Sakoe Courage Family</nav>
                    <nav className=' text-xs'>You are about add a subscribtion to the above family</nav>
                </nav>
                <nav className='my-2 grid grid-cols-1 gap-5 w-full pt-8'>
                    <nav className="flex items-center justify-between">
                        <nav className=' text-sm text-gray-600'>
                            Beneficiaries/Family Members :
                        </nav>
                        <nav className='font-semibold text-gray-600'>
                            4
                        </nav>
                    </nav>
                    <nav className="flex items-center justify-between">
                        <nav className=' text-sm text-gray-600'>
                            Amount To Debit:
                        </nav>
                        <nav className='font-semibold text-gray-600'>
                            GHS 23.232
                        </nav>
                    </nav>
                </nav>
                <nav className=' my-4 text-xs'>Subscription will renew automatically at the end of the selected frequency</nav>
                <nav className=' flex flex-col gap-3 w-full'>
                    <Selectoption required
                        options={[
                            { key: "Daily", value: "Daily" },
                            { key: "Weekly", value: "Weekly" },
                            { key: "Monthly", value: "Monthly" }
                        ]}
                        value={data.frequency}
                        onValueChange={(v) => setData('frequency', v)}
                        error={errors?.frequency}
                        label='Frequency' placeholder='Select Frequency' />
                </nav>
                <nav className='flex items-center justify-end flex-col gap-1 w-full mt-4'>
                    <Button variant='primary' size='full'>
                        Save & Make Payment
                    </Button>
                    <Button className=' !bg-white' variant='outline' size='full'>
                        Cancel
                    </Button>
                </nav>
            </div>
        </div>
    )
}

export default Makefamilysubpayment