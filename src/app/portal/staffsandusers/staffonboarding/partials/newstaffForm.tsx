import React, { useEffect } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Datepicker from 'app/app/components/form-components/datepicker';
import { staffDTO } from 'app/app/types/entitiesDTO';
import useForm from 'app/app/hooks/formHook/useForm';
import { toastnotify } from 'app/app/providers/Toastserviceprovider';
import { z } from "zod"
import { nationalities } from 'app/app/lib/nationalities';
import Select2options from 'app/app/components/form-components/select2options';

function NewstaffForm(props: IFormWithDataProps<staffDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { post, patch, data, errors, setData, setValidation } = useForm<Partial<staffDTO>>(formData ? { ...formData } : {})

    setValidation({
        title: z.string().min(1, "This Field Is Required"),
        idType: z.string().min(1, "This Field Is Required"),
        idNumber: z.string().min(1, "This Field Is Required"),
        firstName: z.string().min(1, "This Field Is Required"),
        lastName: z.string().min(1, "This Field Is Required"),
        // otherNames: z.string().optional().nullable(),
        otherNames: z.string().min(1, "This Field Is Required"),
        gender: z.string().min(1, "This Field Is Required"),
        dateOfBirth: z.string().min(1, "This Field Is Required"),
        nationality: z.string().min(1, "This Field Is Required"),
        marritalStatus: z.string().min(1, "This Field Is Required"),
        email: z.string().email("This Field Should Be A Valid Email").email(),
        phoneNumber: z.string().min(9, "This Field Is Required"),
        position: z.string().min(1, "This Field Is Required"),
    })

    useEffect(() => {
        console.log(data)
    }, [data])


    const handleSubmit = () => {
        if (formData?.id) {
            patch("/staff/" + formData.id, { onSuccess: () => { onNewDataSucess(); toastnotify("Staff Updated Successfully", "Success") } })
        } else {
            post("/staff", { onSuccess: () => { onNewDataSucess(); toastnotify("Staff Created Successfully", "Success") } })
        }
    }
    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <nav className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                    error={errors?.staffCode}
                    value={data?.staffCode}
                    onChange={(e) => setData('staffCode', e.target.value)}
                    required name='' label='Staff Code' disabled placeholder='Auto Generated' />
                <Selectoption
                    error={errors?.title}
                    value={data?.title}
                    onValueChange={(e) => setData('title', e)}
                    required
                    options={[
                        {
                            key: "Mr",
                            value: "Mr"
                        },
                        {
                            key: "Mrs",
                            value: "Mrs"
                        },
                        {
                            key: "Miss",
                            value: "Miss"
                        },
                        {
                            key: "Dr",
                            value: "Dr"
                        },
                        {
                            key: "Prof",
                            value: "Prof"
                        },
                        {
                            key: "Hon",
                            value: "Hon"
                        }
                    ]} name='type' label='Title' placeholder='Title' />

                <Input
                    error={errors?.firstName}
                    value={data?.firstName}
                    onChange={(e) => setData('firstName', e.target.value)}
                    required name='' label='First Name' placeholder='First Name' />

                <Input
                    error={errors?.lastName}
                    value={data?.lastName}
                    onChange={(e) => setData('lastName', e.target.value)}
                    required name='' label='Last Name' placeholder='Last Name' />

                <Input
                    error={errors?.otherNames}
                    value={data?.otherNames}
                    onChange={(e) => setData('otherNames', e.target.value)}
                    name='' label='Other Names Name' placeholder='Other Names Name' />
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
                    value={data?.idNumber}
                    onChange={(e) => setData('idNumber', e.target.value)}
                    required name='' label='ID Number' placeholder='ID Number' />

                <Selectoption
                    error={errors?.gender}
                    value={data?.gender}
                    onValueChange={(e) => setData('gender', e)}
                    label='Gender'
                    placeholder='Select Gender'
                    options={[{
                        key: "Male",
                        value: "Male"
                    },
                    {
                        key: "Female",
                        value: "Female"
                    }]}
                    required
                />
                <Input
                    error={errors?.email}
                    value={data?.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    name=''
                    label='Email'
                    placeholder='example@email.com' />
                <Input
                    error={errors?.phoneNumber}
                    value={data?.phoneNumber}
                    required
                    onChange={(e) => setData('phoneNumber', e.target.value)}
                    name=''
                    label='Phone Number'
                    placeholder='(000) 0000 000' />

                <Selectoption
                    required
                    enableSearch
                    searchPlacholder='Search Country'
                    label='Nationality'
                    placeholder='Select Nationality'
                    value={data?.nationality}
                    onValueChange={(e) => setData("nationality", e)}
                    error={errors?.nationality}
                    options={nationalities ? nationalities.map((n) => { return ({ key: n.nationality, value: n.nationality }) }) : []} />

                <Input
                    error={errors?.position}
                    value={data?.position}
                    onChange={(e) => setData('position', e.target.value)}
                    required name='' label='Position' placeholder='Enter Position' />
                <Selectoption
                    error={errors?.marritalStatus}
                    value={data?.marritalStatus}
                    onValueChange={(e) => setData('marritalStatus', e)}
                    label='Marital Status'
                    placeholder='Select Marital Status'
                    options={[
                        { key: "Single", value: "Single" },
                        { key: "Married", value: "Married" },
                        { key: "Divorced", value: "Divorced" }
                    ]}
                    required
                />
                <Datepicker
                    error={errors?.dateOfBirth}
                    value={data?.dateOfBirth}
                    onChange={(e) => setData('dateOfBirth', e)}
                    label='Date of Birth' placeholder='Date of Birth' />

            </nav>
            <nav className='flex items-center justify-end gap-3'>
                <Button type='button' onClick={onCancel} variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit()} type='submit' variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </div>
    )
}

export default NewstaffForm