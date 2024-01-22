import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Datepicker from 'app/app/components/form-components/datepicker';

function newuserform() {
    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <nav className='grid grid-cols-1  gap-4'>
                <Input required name='' label='Full Name' placeholder='Enter full Name' />
                <Input required name='' label='Email' placeholder='examaple@email.com' />

                <Selectoption
                    label='Role'
                    placeholder='Select Role'
                    options={[{
                        key: "Admin",
                        value: "Admin"
                    },
                    {
                        key: "Sale Manage",
                        value: "Sale Manage"
                    }]}
                    required
                />
                <Selectoption
                    label='Facility'
                    placeholder='Select Facility'
                    options={[{
                        key: "Main Office",
                        value: "Main Office"
                    },
                    {
                        key: "Regional Office",
                        value: "Regional Office"
                    }]}
                    required
                />


            </nav>
            <nav className='flex items-center justify-end gap-3'>
                <Button variant='outline' size='sm'>
                    Cancel
                </Button>
                <Button variant='primary' size='sm'>
                    Save
                </Button>
            </nav>
        </div>
    )
}

export default newuserform