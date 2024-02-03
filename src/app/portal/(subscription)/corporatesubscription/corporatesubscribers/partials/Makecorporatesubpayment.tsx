import React, { useEffect } from 'react'
import { CorporatePackageDTO, corporateBeneficiaryDTO, corporateSubscriberDTO } from 'app/app/types/entitiesDTO'
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
import { SlideUpAndDownAnimation, PaymentmethodCard, AvailablePaymentMethods } from '../../../individual-group-subscription/partials/Makeindividualsubscriptionpayment';


function MakeCorporatesubpayment(props: IFormWithDataProps<corporateSubscriberDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, processing, errors, setValidation, post, patch } = useForm<Partial<CorporatePackageDTO>>({
        corporateId: formData?.id,
    })

    setValidation({
        paymentMode: z.string().min(1, "This Field is Required"),
        momoNetwork: data.paymentMode == "MOMO" ? z.string().min(1, "This Field is Required") : z.string().optional(),
        momoNumber: data.paymentMode == "MOMO" ? z.string().min(1, "This Field is Required") : z.string().optional(),
        chequeNumber: data.paymentMode == "Cheque" ? z.string().min(1, "This Field is Required") : z.string().optional(),
        bank: data.paymentMode == "Standing Order" ? z.string().min(1, "This Field is Required") : z.string().optional(),
        discount: z.number().optional(),
        amountToDebit: z.number().min(1, "Failed to Debit"),
        accountNumber: data.paymentMode == "Standing Order" ? z.string().min(1, "This Field is Required") : z.string().optional(),
        frequency: z.string().min(1, "This Field is Required"),
        CAGDStaffID: data.paymentMode == "CAGD" ? z.string().min(1, "This Field is Required") : z.string().optional(),
    })

    useEffect(() => {
        console.log(data)
    }, [data])

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

    useEffect(() => {
        if (formData?.corporatePackage) {
            setData({ ...formData.corporatePackage })
        }
        setOriginalAmoutToDebit()
    }, [formData])

    const handleFormSubmission = () => {
        if (formData?.corporatePackage) {
            patch(`/corporate-subscribers/package/${formData?.corporatePackage?.id}`, { onSuccess: () => { { toastnotify("Payment Subscription Update", "Success"); onNewDataSucess() } } })
        } else {
            post("/corporate-subscribers/package", { onSuccess: () => { toastnotify("Payment Subscription Updated", "Success"); onNewDataSucess() } })
        }
    }


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
                        <nav className=' text-xs'>You are about add a subscription to the above Corpoation</nav>
                    </nav>
                    <nav className='my-2 grid grid-cols-1 gap-5 w-full pt-4'>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Beneficiaries/Corporate Members :
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
                                <Input required
                                    value={data.momoNumber}
                                    onChange={(e) => setData('momoNumber', e.target.value)}
                                    error={errors?.momoNumber}
                                    label='MoMo Number'
                                    placeholder='(00) (0000) (0000)' />
                            </motion.nav>
                        }

                        {
                            data.paymentMode == "Standing Order" &&
                            <motion.nav
                                variants={SlideUpAndDownAnimation}
                                initial='initial'
                                animate='animate'
                                exit='exit' className=' flex flex-col gap-3'>
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
                        <Button onClick={() => handleFormSubmission()} variant='primary' size='full'>
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

export default MakeCorporatesubpayment