import React from 'react'
import Image from 'next/image'
import Loginform from './partials/loginform'
import Loginviewsvg from './partials/loginviewsvg'
function page() {

  return (
    <div className='login-page isolate flex items-center relative'>
      <div className='z-0 !h-screen w-[70%] hidden lg:block  absolute inset-y-0 right-0 '>
        <svg width="100%" height="100%" viewBox="0 0 1210 970" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cy="720" r="362" fill="#264ECA" />
          <circle cy="720" r="286" fill="#244BC5" />
          <circle cy="720" r="219" fill="#274FC7" />
          <path d="M672.5 139C536.9 151.8 444.667 51 415.5 -1L1279.5 2.5V720.5H1183C884.2 682.5 934.5 531 997 460C1033.5 410.167 1099.5 290.1 1071.5 208.5C1036.5 106.5 842 123 672.5 139Z" fill="#264ECA" />
        </svg>
      </div>
      <div className=' z-10 p-2 lg:p-0 max-w-5xl flex flex-col  w-full mx-auto h-[calc(min(85vh,700px))]'>
        <Image className=" basis-11 object-contain" priority src="/images/fastcarelogo.png" alt="slico-icon" width={150} height={100} quality={100} />
        <div className='flex grow '>
          <div className='basis-[60%] hidden md:block my-auto rounded-l-md overflow-hidden max-h-[90%] h-full isolate relative '>
            <div className='absolute inset-0 z-20 flex items-center justify-center h-full w-full'>
              <div className=' text-4xl font-bold add-ts text-[#FFFFF0] max-w-lg text-center mx-auto'>
                Welcome to the Fast Care Clinics Portal!
              </div>
            </div>
            <div className="absolute z-10 inset-0  bg-gradient-to-tr from-black via-blue-600 to-black opacity-[0.55]"></div>
            <Loginviewsvg />
          </div>
          <div className=' basis-full md:basis-[40%] h-full  items-center justify-center bg-white rounded-md '>
            <Loginform />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page