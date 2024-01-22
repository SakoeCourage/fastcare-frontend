import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'

function newfacilityform() {
    return (
        <div className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input name='' label='Facility Name' placeholder='Enter Facility Name' />
                <Input name='' label='Phone Number' placeholder='(000) 0000 000' />
                <Input name='' label='Location' placeholder='Enter Location' />
                <Input name='' label='Address' placeholder='Enter Address' />

                <nav className='flex items-center justify-end gap-3'>
                    <Button variant='outline' size='sm'>
                        Cancel
                    </Button>
                    <Button variant='primary' size='sm'>
                        Save
                    </Button>
                </nav>
            </nav>

        </div>
    )
}

export default newfacilityform