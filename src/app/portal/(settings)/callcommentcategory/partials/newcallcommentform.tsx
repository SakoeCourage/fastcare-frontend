import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'
import { callCommentDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { z } from 'zod'
function Newfacilityform(props: IFormWithDataProps<callCommentDTO>) {
    const { formData, onCancel, onNewDataSucess } = props
    const { data, setData, setValidation, processing, errors, post, patch } = useForm<Partial<callCommentDTO>>(formData ? { ...formData } : {})

    setValidation({
        name: z.string().min(1, "This Field Is Required"),
        description: z.string().optional().nullable(),
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData?.id) {
            patch("/call-comment-categories/" + formData.id, { onSuccess: () => { toastnotify("Call Comment Category Updated Successfully", "Success"); onNewDataSucess() } })

        } else {
            post("/call-comment-categories", { onSuccess: () => { toastnotify("Call Comment Category Created Successfully", "Success"); onNewDataSucess() } })

        }
    }
    return (
        <form onSubmit={handleSubmit} className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input
                    error={errors?.name}
                    value={data?.name}
                    onChange={(e) => setData('name', e.target.value)}
                    name=''
                    label='Name'
                    placeholder='Enter Name'
                />
                <Input
                    error={errors?.description}
                    value={data?.description}
                    onChange={(e) => setData('description', e.target.value)}
                    name=''
                    label='Description'
                    placeholder='Enter Description' />

                <nav className='flex items-center justify-end gap-3'>
                    <Button  type='button' onClick={onCancel} variant='outline' size='sm'>
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

export default Newfacilityform