import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { packageDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'

function Newpackageform(props: IFormWithDataProps<packageDTO>) {
    const { formData, onCancel, onNewDataSucess } = props

    const { data, errors, processing, post, patch, setData, setValidation } = useForm<Partial<packageDTO>>(formData ? { ...formData } : {});

    setValidation({
        name: z.string().min(1, "This Field Is Required"),
        description: z.string().optional(),
        amount: z.number().min(1, "This Field Is Required")
    })

    const handleFormSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            patch('/packages/' + formData.id, { onSuccess: () => { toastnotify("Package Has Been Updated", "Success"); onNewDataSucess() } })
        } else {
            post('/packages/', { onSuccess: () => { toastnotify("Package Has Been Created", "Success"); onNewDataSucess() } })
        }
    }
    return (
        <form onSubmit={handleFormSubmission} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input
                    name=''
                    label='Package Name'
                    placeholder='Enter Package Name'
                    error={errors?.name}
                    value={data?.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <Input
                    name=''
                    label='Description'
                    placeholder='Enter Description'
                    error={errors?.description}
                    value={data?.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <Input
                    type='number'
                    name=''
                    label='Amount'
                    placeholder='0.00'
                    error={errors?.amount}
                    value={!!data?.amount && data?.amount}
                    onChange={(e) => setData('amount', Number(e.target.value))}
                />

                <nav className='flex items-center justify-end gap-3'>
                    <Button onClick={()=>onCancel()} type='button' variant='outline' size='sm'>
                        Cancel
                    </Button>
                    <Button type='submit' variant='primary' size='sm'>
                        Save
                    </Button>
                </nav>
            </nav>

        </form>
    )
}

export default Newpackageform