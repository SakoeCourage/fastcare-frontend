import React, { useEffect } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import useForm from 'app/app/hooks/formHook/useForm';
import { z } from 'zod'
import { corporateSubscriberDTO } from 'app/app/types/entitiesDTO';
import ContactInput from 'app/app/components/form-components/contactinput';


function Newcorporateclientform(props: IFormWithDataProps<corporateSubscriberDTO>) {

    const { formData, onNewDataSucess, onCancel } = props

    const { setData, data, errors, processing, post, patch, setValidation } = useForm<Partial<corporateSubscriberDTO>>(formData ? { ...formData } : {})
    setValidation({
        name: z.string().min(1),
        idNumber: z.string().min(1),
        address: z.string().min(1),
        contact: z.string().min(15),
        principalPerson: z.string().min(1),
        principalPersonPhone: z.string().min(12),
        email: z.string().email().min(1),
    })


    const handleFormDataSubmission = () => {
        if (formData) {
            patch('/corporate-subscribers/' + formData.id, { onSuccess: () => onNewDataSucess() })
        } else {
            post('/corporate-subscribers', { onSuccess: () => onNewDataSucess() })
        }
    }

    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <Input onChange={e => { setData('name', e.target.value) }} error={errors?.name} value={data.name} required name='' label='Name of Corporate' placeholder='Enter Name of Coporate' />
            <Input
                onChange={e => { setData("idNumber", e.target.value) }} error={errors?.idNumber} value={data.idNumber}
                className=' ' required name='' label="Identification Number" placeholder="Enter Identification Number" />
            <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                    onChange={e => { setData('principalPerson', e.target.value) }} error={errors?.principalPerson} value={data.principalPerson}
                    required name='' label='Principal Person' placeholder='Enter Principal Person' />
                <ContactInput
                    onChange={v => { setData('principalPersonPhone', v) }}
                    error={errors?.principalPersonPhone}
                    value={data.principalPersonPhone}
                    required
                    label='Principal Phone'
                    placeholder='Enter Principal Phone' />

                <ContactInput
                    onChange={v => { setData('contact', v) }}
                    error={errors?.contact}
                    value={data.contact}
                    required
                    label='Contact'
                    placeholder='Contact'
                />
                <Input
                    onChange={e => { setData('address', e.target.value) }} error={errors?.address} value={data.address}
                    name='' label='Address' placeholder='Address' />
                <Input
                    onChange={e => { setData('email', e.target.value) }} error={errors?.email} value={data.email}
                    className=' ' required name='' label='Email' placeholder='Email' />
            </nav>
            <nav className='flex items-center justify-end gap-3'>
                <Button onClick={() => onCancel()} variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button processing={processing} onClick={() => handleFormDataSubmission()} variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </div>
    )
}

export default Newcorporateclientform