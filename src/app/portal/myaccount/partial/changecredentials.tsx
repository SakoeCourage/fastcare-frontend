import React, { FormEvent, useEffect } from 'react'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { Input } from 'app/app/components/form-components/input'
import { Button } from 'app/app/components/form-components/button'
import { componentsType } from './index'
import useForm from 'app/app/hooks/formHook/useForm'
import { useSession, signOut } from 'next-auth/react'
import { DialogService } from 'app/app/providers/Dailogueserviceprovider'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { z } from 'zod'

interface passwordChangeDto {
    oldPassword: string
    newPassword: string,
    passwordConfirmation: string,
}


function Changecredentials({ changeView }: { changeView: (comp: componentsType) => void }) {
    const { setDialogData } = DialogService()
    const { data, setData, put, errors, setValidation } = useForm<passwordChangeDto>({
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: ""
    })

    setValidation({
        oldPassword: z.string().min(5, "Password too short"),
        newPassword: z.string().min(5, "Password too short")
            .refine((value) => value === data.passwordConfirmation, {
                message: "Passwords do not match",
                path: ["newPassword"]
            }),
        passwordConfirmation: z.string().min(5, "Password too short"),

    })

    const hanldeSignOut = async () => {
        try {
            await signOut({
                redirect: false
            })
            window.location.href = "/login"
        } catch (error) {
            toastnotify("Failed to sign out")
        }
    }

    const handleFormSubmission = (e: FormEvent) => {
        e.preventDefault()

        setDialogData({
            open: true,
            title: "Reset Password",
            promptText: "You may be logged out. Subsequent login will require you new password",
            okText: "Continue",
            cancelText: "Cancel",
        })
            .onDialogConfirm(() => {
                put('/users/change-password', {
                    onSuccess: () => {
                        toastnotify("Password Has Been Changed", "Success");
                        hanldeSignOut();
                    }
                })
            })
            .onDialogDecline(() => { })
    }



    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <form onSubmit={handleFormSubmission} className='flex flex-col gap-5'>
            <nav className=' py-2 flex items-center  gap-1 text-gray-500'>
                <nav className=' text-2xl'>Password Reset</nav>
            </nav>
            <Input
                onChange={(e) => setData('oldPassword', e.target.value)}
                value={data?.oldPassword}
                error={errors?.oldPassword}
                type="password" label="Current Password"
                placeholder="Enter Current Password"
            />
            <Input
                onChange={(e) => setData('newPassword', e.target.value)}
                value={data?.newPassword}
                error={errors?.newPassword}
                type="password"
                label="New Password"
                placeholder="Enter New Password" />

            <Input
                onChange={(e) => setData('passwordConfirmation', e.target.value)}
                value={data?.passwordConfirmation}
                error={errors?.passwordConfirmation}
                type="password"
                label="Confirm Password"
                placeholder="Confirm New Password" />

            <div className='grid grid-cols-2 gap-2'>
                <Button onClick={() => changeView("profile")} size='full' variant="outline">
                    Cancel
                </Button>
                <Button size='full' variant='primary'>
                    Reset Password
                </Button>
            </div>
        </form>
    )
}

export default Changecredentials