import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';


function Newfamilyclientform() {
    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>
            <Input required name='' label='Name of Family'  placeholder='Enter Name of Family' />
            <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input required name='' label='Contact'  placeholder='Contact' />
                <Input name='' label='Address'  placeholder='Address' />
                <Input required name='' label='Email'  placeholder='Email' />
                <Selectoption
                    required
                    options={[

                    ]} name='type' label='Assigned Staff' placeholder='Assigned Staff' />
            <Input required name='' label='Emergency Person'  placeholder='Enter Emergency Person' />
            <Input required name='' label='Emergency Phone'  placeholder='Enter Emergency Phone' />

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

export default Newfamilyclientform