import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Textarea } from 'app/app/components/form-components/textarea'
import Selectoption from 'app/app/components/form-components/selectoption'
import { Button } from 'app/app/components/form-components/button'

function Premiumpaymentform() {
    return (
        <div className=' max-w-md w-full p-5 mx-auto'>
            <nav className='grid grid-cols-1 gap-4'>
                <Input name='MembershipID' label='Membership ID' disabled placeholder='Membership ID' />
                <Input name='' label='Name' disabled placeholder='Name' />
                <Input name='' label='Package' disabled placeholder='Package' />
                <Input name='' label='Membership Type' disabled placeholder='Membership Type' />
                <Input name='' label='Amount Due' disabled placeholder='0.00' />
                <hr />
                <Selectoption options={[
                    { key: "Cash", value: "cash" },
                    { key: "MoMo", value: "MoMo" },
                    { key: "Cheque", value: "Cheque" },
                ]} name='type' label='Mode of Payment' placeholder='Mode of Payment' />
                <Input name='' label='Amount'  placeholder='0.00' />
                <Textarea name='' label='Narration' rows={6} />
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

export default Premiumpaymentform