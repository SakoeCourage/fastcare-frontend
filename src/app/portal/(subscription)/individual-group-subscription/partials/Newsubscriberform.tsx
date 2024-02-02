import React, { useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import Datepicker from 'app/app/components/form-components/datepicker'
import Selectoption from 'app/app/components/form-components/selectoption'
import Fileupload from 'app/app/components/ui/fileupload'
import { Button } from 'app/app/components/form-components/button'
import useForm from 'app/app/hooks/formHook/useForm'
import Api from 'app/app/fetch/axiosInstance'
import { z } from 'zod'
import { IndividualSubDTO, facilityDTO, groupDTO, packageDTO } from 'app/app/types/entitiesDTO'
import { AxiosResponse } from 'axios'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import DialogBox from 'app/app/components/ui/dialoguebox'

function Newsubscriberform({ formData: subscriber, onNewDataSucess, onCancel }: IFormWithDataProps<IndividualSubDTO>) {
    const [packages, setPackages] = useState<IPaginatedData<packageDTO> | null>(null)
    const [groups, setGroups] = useState<IPaginatedData<groupDTO> | null>(null)
    const [facilities, setFacilities] = useState<IPaginatedData<facilityDTO> | null>(null)

    const { data, setData, errors, post, patch, setValidation, processing, delete: del } = useForm<Partial<IndividualSubDTO>>({
    })

    const isFile = (value: unknown): value is File => {
        return value instanceof File;
    };

    setValidation({
        idType: z.string().min(1, "This Field is Required"),
        passportPicture: z.custom((value) => isFile(value), {
            message: 'Invalid file. Please provide a valid file.',
        }),
        idNumber: z.string().min(1, "This Filed is required"),
        firstName: z.string().min(1, "This Field is required"),
        otherNames: z.string().optional(),
        lastName: z.string().min(1, "This Field is required"),
        dateOfBirth: z.string().min(1, "This Field is required"),
        gender: z.string().min(1, "This Field is required"),
        occupation: z.string().min(1, "This Field is required"),
        maritalStatus: z.string().min(1, "This Field is required"),
        address: z.string().min(1, "This Field is required"),
        gpsAddress: z.string().min(5, "This Field is required"),
        phoneOne: z.string().min(9, "This Field is required"),
        phoneTwo: z.string().nullable(),
        emergencyPerson: z.string().min(5, "This Field is required"),
        emergencyPersonPhone: z.string().min(5, "This Field is required"),
        hasNHIS: z.boolean(),
        NHISNumber: (data.hasNHIS == true) ? z.string().min(5, "This Field is required") : z.string().optional(),
        paymentMode: z.string().min(1, "This Field is required"),
        frequency: z.string().min(5, "This Field is required"),
        discount: z.number().min(0, "This Field is required"),
        momoNetwork: z.string().min(1, "This Field is required"),
        momoNumber: z.string().min(5, "This Field is required"),
        facility: z.number().min(1, "This Field is required"),
        package: z.number().min(1, "This Field is required"),
        group: z.number().min(1, "This Field is required"),
    })

    const getGroupAsync: () => Promise<AxiosResponse<IPaginatedData<groupDTO>>> = () => Api.get("/groups");
    const getFacilitiesAsync: () => Promise<AxiosResponse<IPaginatedData<facilityDTO>>> = () => Api.get("/facilities");
    const getPackagesAsync: () => Promise<AxiosResponse<IPaginatedData<packageDTO>>> = () => Api.get("/packages");

    const fetchSelectFieldData = async () => {
        try {
            const [_groups, _facilities, _packages] = await Promise.all([getGroupAsync(), getFacilitiesAsync(), getPackagesAsync()]);
            setGroups(_groups.data)
            setFacilities(_facilities.data)
            setPackages(_packages.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleOnsucess = () => {
        toastnotify("New Subscriber Added", "Success")
        onNewDataSucess();
    }

    useEffect(() => {
        if (subscriber == null) return
        const { facility: fc, package: pckg, group: gr, passportPicture, ...rest } = subscriber;
        let file: File | null = null;
        if (passportPicture) {
            const base64Buffer = Buffer.from(passportPicture as string, 'base64');
            const blob = new Blob([base64Buffer]);
            const filename = "userprofile.jpg";
            file = new File([blob], filename, { type: "image/jpg" });
        }
        console.log(subscriber)
        try {
            setData({ ...rest, facility: fc?.id, package: pckg?.id, group: gr.id, passportPicture: file && file as File })
        } catch (error) {
            console.warn(error)
        }

    }, [subscriber])

    const handleFormSubmission = () => {
        if (subscriber) {
            patch("/individual-subscribers/" + subscriber.id, { onSuccess: handleOnsucess, config: { asFormData: true }, onError: (err) => { console.log(err) } })
        }
        if (!subscriber) {
            post("/individual-subscribers", { onSuccess: handleOnsucess, config: { asFormData: true }, onError: (err) => { console.log(err) } })
        }
    }

    const handleOnEntityDelete = () => {
        DialogBox({ title: "Try", promptText: "Are You Sure You want to ", open: true, closeModal: () => void (0) })
        return
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
    }

    useEffect(() => {
        fetchSelectFieldData();
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])



    return (
        <div className=' grid grid-cols-1 lg:grid-cols-2  gap-4 p-2'>
            {/* First Section Begins here */}
            <div className=' col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <div className=' grid grid-cols-1 gap-5 !bg-white pb-10 h-max pt-5 px-5 rounded-md border'>
                    <nav className=' flex items-center !gap-1 border-b pb-3 !px-0 font-semibold text-gray-500'>
                        <span> ID Card Selection</span>
                    </nav>
                    <nav className=' grid-cols-1 grid gap-5'>
                        <Selectoption
                            value={data.idType}
                            error={errors?.idType}
                            onValueChange={(v) => setData("idType", v)}
                            label='ID Type'
                            placeholder='Select ID Type'
                            options={[
                                { key: "Passport", value: "Passport" },
                                { key: "Voter ID", value: "Voter ID" },
                                { key: "ECOWAS Card", value: "ECOWAS Card" },
                                { key: "Driver License", value: "Driver License" },
                            ]} />
                        <Input
                            error={errors?.idNumber}
                            value={data.idNumber}
                            onChange={(e) => setData('idNumber', e.target.value)}
                            label="ID Number"
                            name=""
                            placeholder="Enter ID Number"
                        />
                    </nav>
                </div>
                <div className=' grid grid-cols-1 gap-5 !bg-white  h-full pt-2 pb-2 px-5 rounded-md border'>
                    <nav className=' flex items-center justify-between !gap-1 border-b pb-3 !px-0 font-semibold text-gray-500'>
                        <span> Client Picture</span>
                        <span className="text-red-400 text-sm"> {errors?.passportPicture}</span>
                    </nav>
                    <nav className=' grid-cols-1 grid h-full'>
                        <Fileupload files={typeof data?.passportPicture != 'undefined' && [data.passportPicture]} getFiles={(files) => setData('passportPicture', files[0])}
                            acceptType={['image/jpeg']}
                            maxNumber={1}
                        />
                    </nav>
                </div>

            </div>

            {/* Second section */}
            <div className='col-span-1  lg:col-span-2 '>
                <div className=' w-full border rounded-md p-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid gap-5'>
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
                        error={errors?.dateOfBirth}
                        onChange={(v) => setData('dateOfBirth', v)}
                        label="Date of Birth"
                        name=""
                        placeholder="Enter Date of Birth"
                    />
                    <Selectoption
                        error={errors?.gender}
                        value={data.gender}
                        onValueChange={(v) => setData('gender', v)}
                        label='Gender'
                        placeholder='Select Gender'
                        options={[
                            { key: "Male", value: "Male" },
                            { key: "Female", value: "Female" }
                        ]} />
                    <Input
                        error={errors?.occupation}
                        value={data.occupation}
                        onChange={(e) => setData('occupation', e.target.value)}
                        label="Occupation"
                        name=""
                        required
                        placeholder="Enter Occupation"
                    />
                    <Selectoption
                        error={errors?.maritalStatus}
                        value={data.maritalStatus}
                        onValueChange={(e) => setData('maritalStatus', e)}
                        label='Marital Status'
                        placeholder='Select Marital Status'
                        options={[
                            { key: "Married", value: "Married" },
                            { key: "Single", value: "Single" },
                            { key: "Divorced", value: "Divorced" },
                            { key: "Widowed", value: "Widowed" },
                        ]} />
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
                    <Selectoption
                        value={data.facility}
                        error={errors?.facility}
                        onValueChange={(v) => setData('facility', v)}
                        label='Facility'
                        placeholder='Select Facility'
                        options={facilities ? [...Object.entries(facilities.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                    <Input
                        error={errors?.phoneOne}
                        value={data.phoneOne}
                        onChange={(e) => setData("phoneOne", e.target.value)}
                        label="phone one"
                        name=""
                        required
                        placeholder="Enter Phone One"
                    />
                    <Input
                        error={errors?.phoneTwo}
                        value={data.phoneTwo}
                        onChange={(e) => setData('phoneTwo', e.target.value)}
                        label="Phone two"
                        name=""
                        required
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
                    <Input
                        error={errors?.emergencyPersonPhone}
                        value={data.emergencyPersonPhone}
                        onChange={(e) => setData('emergencyPersonPhone', e.target.value)}
                        label="EMG Phone"
                        name=""
                        required
                        placeholder="Enter EMG Phone"
                    />

                    <Selectoption
                        error={errors?.hasNHIS}
                        value={data.hasNHIS}
                        onValueChange={(v) => setData('hasNHIS', v)}
                        label='NHIS'
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
                        error={errors?.package}
                        value={data.package}
                        onValueChange={(v) => setData('package', v)}
                        required
                        label='Package'
                        placeholder='Select Package'
                        options={packages ? [...Object.entries(packages.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                    <Selectoption
                        error={errors?.frequency}
                        value={data.frequency}
                        onValueChange={(v) => setData('frequency', v)}
                        required
                        label='Frequency'
                        placeholder='Select Frequency'
                        options={[
                            { key: "Daily", value: "Daily" },
                            { key: "Monthly", value: "Monthly" },
                            { key: "Weekly", value: "Weekly" },
                        ]} />

                    <Selectoption
                        error={errors?.paymentMode}
                        value={data.paymentMode}
                        onValueChange={(v) => setData('paymentMode', v)}
                        label='Payment Mode'
                        required
                        placeholder='Select Payment Mode'
                        options={[
                            { key: "Cash", value: "Cash" },
                            { key: "MOMO", value: "MOMO" },
                            { key: "Cheque", value: "Cheque" },
                        ]} />

                    <Selectoption
                        error={errors?.momoNetwork}
                        value={data.momoNetwork}
                        onValueChange={(v) => setData('momoNetwork', v)}
                        label='MoMo Network'
                        required
                        placeholder='Select MoMo Network'
                        options={[
                            { key: "MTN", value: "MTN" },
                            { key: "VODAFONE", value: "VODAFONE" },
                            { key: "AIRTEL TIGO", value: "AIRTELTIGO" },
                        ]} />

                    <Input
                        error={errors?.momoNumber}
                        value={data.momoNumber}
                        onChange={(e) => setData('momoNumber', e.target.value)}
                        label="MoMo Number"
                        name=""
                        required
                        placeholder="Enter MoMo Number"
                    />

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
                    <Selectoption
                        error={errors?.group}
                        value={data.group}
                        onValueChange={(v) => setData('group', v)}
                        label='Ass. / Group'
                        placeholder='Select Ass. / Group'
                        options={groups ? [...Object.entries(groups.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                </div>

            </div>
            <nav className='col-span-1  lg:col-span-2 flex items-center justify-end gap-3'>
                <Button onClick={() => onCancel()} variant='outline' size='md'>
                    Cancel
                </Button>
                <Button disabled={processing} onClick={() => handleFormSubmission()} variant='primary' size='md'>
                    Save
                </Button>
                {subscriber?.id && <Button onClick={() => handleOnEntityDelete()} variant="danger" size='md'>
                    Delete
                </Button>}
            </nav>
        </div >



    )
}

export default Newsubscriberform