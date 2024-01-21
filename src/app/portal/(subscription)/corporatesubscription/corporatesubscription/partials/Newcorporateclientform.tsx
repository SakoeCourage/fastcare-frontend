import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button';
import Select2options from 'app/app/components/form-components/select2options';

function Newcorporateclientform() {
    return (
        <div className=' max-w-2xl w-full flex flex-col gap-5 p-5 mx-auto'>

            <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input required name='' label='Identification Number' placeholder='Enter Identification Number' />
                <Input required name='' label='Coorporate Body' placeholder='Enter Coorporate Body' />
                <Input required name='' label='Contact' placeholder='Contact' />
                <Input name='' label='Address' placeholder='Address' />
                <Input required name='' label='Email' placeholder='Email' />
                <Select2options
                    required
                    data={[

                    ]}  label='Assigned Staff' placeholder='Assigned Staff' />
                <Input required name='' label='Emergency Person' placeholder='Enter Emergency Person' />
                <Input required name='' label='Emergency Phone' placeholder='Enter Emergency Phone' />

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

export default Newcorporateclientform