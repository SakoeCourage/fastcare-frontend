import React, { FormEvent } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { facilityDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
function newfacilityform(props: IFormWithDataProps<facilityDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, post, patch, errors, processing, setValidation } = useForm<Partial<facilityDTO>>(formData ? { ...formData } : {})

    setValidation({
        name: z.string().min(1, "This Field Is Required"),
        phoneNumber: z.string().min(1, "This Field Is Required"),
        address: z.string().min(1, "This Field Is Required"),
        gpsAdress: z.string().min(1, "This Field Is Required")
    })

    const handleFormSubmission = (e: FormEvent) => {
        e.preventDefault();
        if (formData) {
            patch('/facilities/' + formData.id, { onSuccess: () => { toastnotify("Facility Has Been Updated", "Success"); onNewDataSucess() } })
        } else {
            post('/facilities/', { onSuccess: () => { toastnotify("Facility Has Been Created", "Success"); onNewDataSucess() } })
        }
    }
    return (
        <form onSubmit={handleFormSubmission} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input
                    name=''
                    label='Facility Name'
                    placeholder='Enter Facility Name'
                    error={errors?.name}
                    value={data?.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <Input
                    name=''
                    label='Phone Number'
                    placeholder='(000) 0000 000'
                    error={errors?.phoneNumber}
                    value={data?.phoneNumber}
                    onChange={(e) => setData('phoneNumber', e.target.value)}
                />
                <Input
                    name=''
                    label='GPS Address'
                    placeholder='Enter GPS Address'
                    error={errors?.gpsAdress}
                    value={data?.gpsAdress}
                    onChange={(e) => setData('gpsAdress', e.target.value)}
                />
                <Input
                    name=''
                    label='Address'
                    placeholder='Enter Address'
                    error={errors?.address}
                    value={data?.address}
                    onChange={(e) => setData('address', e.target.value)}
                />

                <nav className='flex items-center justify-end gap-3'>
                    <Button type="button" onClick={() => onCancel()} variant='outline' size='sm'>
                        Cancel
                    </Button>
                    <Button type="submit" variant='primary' size='sm'>
                        Save
                    </Button>
                </nav>
            </nav>

        </form>
    )
}

export default newfacilityform