import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'

function Profile() {
    return (
        <div className='flex flex-col gap-5'>
            <nav className=' py-2 flex items-center  gap-1 text-gray-500'>
                <nav className=' text-2xl'>System Credentials</nav>
            </nav>
            <Input disabled label="Full Name" value="Sakoe Courage" placeholder="" />
            <Input disabled label="Email" value="akorlicourage@gmail.com" placeholder="" />
            <Input disabled label="Facility" value="Main Office" placeholder="" />
            <Input disabled label="Role" value="Admin" placeholder="" />
        </div>
    )
}

export default Profile