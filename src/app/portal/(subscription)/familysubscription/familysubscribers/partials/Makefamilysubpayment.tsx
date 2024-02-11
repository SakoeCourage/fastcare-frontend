import React, { useEffect } from 'react'
import { familySubsciberDTO, familyPackageDTO, bankDTO } from 'app/app/types/entitiesDTO'
import Image from 'next/image';
import Selectoption from 'app/app/components/form-components/selectoption';
import { Input } from 'app/app/components/form-components/input';
import useForm from 'app/app/hooks/formHook/useForm';
import { Button } from 'app/app/components/form-components/button';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { formatcurrency } from 'app/app/lib/utils';
import { toastnotify } from 'app/app/providers/Toastserviceprovider';
import { AxiosResponse } from 'axios';
import Api from 'app/app/fetch/axiosInstance';
import ContactInput from 'app/app/components/form-components/contactinput';
import { ISelectData } from 'app/app/fetch/getselectfieldsdata';

export const SlideUpAndDownAnimation = {
    initial: { opacity: 0, translateY: "10px" },
    animate: {
        opacity: 1,
        translateY: "0",
        transition: {
            type: 'spring',
            mass: 0.1,
            damping: 8
        }
    },
    exit: { opacity: 0, translateY: "10px", transition: { duration: 0.5 } }
};

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

    return <nav onClick={() => onChange(param)} className={classNames({
        "flex items-start  cursor-pointer p-2 gap-1 border transition-all duration-500 rounded-md": true,
        "border-gray-400/60 hover:bg-blue-50  text-gray-700": isActive == false,
        "border-blue-400 bg-blue-100 text-blue-700 ring-2 ring-offset-1 ring-blue-500": isActive == true
    })}>
        <nav className=' basis-5 py-1 flex  justify-center'>
            <input checked={isActive} type="radio" />
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



