"use client"
import React, { FormEvent, useEffect, useState, useMemo } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { corporateBeneficiaryDTO, CorporatePackageDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { AxiosResponse } from 'axios'
import { packageDTO, facilityDTO } from 'app/app/types/entitiesDTO'
import Api from 'app/app/fetch/axiosInstance'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { formatcurrency } from 'app/app/lib/utils'
import ContactInput from 'app/app/components/form-components/contactinput'
import { ISelectData } from 'app/app/fetch/getselectfieldsdata'

function Corporatebeneficiaryform(props: IFormWithDataProps<corporateBeneficiaryDTO> & { corporateID: number | undefined } & Partial<ISelectData>) {
    const { onCancel, onNewDataSucess, formData, corporateID: prfId } = props
    const [packages, setPackages] = useState<IPaginatedData<packageDTO> | null>(null)
    const [facilities, setFacilities] = useState<IPaginatedData<facilityDTO> | null>(null)

    const { data, setData, setValidation, errors, post, patch, processing } = useForm<Partial<corporateBeneficiaryDTO>>(
        formData ? { ...formData } : {}
    )

    setValidation({
        corporateId: z.number().min(1, "This Field Is Required"),
        name: z.string().min(1),
        dateOfBirth: z.string().min(1, "This Field Is Required"),
        contact: z.string().min(12, "This Field Is Required"),
        facility: z.number().min(1, "This Field Is Required"),
        package: z.number().min(1, "This Field Is Required"),
    })

    const handeOnSaveorUpdateSucess = () => {
        onNewDataSucess()
    }

    const handleFormSubmission = (e: FormEvent) => {
        e.preventDefault();

        if (formData) {
            patch("/corporate-subscribers/beneficiary/" + formData.id,
                {
                    onSuccess: () => { toastnotify("Beneficiary Has Been Updated", "Success"); handeOnSaveorUpdateSucess() }
                })
        } else {
            post("/corporate-subscribers/beneficiary", {
                onSuccess: () => { toastnotify("New Beneficiary Has Been Added", "Success"); handeOnSaveorUpdateSucess() }
            })
        }
    }

    useEffect(() => {
        console.log(formData)
        if (formData && packages?.data?.length) {
            const { facility: fc, package: pck, createdBy, updatedBy, ...rest } = formData
            setData({ ...rest, corporateId: prfId ?? "", package: pck?.id ?? "", facility: fc?.id ?? "" })
        }
        if (!formData && prfId) {
            setData('corporateId', prfId)
        }
    }, [formData, packages])


    const getAmountToDebit = useMemo(() => {
        if (packages == null && typeof data.package != 'number') return 0
        const _amount = packages.data.find(p => p.id == data.package)?.amount
        return _amount
    }, [packages, data.package])


    useEffect(() => {
        setFacilities(props?.facilities)
        setPackages(props?.packages)
    }, [props.packages, props.facilities])





    return (
        <form onSubmit={handleFormSubmission} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className="flex items-center justify-between  mb-5 py-3 px-2 bg-blue-50 border-l-2 border-l-blue-400">
                <nav className=' text-sm text-gray-600'>
                    Amount To Debit:
                </nav>
                <nav className='font-semibold text-gray-600'>
                    {packages ? formatcurrency(getAmountToDebit) : "..."}
                </nav>
            </nav>
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
                    <ContactInput
                        value={data.contact}
                        error={errors?.contact}
                        onChange={(v) => setData('contact', v)}
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
                    <Button processing={processing} type='submit' variant='primary' size='sm'>
                        Save
                    </Button>
                </nav>
            </nav>

        </form>
    )
}

export default Corporatebeneficiaryform