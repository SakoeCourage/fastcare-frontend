import React from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import { Input } from 'app/app/components/form-components/input'
import { Button } from 'app/app/components/form-components/button'
import { componentsType } from './index'
function Changecredentials({ setComponent }: { setComponent: React.Dispatch<React.SetStateAction<componentsType>> }) {
    return (
        <div className='flex flex-col gap-5'>
            <nav className=' py-2 flex items-center  gap-1 text-gray-500'>
                <nav className=' text-2xl'>Password Reset</nav>
            </nav>
            <Input type="password" label="Current Password" value="Sakoe Courage" placeholder="Enter Current Password" />
            <Input type="password" label="New Password" value="akorlicourage@gmail.com" placeholder="Enter New Password" />

            <div className='grid grid-cols-2 gap-2'>
                <Button onClick={() => setComponent("Profile")} size='full' variant="outline">
                    Cancel
                </Button>
                <Button size='full' variant='primary'>
                    Rest Password
                </Button>
            </div>
        </div>
    )
}

export default Changecredentials