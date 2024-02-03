import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'
import Datepicker from 'app/app/components/form-components/datepicker'

function Newfamilymemberforms() {
    return (
        <div className=' max-w-xl w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input name='' label='Name Of Family Member' placeholder='Enter Name Of Family Member' />
                <Datepicker name='' label='Date Of Birth' />
                <hr />
                <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Selectoption options={[

                    ]} name='type' label='ID Type' placeholder='Select ID Type' />
                    <Input name='' label='ID Number' placeholder='Enter ID Number' />
                </nav>
                <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Input name='' label='Phone Number' placeholder='(000) 000 0000' />
                    <Input name='' label='Address' placeholder='Enter Address' />
                </nav>

                <Selectoption options={[

                ]} name='type' label='Is NHIS Registered' placeholder='Select An Option' />
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

export default Newfamilymemberforms