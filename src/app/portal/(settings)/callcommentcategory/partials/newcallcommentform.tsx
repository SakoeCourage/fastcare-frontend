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
                <Input name='' label='Category' placeholder='Enter Category' />
                <Input name='' label='Description' placeholder='Enter Description' />

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