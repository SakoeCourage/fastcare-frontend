"use client"
import React from 'react'
import IconifyIcon from 'app/app/components/ui/Iconsbutton'
import { formatcurrency } from '@/lib/utils'

interface ICoverType {
    coverName: string,
    totalPremiums: number
}

const coverStats: ICoverType[] = [
    {
        coverName: "Comprehensive",
        totalPremiums: 40000
    },
    {
        coverName: "Third Party",
        totalPremiums: 6000
    },
    {
        coverName: "Third Party Fire & Theft",
        totalPremiums: 750
    }
]

const Analiticcard = (props: ICoverType): React.JSX.Element => {
    return <nav className='grid grid-cols-4 gap-5 '>
        <IconifyIcon icon='ci:car-auto' className=' text-indigo-500 h-full w-full col-span-1 shadow-md' />
        <nav className="flex items-start gap-1 col-span-3 flex-col text-sm my-auto">
            <h2 className='text-blue-950 font-semibold'>{props.coverName}</h2>
            <h4 className='text-blue-950 font-normal'>
                Premiums: {formatcurrency(props.totalPremiums)}
            </h4>
        </nav>
    </nav>
}


function motoranalysis() {
    return (
        <div className=' bg-white px-6 basis-full border rounded-md lg:basis-[30%] w-full flex-grow max-w-sm mx-auto'>
            <nav className='py-4 font-semibold text-lg text-gray-700 border-b'>Motor Analysis</nav>
            <div className="flex flex-col gap-5 py-3">
                {coverStats.map((cover, i) => <Analiticcard key={i} {...cover} />)}
            </div>
        </div>
    )
}

export default motoranalysis