"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { familyBeneficiaryDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { AxiosResponse } from 'axios'
import { packageDTO, facilityDTO } from 'app/app/types/entitiesDTO'
import Api from 'app/app/fetch/axiosInstance'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'

function Familybeneficiaryform(props: IFormWithDataProps<familyBeneficiaryDTO> & { familyId: number | undefined }) {
    const { onCancel, onNewDataSucess, formData, familyId: prfId } = props
    const [packages, setPackages] = useState<IPaginatedData<packageDTO> | null>(null)
    const [facilities, setFacilities] = useState<IPaginatedData<facilityDTO> | null>(null)

    const { data, setData, setValidation, errors, post, patch, processing } = useForm({
        familyId: "",
        name: "",
        dateOfBirth: "",
        contact: "",
        facility: "",
        package: ""
    })

    setValidation({
        familyId: z.number().min(1, "This Field Is Required"),
        name: z.string().min(1),
        dateOfBirth: z.string().min(1, "This Field Is Required"),
        contact: z.string().min(9, "This Field Is Required"),
        facility: z.number().min(1, "This Field Is Required"),
        package: z.number().min(1, "This Field Is Required"),
    })

    const getFacilitiesAsync: () => Promise<AxiosResponse<IPaginatedData<facilityDTO>>> = () => Api.get("/facilities");
    const getPackagesAsync: () => Promise<AxiosResponse<IPaginatedData<packageDTO>>> = () => Api.get("/packages");

    const fetchSelectFieldData = async () => {
        try {
            const [_facilities, _packages] = await Promise.all([getFacilitiesAsync(), getPackagesAsync()]);
            setFacilities(_facilities.data)
            setPackages(_packages.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handeOnSaveorUpdateSucess = () => {
        onNewDataSucess()
    }

    const handleFormSubmission = (e: FormEvent) => {
        e.preventDefault();

        if (formData) {
            patch("/family-subscribers/beneficiary/" + formData.id,
                {
                    onSuccess: () => { toastnotify("Beneficiary Has Been Updated", "Success"); handeOnSaveorUpdateSucess() }
                })
        } else {
            post("/family-subscribers/beneficiary", {
                onSuccess: () => { toastnotify("New Beneficiary Has Been Added", "Success"); handeOnSaveorUpdateSucess() }
            })
        }
    }
    useEffect(() => { fetchSelectFieldData() }, [])

    useEffect(() => {
        if (formData && packages?.data?.length) {
            const { facility: fc, package: pck, createdBy, updatedBy, ...rest } = formData
            setData({ ...rest, familyId: prfId ?? "", package: pck.id ?? "", facility: fc.id ?? "" })
        }
        if (!formData && prfId) {
            setData('familyId', prfId)
        }
    }, [formData, packages])





    return (
        <form onSubmit={handleFormSubmission} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input
                    value={data.name}
                    error={errors?.name}
                    onChange={(e) => setData('name', e.target.value)}
                    name='' label='Name Of Beneficiary'
                    placeholder='Enter Name Of Beneficiary'
                    disabled={!!(formData && facilities?.data == null)}

                />
                <hr />
                <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Datepicker
                        value={data.dateOfBirth}
                        error={errors?.dateOfBirth}
                        onChange={(e) => setData("dateOfBirth", e)}
                        name='' label='Date Of Birth' />

                    <Input
                        value={data.contact}
                        error={errors?.contact}
                        onChange={(e) => setData('contact', e.target.value)}
                        name=''
                        label='Contact Number'
                        placeholder='(000) 000 0000'
                        disabled={!!(formData && facilities?.data == null)}

                    />
                </nav>

                <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Selectoption
                        value={data.facility}
                        error={errors?.facility}
                        onValueChange={(v) => { setData('facility', Number(v)) }}
                        label='Facility'
                        placeholder='Select Facility'
                        disabled={!!(formData && facilities?.data == null)}
                        options={facilities ? [...Object.entries(facilities.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />

                    <Selectoption
                        value={data.package}
                        error={errors?.package}
                        onValueChange={(v) => setData('package', Number(v))}
                        label='Package'
                        placeholder='Select Package'
                        disabled={!!(formData && facilities?.data == null)}
                        options={packages ? [...Object.entries(packages.data).map(entry => { return { key: entry[1].name, value: entry[1].id } })] : []} />
                </nav>

                <nav className='flex items-center justify-end gap-3'>
                    <Button type="button" onClick={() => onCancel()} variant='outline' size='sm'>
                        Cancel
                    </Button>
                    <Button disabled={processing} type='submit' variant='primary' size='sm'>
                        Save
                    </Button>
                </nav>
            </nav>

        </form>
    )
}

export default Familybeneficiaryform