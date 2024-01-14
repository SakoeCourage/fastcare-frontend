"use client"
import React from 'react'
import Statscard from './statscard'
import { formatcurrency } from 'app/app/lib/utils'

function statsection() {
    return (
        <div className='w-full '>
            <nav className=' font-bold text-base text-gray-500 my-5'>
                Statistic Overview
            </nav>
            <nav className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                {/* Card */}
                <Statscard
                    totalNumberOfPolicies={232}
                    totlaPremiums={2389823}
                    title='Total Subscription'
                    className='bg-[#16a34a]  text-orange-50 '
                />
                <Statscard
                    totalNumberOfPolicies={100}
                    totlaPremiums={238}
                    title='Good Standing'
                    className='bg-[#678AE2]  text-blue-50'
                />
                <Statscard
                    totalNumberOfPolicies={23}
                    totlaPremiums={9823}
                    title='Defaulters'
                    className='bg-[#9262C9]  text-indigo-50'
                />
                <Statscard
                    totalNumberOfPolicies={32}
                    totlaPremiums={9823}
                    title='Inactive'
                    className='bg-[#53CEC1]  text-green-50  '
                />
            </nav>

        </div>
    )
}

export default statsection