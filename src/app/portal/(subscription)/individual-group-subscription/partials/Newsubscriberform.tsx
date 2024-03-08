import React, { experimental_useEffectEvent, useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import Datepicker from 'app/app/components/form-components/datepicker'
import Selectoption from 'app/app/components/form-components/selectoption'
import Fileupload from 'app/app/components/ui/fileupload'
import { Button } from 'app/app/components/form-components/button'
import useForm from 'app/app/hooks/formHook/useForm'
import Api from 'app/app/fetch/axiosInstance'
import { z } from 'zod'
import { IndividualSubDTO, facilityDTO, groupDTO, packageDTO, bankDTO } from 'app/app/types/entitiesDTO'
import { AxiosResponse } from 'axios'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { DialogService } from 'app/app/providers/Dailogueserviceprovider'
import Noticecard from 'app/app/components/ui/noticecard'
import Makeindividualsubscriptionpayment from './Makeindividualsubscriptionpayment'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { isNullOrWhitespace } from 'app/app/lib/utils'
import ContactInput from 'app/app/components/form-components/contactinput'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'
import { isValidGhanaCardNumber } from 'app/app/lib/utils'

interface IFectchSubscribers extends Partial<ISelectData> {
    handleFetchSubscriberData: (id: number | string | undefined) => void
}

function Newsubscriberform({ formData: subscriber, onNewDataSucess, onCancel, handleFetchSubscriberData, ...rest }: IFormWithDataProps<IndividualSubDTO> & IFectchSubscribers) {
    const { groups, facilities, banks, packages } = { ...rest }
    const { setDialogData } = DialogService()
    const { data, setData, errors, post, patch, setValidation, processing, delete: del } = useForm<Partial<IndividualSubDTO>>(subscriber ? { ...subscriber } : {
            discount: 0,
            momoNetwork: "",
    })

    const isFile = (value: unknown): value is File => {
        return value instanceof File;
    };

    setValidation({
        idType: z.string().min(1, "This Field is Required"),
        passportPicture: z.custom((value) => isFile(value), {
            message: 'Invalid file. Please provide a valid file.',
        }),
        idNumber: data.idType =='ECOWASCard' ? z.string().regex(/^GHA-(?!-)(\d|-)*$/,"Invalid Ecowas Card Number")  : z.string().min(3, "This Filed is required"),
        firstName: z.string().min(1, "This Field is required"),
        otherNames: z.string().optional().nullable(),
        lastName: z.string().min(1, "This Field is required"),
        dateOfBirth: z.string().min(1, "This Field is required"),
        gender: z.string().min(1, "This Field is required"),
        occupation: z.string().min(1,"This Field is required"),
        maritalStatus:z.string().min(1,"This Field is required"),
        address: z.string().min(1, "This Field is required"),
        gpsAddress: z.string().min(5, "This Field is required"),
        phoneOne: z.string().min(12, "This Field is required"),
        phoneTwo: z.string().nullable().optional(),
        emergencyPerson: z.string().min(1, "This Field is required"),
        emergencyPersonPhone: z.string().min(12, "This Field is required"),
        hasNHIS: z.boolean(),
        NHISNumber: (data.hasNHIS == true) ? z.string().min(5, "This Field is required") : z.string().optional().nullable(),
        facility: z.number().min(1, "This Field is required"),
        package: z.number().min(1, "This Field is required"),
        group: z.number().min(1, "This Field is required").optional().nullable(),
        paymentMode: z.string().min(1, "This Field is Required"),
        momoNetwork: data.paymentMode == "MOMO" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        momoNumber: data.paymentMode == "MOMO" ? z.string().min(12, "This Field is Required") : z.string().optional().nullable(),
        chequeNumber: data.paymentMode == "Cheque" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        bank: ["Cheque", "Standing Order"].includes(data.paymentMode) ? z.number().min(1, "This Field is Required") : z.number().optional().nullable(),
        discount: z.number().min(0, "This Field is Requred"),
        accountNumber: ["Standing Order"].includes(data.paymentMode) ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),
        frequency: z.string().min(1, "This Field is Required"),
        CAGDStaffID: data.paymentMode == "CAGD" ? z.string().min(1, "This Field is Required") : z.string().optional().nullable(),

    })

    useEffect(() => {
        console.log(data)
    }, [data])
    

    const handleOnsucess = () => {
        if (subscriber.id) {
            toastnotify("Subscriber Updated ", "Success")

        } else {
            toastnotify("New Subscriber Added", "Success")

        }
        onNewDataSucess();
    }


    const handleFormSubmission = () => {
        if (subscriber?.id) {
            patch("/individual-subscribers/" + subscriber.id, { onSuccess: handleOnsucess, config: { asFormData: true }, onError: (err) => { console.log(err) } })
        }
        if (!subscriber?.id) {
            post("/individual-subscribers", { onSuccess: handleOnsucess, config: { asFormData: true }, onError: (err) => { console.log(err) } })
        }
    }

    const handleOnEntityDelete = () => {
        setDialogData({
            open: true,
            variant: "Warning",
            title: "Are you sure?",
            promptText: "This action will pause users subscription",
            okText: "Yes",
            cancelText: "No"
        }).onDialogConfirm(() => {
            if (subscriber?.id == null) return
            del('/individual-subscribers/' + subscriber.id,
                {
                    onSuccess: () => { toastnotify("Subsription Payment Has Been Removed", "Success"), onNewDataSucess() },
                    onError: () => toastnotify("Failed To Remove Subscription", "Error"),
                    config: {
                        validation: {
                            enable: false
                        }
                    }
                })
        }).onDialogDecline(() => { })
    }

    const checkFileValidationRule = (rule: "Size" | "AcceptType") => {
        if (isNullOrWhitespace(data.passportPicture)) return false
        if (!rule && !isFile(data.passportPicture)) return false

        if (rule == "Size") {
            if (data.passportPicture.size < 1080033) {
                return true
            }
            return false
        }

        if (rule == "AcceptType") {

            if (['image/jpeg', 'image/jpg', 'image/png'].includes(data.passportPicture.type)) {
                return true
            }
            return false
        }
    }

    useEffect(() => {
        if (subscriber?.id) {
            handleFetchSubscriberData(subscriber?.id)
        }
    }, [])


    useEffect(() => {
        if ((subscriber === null) || (typeof subscriber === undefined)) return
        const { facility: fc, package: pckg, group: gr, ...rest } = subscriber;
        console.log(subscriber)
        try {
            setData({
                ...rest, facility: fc?.id, package: pckg?.id, group: gr?.id
            })
        } catch (error) {
            console.log(error)
        }

    }, [subscriber])


 
    


    return (
        <div className=' '>
            {/* First Section Begins here */}
            <div className='  grid grid-cols-1 lg:grid-cols-2'>
                <nav className=' col-span-1 lg:col-span-2 flex items-center gap-3 py-1 px-4 bg-gray-200/30 sticky top-0 z-40 backdrop-blur-sm'>
                    <nav className=' aspect-square flex items-center text-sm justify-center h-6 w-6 rounded-full p-1 bg-gray-500/80 text-gray-50'>1</nav>
                    <nav className='font-semibold text-base text-gray-500'> Identification Documents</nav>
                </nav>
                <div className=' grid grid-cols-1 gap-5 !bg-white pb-10 h-full pt-5 px-5  border'>
                    <nav className=' grid-cols-1 grid gap-5'>
                        <Selectoption
                            value={data.idType}
                            error={errors?.idType}
                            required
                            onValueChange={(v) => setData("idType", v)}
                            label='ID Type'
                            placeholder='Select ID Type'
                            options={[
                                { key: "Passport", value: "Passport" },
                                { key: "Voter ID", value: "VoterID" },
                                { key: "ECOWAS Card", value: "ECOWASCard" },
                                { key: "Driver License", value: "DriverLicense" },
                            ]} />
                        <Input
                            error={errors?.idNumber}
                            value={data.idNumber}
                            required
                            onChange={(e) => setData('idNumber', e.target.value)}
                            label="ID Number"
                            name=""
                            placeholder="Enter ID Number"
                        />
                    </nav>
                </div>
                <div className=' grid grid-cols-2 gap-2 !bg-white  pt-2 pb-2 px-5 lg:py-5  border'>
                    <Fileupload placeholder="Click To Add Image" files={typeof data?.passportPicture != 'undefined' && [data.passportPicture]} getFiles={(files) => setData('passportPicture', files[0])}
                        acceptType={['image/jpeg', 'image/jpg', 'image/png']}
                        maxNumber={1}
                        maxFileSize={1080000}
                    />
                    <ul className='my-auto flex flex-col justify-center gap-3'>
                        <li className={`text-xs flex items-center gap-2 ${checkFileValidationRule("Size") ? 'text-green-500' : 'text-red-500'}`}>
                            <IconifyIcon icon={checkFileValidationRule("Size") ? 'charm:circle-tick' : 'pepicons-print:line-x-circle'} fontSize="1rem" className='bg-transparent' />
                            <span>  Recommended Image Size - 600px by 600px i.e less than 1.03mb</span>
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${checkFileValidationRule("AcceptType") ? 'text-green-500' : 'text-red-500'}`}>
                            <IconifyIcon icon={checkFileValidationRule("AcceptType") ? 'charm:circle-tick' : 'pepicons-print:line-x-circle'} fontSize="1rem" className='bg-transparent' />
                            <span>   AcceptType - jpg/jpeg/png </span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Second section */}
            <div className=' '>
                <nav className=' col-span-1 lg:col-span-2 flex items-center gap-3 py-1 px-4 bg-gray-200/30 sticky top-0 z-40 backdrop-blur-sm'>
                    <nav className=' aspect-square flex items-center text-sm justify-center h-6 w-6 rounded-full p-1 bg-gray-500/80 text-gray-50'>2</nav>
                    <nav className='font-semibold text-base text-gray-500'> Personal Information</nav>
                </nav>
                <div className=' w-full border  p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid gap-5'>
                    <Input
                        value={data?.membershipID}
                        label="MID"
                        name=""
                        disabled
                        placeholder="Auto Generated"
                    />
                    <Input
                        error={errors?.firstName}
                        value={data.firstName}
                        onChange={(e) => setData('firstName', e.target.value)}
                        label="First Name"
                        name=""
                        required
                        placeholder="Enter First Name"
                    />
                    <Input
                        error={errors?.otherNames}
                        value={data.otherNames}
                        onChange={(e) => setData('otherNames', e.target.value)}
                        label="Other Names"
                        name=""
                        placeholder="Enter Other Names"
                    />
                    <Input
                        error={errors?.lastName}
                        value={data.lastName}
                        onChange={(e) => setData('lastName', e.target.value)}
                        label="Last Name"
                        name=""
                        required
                        placeholder="Enter Last Name"
                    />
                    <Datepicker
                        value={data.dateOfBirth}
                        required
                        error={errors?.dateOfBirth}
                        onChange={(v) => setData('dateOfBirth', v)}
                        label="Date of Birth"
                        name=""
                        placeholder="Enter Date of Birth"
                    />
                    <Selectoption
                        error={errors?.gender}
                        value={data.gender}
                        required
                        onValueChange={(v) => setData('gender', v)}
                        label='Gender'
                        placeholder='Select Gender'
                        options={[
                            { key: "Male", value: "Male" },
                            { key: "Female", value: "Female" }
                        ]} />
                    <Input
                        error={errors?.occupation}
                        required
                        value={data.occupation}
                        onChange={(e) => setData('occupation', e.target.value)}
                        label="Occupation"
                        name=""
                        placeholder="Enter Occupation"
                    />
                    <Selectoption
                        error={errors?.maritalStatus}
                        value={data.maritalStatus}
                        required
                        onValueChange={(e) => setData('maritalStatus', e)}
                        label='Marital Status'
                        placeholder='Select Marital Status'
                        options={[
                            { key: "Married", value: "Married" },
                            { key: "Single", value: "Single" },
                            { key: "Divorced", value: "Divorced" },
                            { key: "Widowed", value: "Widowed" },
                        ]} />


                    <Selectoption
                        error={errors?.hasNHIS}
                        value={data.hasNHIS}
                        onValueChange={(v) => setData('hasNHIS', v)}
                        label='Has NHIS'
                        required
                        placeholder='Select an option'
                        options={[
                            { key: "Yes", value: true },
                            { key: "No", value: false }
                        ]} />

                    <Input
                        error={errors?.NHISNumber}
                        value={data.NHISNumber}
                        onChange={(e) => setData("NHISNumber", e.target.value)}
                        label='NHIS Number'
                        required
                        placeholder='NHIS Number'
                    />
                    <Selectoption
                        error={errors?.group}
                        value={data.group}
                        enableSearch={true}
                        searchPlacholder='Search Group'
                        onValueChange={(v) => setData('group', v)}
                        label='Ass. / Group'
                        placeholder='Select Ass. / Group'
                        options={groups ? [...Object.entries(groups.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                </div>
            </div>
            <div>
                <nav className=' col-span-1 lg:col-span-2 flex items-center gap-3 py-1 px-4 bg-gray-200/30 sticky top-0 z-40 backdrop-blur-sm'>
                    <nav className=' aspect-square flex items-center text-sm justify-center h-6 w-6 rounded-full p-1 bg-gray-500/80 text-gray-50'>3</nav>
                    <nav className='font-semibold text-base text-gray-500'> Contact Information</nav>
                </nav>
                <div className=' w-full border  p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid gap-5'>
                    <Input
                        error={errors?.address}
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        label="Address"
                        name=""
                        required
                        placeholder="Enter Address"
                    />
                    <Input
                        error={errors?.gpsAddress}
                        value={data.gpsAddress}
                        onChange={(e) => setData("gpsAddress", e.target.value)}
                        label="GPS Address"
                        name=""
                        required
                        placeholder="Enter GPS Address"
                    />

                    <ContactInput
                        error={errors?.phoneOne}
                        value={data.phoneOne}
                        onChange={(v) => setData("phoneOne", v)}
                        label="Phone one"
                        required
                        placeholder="Enter Phone One"
                    />
                    <ContactInput
                        error={errors?.phoneTwo}
                        value={data.phoneTwo}
                        onChange={(value) => setData('phoneTwo', value)}
                        label="Phone two"
                        
                        placeholder="Enter Phone two"
                    />
                    <Input
                        error={errors?.emergencyPerson}
                        value={data.emergencyPerson}
                        onChange={(e) => setData('emergencyPerson', e.target.value)}
                        label="EMG. Person"
                        name=""
                        required
                        placeholder="Enter EMG. Person"
                    />
                    <ContactInput
                        error={errors?.emergencyPersonPhone}
                        value={data.emergencyPersonPhone}
                        onChange={(v) => setData('emergencyPersonPhone', v)}
                        label="EMG Phone"
                        required
                        placeholder="Enter EMG Phone"
                    />
                </div>
            </div>
            <div>
                <nav className=' col-span-1 lg:col-span-2 flex items-center gap-3 py-1 px-4 bg-gray-200/30 sticky top-0 z-40 backdrop-blur-sm'>
                    <nav className=' aspect-square flex items-center text-sm justify-center h-6 w-6 rounded-full p-1 bg-gray-500/80 text-gray-50'>4</nav>
                    <nav className='font-semibold text-base text-gray-500'> Payment Information</nav>
                </nav>
                <Makeindividualsubscriptionpayment
                    processing={processing}
                    canDelete={!!subscriber?.id}
                    onSubmit={handleFormSubmission}
                    onDelete={handleOnEntityDelete}
                    onCancel={onCancel}
                    formData={data}
                    banks={banks}
                    errors={errors} setData={setData}
                    packages={packages}
                    facilities={facilities}
                />

            </div>

        </div >



    )
}

export default Newsubscriberform