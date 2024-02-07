import React, { useEffect, useState, useMemo } from 'react'
import Api from 'app/app/fetch/axiosInstance'
import { Button } from 'app/app/components/form-components/button'
import Customcheckb from './customchekcb'
import Customswitch from './customswitch'
import { Permission, roleDTO } from 'app/app/types/entitiesDTO'
import useForm from 'app/app/hooks/formHook/useForm'
import { z } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'

const availablePermisions: Permission[] = [
    "View_Dashboard"
    , "Manage_Users"
    , "View_Users"
    , "Manage_Staff"
    , "View_Staff"
    , "Manage_Subscriptions"
    , "View_Subscriptions"
    , "Manage_Payment"
    , "View_Payment"
    , "Manage_Debit_OPS"
    , "View_Debit_OPS"
    , "View_Reports"
    , "View_Settings"
    , "Manage_Settings"
    , "Manage_Call_Center"
]

function Loader() {
    return <div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-50 rounded shadow animate-pulse  md:p-6 ">
        <div className="grid grid-cols-2 ">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-12 mx-auto"></div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}

export default function EditPermissions(props: IFormWithDataProps<roleDTO>) {
    const { formData, onNewDataSucess, onCancel } = props

    const [allPermissions, setAllPermissions] = useState<Permission[]>(availablePermisions)
    const [rolePermissions, setRolePermissions] = useState(formData?.permissions ? [...formData?.permissions] : [])
    const [isLoading, setIsLoading] = useState(false)
    const [isAltered, setIsAltered] = useState(false)
    const { setData, data, processing, setValidation, patch } = useForm<Partial<roleDTO>>({})

    setValidation({
        permissions: z.array(z.string()).min(1, "This Field Is Required").nonempty()
    })

    function ApplyNewPermissions() {

        // Api.post('/roles/permissions/new', {
        //     'roleName': roleName,
        //     'permissions': rolePermissions
        // }).then(res => {
        //     console.log(res.data)
        //     setProcessing(false)
        //     setIsAltered(false)
        // }).catch(err => console.log(err.response))
    }

    const togglePermission = (r_permission) => {
        let _permission = [];
        rolePermissions.includes(r_permission) ?
            _permission = rolePermissions.filter(el => el !== r_permission) :
            _permission = [...rolePermissions, r_permission]
            ;
        setData('permissions', _permission)
        setRolePermissions(_permission)
    }

    const checkStatus = (r_permission) => {
        return rolePermissions.includes(r_permission)
    }



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData?.id) {
            patch("/roles/" + formData.id, { onSuccess: () => { onNewDataSucess(); toastnotify("New Permissions Synced", "Success") } })
        } else {
            toastnotify("Failed To Sync New Permission")
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])




    return (
        <form onSubmit={handleSubmit} className=' min-h-max pb-5'>
            <div className="grid grid-cols-2 sticky z-30 top-0 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 ">
                <div className="flex items-center md:ml-10">Permissions</div>
                <div className='text-center'>Status</div>
            </div>
            {
                allPermissions.map((permission, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className="grid grid-cols-2 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 ">
                                <div className="text-gray-800 md:ml-10 ">{permission} </div>
                                <Customcheckb
                                    checked={checkStatus(permission)}
                                    onChange={() => togglePermission(permission)} />
                            </div>
                        </React.Fragment>
                    );
                })}

            <nav className='flex items-center mt-auto px-4 bg-transparent'>
                <Button className='flex items-center justify-center gap-3' type='submit' size='full' processing={processing} onClick={ApplyNewPermissions} >
                    Sync New Permissions
                    <IconifyIcon className='bg-transparent' icon='ic:round-sync' />
                </Button >
            </nav>
            {isLoading && <div>

            </div>}

        </form>

    )
}