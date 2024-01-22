"use client"
import React, { useState } from 'react'
import Profile from './profile'
import Changecredentials from './changecredentials'
import Tooltip from 'app/app/components/ui/tooltip'
import IconifyIcon from 'app/app/components/ui/iconsbutton'

export interface IComponents { [key: string]: React.FC<{ setComponent: React.Dispatch<React.SetStateAction<componentsType>> }> }

export const components: IComponents = {
    Profile: Profile,
    Changecredentials: Changecredentials
}

export type componentsType = keyof typeof components;

function Index() {
    const [component, setComponent] = useState<componentsType>("Profile")
    const Component = components[component]

    return (<div className="py-8 p-4  container mx-auto">
        <div className='border bg-white pb-8 rounded-md'>
            <div className="w-full ">
                <div className=' transform -translate-y-5 max-w-5xl mx-auto w-full flex items-center justify-start'>
                    <div className="relative flex items-center gap-3 ">
                        <div className={` border bg-red-500/70 backdrop-blur-md  border-gray-300 text-5xl text-white h-28 md:h-32 grid place-items-center  rounded-full aspect-square `}>
                            J
                        </div>
                        <div className='flex flex-col gap-1'>
                            <nav className='  text-[#132743] flex flex-col items-start  rounded-md text-sm'>
                                <nav className=' font-semibold text-lg'> Jay Keys</nav>
                                <nav className='text-xs'>
                                    akorlicourage@gmail.com
                                </nav>
                            </nav>
                            <Tooltip toolTipText="Reset Password">
                                <button onClick={() => setComponent('Changecredentials')} className={` p-1 px-2 text-red-500 bg-red-100/25  items-center  rounded-md text-sm ${component === "Profile" ? "flex" : "hidden"} `}>
                                    <IconifyIcon className='mr-2 bg-red-100' fontSize={15} icon="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write" />
                                    Reset Password
                                </button>
                            </Tooltip>
                        </div>

                    </div>
                </div>
            </div>
            <div className=' max-w-5xl mx-auto mt-5 px-2 '>
                <Component setComponent={setComponent} />
            </div>
        </div>
    </div>
    )
}

export default Index