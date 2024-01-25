"use client";
import React from 'react'
import { Input } from 'app/app/components/form-components/input'
import { Button } from 'app/app/components/form-components/button'
import { signIn } from 'next-auth/react'

function loginform() {
    const handleLogin = async () => {
        signIn("credentials", {
            username: "adusman100@gmail.com",
            password: "cHpuMxgx",
            redirect: false
        }).then(res => {
            console.log(res)
        })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <nav className='flex flex-col gap-4 items-center justify-center max-w-[20rem] mx-auto my-auto  h-full'>
            <nav className=' text-xl text-orange-700 mb-3 font-medium'>
                Sign In To Your Account
            </nav>
            <Input className=' w-full' placeholder='example@email.com' label='Email' required />
            <Input className=' w-full' placeholder='password' label='Password' required />
            <Button onClick={() => handleLogin()} className=' !bg-[#4880FF]' size="full" >
                Sign In
            </Button >
            <nav className=' mt-3 text-sm text-gray-600'>
                Forgot Password?
            </nav>
        </nav>
    )
}

export default loginform