function Makefamilysubpayment(props: IFormWithDataProps<familySubsciberDTO> & Partial<ISelectData>) {
    const [banks, setBanks] = React.useState<IPaginatedData<bankDTO> | null>(null)

    const { formData, onCancel, onNewDataSucess, processing } = props
    const { data, setData, errors, setValidation, post, patch } = useForm<Partial<familyPackageDTO>>({
        familyId: formData?.id,
    })

    setValidation({
        paymentMode: z.string().min(1, "This Field is Required"),
        momoNetwork: data.paymentMode == "MOMO" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        momoNumber: data.paymentMode == "MOMO" ? z.string().min(12, "This Field is Required") : z.string().optional().nullable(),
        chequeNumber: data.paymentMode == "Cheque" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        bank: ["Cheque", "Standing Order"].includes(data.paymentMode) ? z.number().min(1, "This Field is Required") : z.number().optional().nullable(),
        discount: z.number().min(0, "This Field is Requred"),
        accountNumber: ["Standing Order"].includes(data.paymentMode) ? z.string().min(1, "This Field is Required") : z.string().optional(),
        amountToDebit: z.number().min(1, "Failed to Debit"),
        frequency: z.string().min(1, "This Field is Required"),
        CAGDStaffID: data.paymentMode == "CAGD" ? z.string().min(1, "This Field is Required") : z.string().optional(),
    })


    useEffect(() => {
        if (data.discount == 0) setOriginalAmoutToDebit()
        if (data.discount > 0) {
            const amount = data.amountToDebit - (data.amountToDebit * (data.discount / 100))
            setData("amountToDebit", amount)
        }
    }, [data.discount])

    const setOriginalAmoutToDebit = () => {
        if (!formData?.beneficiaries) return
        if (formData?.beneficiaries?.length > 0) {
            const debitAmount = formData.beneficiaries.reduce((totalAmount, beneficiary) => {
                const { package: pck } = beneficiary;
                return pck ? totalAmount + pck.amount : totalAmount;
            }, 0);
            setData("amountToDebit", debitAmount)
        }
    }


    const handleFormSubmission = () => {
        if (formData?.familyPackage) {
            patch(`/family-subscribers/package/${formData?.familyPackage?.id}`, { onSuccess: () => { { toastnotify("Payment Subscription Updated", "Success"); onNewDataSucess() } } })
        } else {
            post("/family-subscribers/package", { onSuccess: () => { toastnotify("Payment Subscription Added", "Success"); onNewDataSucess() } })
        }
    }

    useEffect(() => {
        if (formData?.familyPackage) {
            setData({ ...formData.familyPackage })
        }
        if (formData?.familyPackage && formData?.familyPackage.bank) {
            if (typeof formData?.familyPackage.bank == 'object') {
                setData('bank', formData?.familyPackage.bank.id)
            }
        }
        setOriginalAmoutToDebit()
        console.log(formData)
    }, [formData])

    
    useEffect(() => {
        setBanks(props.banks)
    }, [props.banks])



    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] '>
            <div className='w-full h-full mx-auto max-w-md'>
                <div className=' py-2 lg:py-6 px-5  w-full lg:sticky lg:top-0'>
                    <nav className='mb-2 text-gray-600 font-medium'>
                        Select Payment Method
                    </nav>
                    <div className='grid grid-cols-1 gap-2'>
                        {AvailablePaymentMethods.map((method, i) => <PaymentmethodCard
                            key={i}
                            isActive={(method.accessor == "MOMO") ? data.momoNetwork == method.value : data.paymentMode == method.accessor}
                            onChange={(v) => {
                                if (v.accessor == "MOMO") {
                                    setData(
                                        {
                                            ...data,
                                            momoNetwork: v.value,
                                            paymentMode: "MOMO"
                                        }
                                    )
                                } else {
                                    setData(
                                        {
                                            ...data,
                                            paymentMode: v?.accessor,
                                            momoNetwork: ""
                                        })
                                }
                            }}
                            {...method} />)}
                    </div>
                </div>
            </div>
            <div className='bg-gray-100/90 w-full flex flex-col items-start  h-full   px-5'>
                <div className='  pt-2 px-5  mx-auto max-w-md w-full'>
                    <nav className=' py-4 pb-4 flex flex-col gap-1 border-b border-gray-300 w-full'>
                        <nav className=' font-semibold text-gray-600 '>{formData?.name}</nav>
                        <nav className=' text-xs'>You are about add a subscription to the above family</nav>
                    </nav>
                    <nav className='my-2 grid grid-cols-1 gap-5 w-full pt-4'>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Beneficiaries/Family Members :
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {formData?.beneficiaries?.length ?? 0}
                            </nav>
                        </nav>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Amount To Debit:
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {data.amountToDebit ? formatcurrency(data.amountToDebit) : "..."}
                            </nav>
                        </nav>
                    </nav>
                    <nav className=' py-4 border-b border-gray-300 text-xs'>Subscription will renew automatically at the end of the selected frequency</nav>

                    {
                        data.paymentMode != "Cash" &&
                        <nav className='mt-4 my-2 text-gray-600 font-medium'>
                            Provide Payment Info
                        </nav>
                    }


                    <nav className='flex flex-col gap-3'>

                        {
                            data.paymentMode == "MOMO" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <ContactInput
                                    required
                                    value={data.momoNumber}
                                    onChange={(v) => setData('momoNumber', v)}
                                    error={errors?.momoNumber}
                                    label='MoMo Number'
                                    placeholder='(00) (0000) (0000)'
                                />
                            </motion.nav>
                        }

                        {(["Cheque", "Standing Order"].includes(data.paymentMode)) &&
                            <Selectoption required
                                value={data.bank}
                                onValueChange={(v) => setData('bank', v)}
                                error={errors?.bank}
                                options={banks ? [...Object.entries(banks.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []}
                                label='Bank'
                                placeholder='Select Bank' />
                        }

                        {
                            data.paymentMode == "Standing Order" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={data.accountNumber}
                                    onChange={(e) => setData('accountNumber', e.target.value)}
                                    error={errors?.accountNumber}
                                    label='Account Number'
                                    placeholder='xxxxxxxxxxxxxxxxxxx' />
                            </motion.nav>
                        }

                        {data.paymentMode == "CAGD" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={data.CAGDStaffID}
                                    onChange={(e) => setData('CAGDStaffID', e.target.value)}
                                    error={errors?.CAGDStaffID}
                                    label='CADG Staff Number' placeholder='xxxxxxxxxxxxxxxxxxx' />
                            </motion.nav>
                        }

                        {
                            data.paymentMode == "Cheque" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={data.chequeNumber}
                                    onChange={(e) => setData('chequeNumber', e.target.value)}
                                    error={errors?.chequeNumber}
                                    label='Cheque Number'
                                    placeholder='xxxxxxxxxxxxxxxxxxx' />
                            </motion.nav>
                        }

                    </nav>
                    <nav className=' flex flex-col gap-3 pt-3 w-full'>
                        <Selectoption
                            error={errors?.discount}
                            value={data.discount}
                            onValueChange={(v) => setData('discount', v)}
                            required
                            label='Discount'
                            placeholder='Select Discount (%)'
                            options={[
                                { key: "0%", value: 0 },
                                { key: "5%", value: 5 },
                                { key: "10%", value: 10 },
                                { key: "15%", value: 15 },
                                { key: "20%", value: 20 },
                                { key: "25%", value: 25 },
                            ]} />
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
                    <nav className='flex items-center justify-end flex-col gap-1 w-full mt-4 pb-2'>
                        <Button processing={processing} onClick={() => handleFormSubmission()} variant='primary' size='full'>
                            Save & Make Payment
                        </Button>
                        <Button onClick={() => onCancel()} className=' !bg-white' variant='outline' size='full'>
                            Cancel
                        </Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Makefamilysubpayment