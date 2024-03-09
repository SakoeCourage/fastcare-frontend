import React, { useEffect } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import { PremiumPaymentSubscriberDTO, bankDTO } from 'app/app/types/entitiesDTO'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'
import useForm from 'app/app/hooks/formHook/useForm'
import { motion } from 'framer-motion'
import z from 'zod';
import { AvailablePaymentMethods, PaymentmethodCard, SlideUpAndDownAnimation } from 'app/app/portal/(subscription)/individual-group-subscription/partials/Makeindividualsubscriptionpayment'
import { formatcurrency } from 'app/app/lib/utils'
import ContactInput from 'app/app/components/form-components/contactinput'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'

function Premiumpaymentform(props: IFormWithDataProps<PremiumPaymentSubscriberDTO> & Partial<ISelectData>) {
    const [banks, setBanks] = React.useState<IPaginatedData<bankDTO> | null>(null)

    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, errors, setValidation, post, patch, processing } = useForm<Partial<PremiumPaymentSubscriberDTO>>({
        dbId: formData?.id,
        discount: 0,
        paymentMode: null,
        momoNumber: "",
        amount: null,
        momoNetwork: null,
        bank: null,
        accountNumber: "",
        chequeNumber: "",
        CAGDStaffID: "",
        narration: ""
    })

    setValidation({
        paymentMode: z.string().min(1, "This Field is Required"),
        narration: z.string().min(1, "This Field is Required"),
        momoNetwork: data.paymentMode == "MOMO" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        momoNumber: data.paymentMode == "MOMO" ? z
            .string()
            .regex(/^233(?!0)\d+$/, "Invalid Phone Number")
            .min(12, "Invalid Phone Number")
            .max(12, "Invalid Phone Number")
        : z.string().optional().nullable(),
        chequeNumber: data.paymentMode == "Cheque" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        bank: ["Cheque", "Standing Order"].includes(data.paymentMode) ? z.number().min(1, "This Field is Required") : z.number().optional().nullable(),
        discount: z.number().min(0, "This Field is Requred"),
        accountNumber: ["Standing Order"].includes(data.paymentMode) ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        amount: z.string().min(1, "Failed to Debit"),
        CAGDStaffID: data.paymentMode == "CAGD" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
    })




    const handleFormSubmission = () => {
        post('/payments/premium-payment', {
            onSuccess: (e) => {
                toastnotify("Premium Payment Made", "Success");
                onCancel();
            }
        })
    }

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
                        {AvailablePaymentMethods.filter(pm=>!["CAGD","Standing Order"].includes(pm.name)).map((method, i) => <PaymentmethodCard
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
                        <nav className=' text-xs'>You are about to make payment the above subscriber</nav>
                    </nav>
                    <nav className='my-2 grid grid-cols-1 gap-5 w-full pt-4'>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Membership Type :
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {formData?.subscriberType}
                            </nav>
                        </nav>
                        <nav className="flex items-center justify-between">
                            <nav className=' text-sm text-gray-600'>
                                Amount To Debit:
                            </nav>
                            <nav className='font-semibold text-gray-600'>
                                {data?.amount ? formatcurrency(data?.amount) : "..."}
                            </nav>
                        </nav>
                    </nav>

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
                        <Input
                            error={errors.amount}
                            value={data.amount}
                            label='Amount'
                            onChange={(e) => setData('amount', e.target.value)}
                            placeholder='00.00'
                        />

                        <Textarea
                            error={errors?.narration}
                            value={data.narration}
                            onChange={(e) => setData('narration', e.target.value)}
                            label='Narration'
                            placeholder='Enter Narration' />
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

export default Premiumpaymentform