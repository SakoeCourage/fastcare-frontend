import React, { FormEvent, useEffect } from 'react'
import { roleDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { Input } from 'app/app/components/form-components/input'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { Button } from 'app/app/components/form-components/button'
function Newroleform(props: IFormWithDataProps<roleDTO>) {
    const { formData, onNewDataSucess, onCancel } = props
    const { errors, setData, data, post, patch, setValidation } = useForm<Partial<roleDTO>>(formData ? { ...formData } : {})

    setValidation({
        name: z.string().min(1, "This Field Is Required")
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData?.id) {
            patch("/roles/" + formData.id, { onSuccess: () => { onNewDataSucess(); toastnotify("Role Successfully", "Success") } })
        } else {
            console.log(data)
            post("/roles", { onSuccess: () => { onNewDataSucess(); toastnotify("Role Created Successfully", "Success") } })
        }
    }

    useEffect(() => {
        if (!formData?.id) {
            setData('permissions', ['View_Dashboard'])
        }
    }, [formData])

    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <form onSubmit={handleSubmit} className=' max-w-xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <Input
                error={errors?.name}
                value={data?.name}
                onChange={(e) => setData('name', e.target.value)}
                required name='' label='Role Name' placeholder='Enter Role Name' />

            <nav className='flex items-center justify-end gap-3'>
                <Button type='button' onClick={onCancel} variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button type='submit' variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </form>
    )
}

export default Newroleform