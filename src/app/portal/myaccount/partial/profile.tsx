import React, { useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { useSession } from 'next-auth/react'
import Api from 'app/app/fetch/axiosInstance'
import { AxiosResponse } from 'axios'
import { userDTO } from 'app/app/types/entitiesDTO'

function Profile() {
    const { status, data } = useSession()
    const [authUser, setAuthUser] = useState(null)

    // useEffect(() => {
    //     console.log(data.user)
    //     if (status == "authenticated") {
    //         Api.get('/users/' + data?.user?.id)
    //             .then((res: AxiosResponse<userDTO>) => {
    //                 console.log(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }, [status])
    
    return (
        <div className='flex flex-col gap-5'>
            <nav className=' py-2 flex items-center  gap-1 text-gray-500'>
                <nav className=' text-2xl'>System Credentials</nav>
            </nav>
            <Input disabled label="Full Name" value={data.user.name} placeholder="" />
            <Input disabled label="Email" value={data.user.email} placeholder="" />
            <Input disabled label="Facility" value="Main Office" placeholder="" />
            <Input disabled label="Role" value={data.user.role.name} placeholder="" />
        </div>
    )
}

export default Profile