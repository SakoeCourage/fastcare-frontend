import React from 'react'
import Fileupload from 'app/app/components/ui/fileupload'
import Noticecard from 'app/app/components/ui/noticecard'
import { Button } from 'app/app/components/form-components/button'
function Csvfileupload() {
    return (
        <div className=' p-5 flex flex-col gap-5'>
            <Noticecard variant="warning" >
                The CSV file being uploaded should have the following headers and No spacing are allowed. (name,idType,idNumber,dob,phone,address,hasNHIS)
            </Noticecard>

            <div className=' w-full h-full border-y py-10 flex items-center justify-center'>
                <Fileupload maxNumber={1} acceptType={['text/csv']} />
            </div>
            <nav className='col-span-1  pt-2  lg:col-span-2 flex items-center justify-end gap-3'>
                <Button variant='outline' size='md'>
                    Cancel
                </Button>
                <Button variant='primary' size='md'>
                    Save Data
                </Button>
            </nav>
        </div>
    )
}

export default Csvfileupload