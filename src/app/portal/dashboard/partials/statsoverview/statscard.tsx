"use client"
import React from 'react'
import { formatnumber, formatcurrency } from 'app/app/lib/utils'


const colors_sets: Array<string> = ['#22c55e', '#64748b', '#fde047', '#92400e', '#15803d', '#312e81', '#fda4af', '#1e293b', '#84cc16', '#312e81']

interface Iparam {
    className?: string,
    title: string,
    totalNumberOfPolicies: number,
    totlaPremiums: number,
}

function statscard(props: Iparam) {



    return (
        <nav className={`w-full h-full flex flex-col gap-4 rounded-sm shadow-md p-5 ${props.className}`}>
            <nav className='flex flex-col'>
                <h1 className='font-medium'>
                    {props.title}
                </h1>
                <h2 className=' text-xs'>
                    {props.totalNumberOfPolicies}
                </h2>
            </nav>
            <nav className=' font-bold text-xl'>
                {formatcurrency(props.totlaPremiums)}
            </nav>
        </nav>
    )
};
export default statscard