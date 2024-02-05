import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { groupDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'

function Newgroupassocform(props: IFormWithDataProps<groupDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, setValidation, processing, errors, post, patch } = useForm<Partial<groupDTO>>(formData ? { ...formData } : {})

    setValidation({
        name: z.string().min(1, "This Field Is Required"),
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData?.id) {
            patch("/groups/" + formData.id, { onSuccess: () => { toastnotify("Call Comment Category Updated Successfully", "Success"); onNewDataSucess() } })

        } else {
            post("/groups", { onSuccess: () => { toastnotify("Call Comment Category Created Successfully", "Success"); onNewDataSucess() } })
        }
    }
    return (
        <form onSubmit={handleSubmit} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input
                    error={errors?.name}
                    value={data?.name}
                    onChange={(e) => setData('name', e.target.value)}
                    name='' label='Name' placeholder='Enter Group or Ass Name' />

                <nav className='flex items-center justify-end gap-3'>
                    <Button onClick={onCancel} type='button' variant='outline' size='sm'>
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

export default Newgroupassocform