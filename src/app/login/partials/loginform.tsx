"use client";
import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Button } from 'app/app/components/form-components/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation';
import { z, ZodError } from 'zod'
import { toastnotify } from 'app/app/providers/Toastserviceprovider';
import { useRouter } from 'next/navigation';
import { RequestEvents } from 'app/app/fetch/apiEvent';

interface userLoginCredentials {
    username: string,
    password: string
}

const initialData: userLoginCredentials = {
    username: "",
    password: ""
}

/**
 * @default
 *  username: "adusman100@gmail.com",
 *  password: "cHpuMxgx",
 *  
 */

function Loginform() {
    const searchParam = useSearchParams();
    const router = useRouter();
    const [loginCredentials, setLoginCredentials] = useState<userLoginCredentials>(initialData)
    const [errors, setErrors] = useState<userLoginCredentials>(initialData)
    const [loading, setIsLoading] = useState<boolean>(false)

    const schema = z.object({
        username: z.string().min(3, "Username is required"),
        password: z.string().min(3, "Password is required")
    })
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const callbackUrl = window.localStorage.getItem(RequestEvents.REQUEST_CALLBACK_URL_CONSTACT);
        setErrors(initialData)
        try {
            setIsLoading(true)
            schema.parse(loginCredentials)
            const data = await signIn("credentials", {
                username: loginCredentials.username,
                password: loginCredentials.password,
                redirect: false
            })
            if (data) {
                const { error, status, ok, } = data
                if (error) throw new Error(error)
                if (ok == true) window.location.href = callbackUrl ?? '/portal/dashboard'
                window.localStorage.removeItem(RequestEvents.REQUEST_CALLBACK_URL_CONSTACT)
            }
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof z.ZodError) {
                error.issues.forEach((err) => {
                    setErrors(cv => ({ ...cv, [err.path[0]]: err.message }));
                });
            } else if (error instanceof Error) {
                toastnotify("Invalid Username or Password")
            } else {
                toastnotify("Sign in failed. Try again later")
            }
            setIsLoading(false)
        } finally {
        }
    }

    return (
        <form onSubmit={handleLogin} className='flex flex-col gap-4 items-center justify-center max-w-[20rem] mx-auto my-auto  h-full'>
            <nav className=' text-xl text-orange-700 mb-3 font-medium'>
                Sign In To Your Account
            </nav>
            <Input type='email' value={loginCredentials.username} error={errors.username} onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })} className=' w-full' placeholder='example@email.com' label='Email' required />
            <Input type='password' value={loginCredentials.password} error={errors.password} onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} className=' w-full' placeholder='password' label='Password' required />
            <Button processing={loading} type='submit' className=' !bg-[#4880FF]' size="full" >
                Sign In
            </Button >
            <nav className=' mt-3 text-sm text-gray-600'>
                Forgot Password?
            </nav>
        </form>
    )
}

export default Loginform