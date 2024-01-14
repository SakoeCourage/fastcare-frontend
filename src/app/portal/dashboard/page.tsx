"use client"
import React from 'react'
import Statsection from './partials/statsoverview/statsection'
import Recentpayments from './partials/Recentpayments'
import dynamic from 'next/dynamic'
const Statschart = dynamic(() => import('./partials/statsoverview/statschart'),   { ssr: false })

function page() {
  return (
    <div className=' h-full container mx-auto px-5'>
      <div className="flex lg:items-start flex-col  gap-3 mt-5">
        <Statsection />
        <nav className=' w-full grid grid-cols-1  lg:grid-cols-5  gap-5'>
          <Recentpayments />
          <Statschart />
        </nav>
      </div>
    </div>
  )
}

export default page