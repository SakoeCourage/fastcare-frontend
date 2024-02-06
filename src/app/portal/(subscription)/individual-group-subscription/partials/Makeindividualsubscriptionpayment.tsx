import React, { useEffect, useMemo } from 'react'
import { IndividualSubDTO, groupDTO, facilityDTO, packageDTO, bankDTO } from 'app/app/types/entitiesDTO'
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
import type { data, errors, setData } from 'app/app/hooks/formHook/useFormtypes';

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

export interface IAvailablePaymentMethod {
    name: string,
    accessor: string,
    value: string,
    hints: string,
    icon: string
}

export const AvailablePaymentMethods: Array<IAvailablePaymentMethod> = [
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

export function PaymentmethodCard(param: IAvailablePaymentMethod & {
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



interface IFamilypaymentprops {
    setData: setData<IndividualSubDTO>,
    formData: data<IndividualSubDTO>,
    errors: errors<IndividualSubDTO>,
    packages: IPaginatedData<packageDTO> | null,
    banks: IPaginatedData<bankDTO> | null,
    facilities: IPaginatedData<facilityDTO> | null,
    canDelete: boolean,
    onSubmit: () => void,
    onCancel: () => void
    onDelete: () => void
}

function Makeindividualsubscriptionpayment(props: IFamilypaymentprops) {
    const { formData, setData, errors, packages, banks, facilities, canDelete, onDelete, onSubmit, onCancel } = props


    const calculateAmountToDebit = () => {
        if (formData.package == null && packages == null) return
        const pkg = packages?.data?.find(p => p.id == formData.package);
        if (pkg) {
            const { amount } = pkg;
            if (formData.discount == 0 || [undefined, null].includes(formData.discount)) {
                return amount
            }
            if (formData.discount > 0) {
                const _amount = amount - (amount * (formData.discount / 100))
                return _amount
            }
        }
    }

    const getAmountToDebit = useMemo(() => {
        let amount: any = 0;
        if (formData.package && packages) {
            amount = calculateAmountToDebit()
        }
        return amount
    }, [formData.discount, formData.package, packages])

    useEffect(() => {
        if (formData?.bank) {
            if (typeof formData?.bank == 'object') {
                setData('bank', formData?.bank?.id)
            }
        }
    }, [formData])




    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] '>
            <div className='w-full h-full mx-auto max-w-md'>
                <div className=' py-2 lg:py-6 px-5  w-full lg:sticky lg:top-5 '>
                    <nav className='mb-2 text-gray-600 font-medium'>
                        Select Payment Method
                    </nav>
                    <div className='grid grid-cols-1 gap-2'>
                        {AvailablePaymentMethods.map((method, i) => <PaymentmethodCard
                            key={i}
                            isActive={(method.accessor == "MOMO") ? formData.momoNetwork == method.value : formData.paymentMode == method.accessor}
                            onChange={(v) => {
                                if (v.accessor == "MOMO") {
                                    setData(
                                        {
                                            ...formData,
                                            momoNetwork: v.value,
                                            paymentMode: "MOMO"
                                        }
                                    )
                                } else {
                                    setData(
                                        {
                                            ...formData,
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
                        <nav className=' font-semibold text-gray-600 '>{formData?.firstName ?? "..."}</nav>
                        <nav className=' text-xs'>You are about add a subscription to the above individual/group</nav>
                    </nav>
                    <nav className='my-2 grid grid-cols-1 gap-5 w-full pt-4'>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Beneficiary:
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {formData?.firstName ?? "..."}
                            </nav>
                        </nav>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Amount To Debit:
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {formData.package ? formatcurrency(getAmountToDebit ?? 0) : "..."}
                            </nav>

                        </nav>
                    </nav>
                    <nav className=' py-4 border-b border-gray-300 text-xs'>Subscription will renew automatically at the end of the selected frequency</nav>

                    {
                        formData.paymentMode != "Cash" &&
                        <nav className='mt-4 my-2 text-gray-600 font-medium'>
                            Provide Payment Info
                        </nav>
                    }


                    <nav className='flex flex-col gap-3'>
                        <Selectoption
                            error={errors?.package}
                            value={formData.package}
                            onValueChange={(v) => setData('package', v)}
                            required
                            label='Package'
                            placeholder='Select Package'
                            options={packages ? [...Object.entries(packages.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />

                        {
                            formData.paymentMode == "MOMO" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={formData.momoNumber}
                                    onChange={(e) => setData('momoNumber', e.target.value)}
                                    error={errors?.momoNumber}
                                    label='MoMo Number'
                                    placeholder='(00) (0000) (0000)' />
                            </motion.nav>
                        }
                        {(["Cheque", "Standing Order"].includes(formData.paymentMode)) &&
                            <Selectoption required
                                value={formData.bank}
                                onValueChange={(v) => setData('bank', v)}
                                error={errors?.bank}
                                label='Bank'
                                options={banks ? [...Object.entries(banks.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []}
                                placeholder='Select Bank' />
                        }
                        {
                            formData.paymentMode == "Standing Order" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>

                                <Input required
                                    value={formData.accountNumber}
                                    onChange={(e) => setData('accountNumber', e.target.value)}
                                    error={errors?.accountNumber}
                                    label='Account Number'
                                    placeholder='xxxxxxxxxxxxxxxxxxx' />
                            </motion.nav>
                        }

                        {formData.paymentMode == "CAGD" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={formData.CAGDStaffID}
                                    onChange={(e) => setData('CAGDStaffID', e.target.value)}
                                    error={errors?.CAGDStaffID}
                                    label='CADG Staff Number' placeholder='xxxxxxxxxxxxxxxxxxx' />
                            </motion.nav>
                        }

                        {
                            formData.paymentMode == "Cheque" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
                                <Input required
                                    value={formData.chequeNumber}
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
                            value={formData.discount}
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
                            value={formData.frequency}
                            onValueChange={(v) => setData('frequency', v)}
                            error={errors?.frequency}
                            label='Frequency' placeholder='Select Frequency' />

                        <Selectoption
                            value={formData.facility}
                            error={errors?.facility}
                            onValueChange={(v) => setData('facility', v)}
                            label='Facility'
                            placeholder='Select Facility'
                            options={facilities ? [...Object.entries(facilities.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                    </nav>
                    <nav className='flex items-center justify-end flex-col gap-1 w-full mt-4 pb-2'>
                        <Button onClick={() => onSubmit()} variant='primary' size='full'>
                            Save & Make Payment
                        </Button>
                        <Button onClick={() => onCancel()} variant='outline' size='full'>
                            Cancel
                        </Button>
                        {canDelete && <Button onClick={() => onDelete()} variant="danger" size='full'>
                            Pause Subscription
                        </Button>}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Makeindividualsubscriptionpayment