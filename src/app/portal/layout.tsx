"use client"
import Sidebar from './sidebar'
import Header from './header';
import { Breadcrumbserviceprovider } from '../providers/Breadcrumbserviceprovider';
import { useSidebar } from '../providers/Sidebarserviceprovider';
import { useEffect, useState } from 'react';


export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const { sidebarStateOpen } = useSidebar()
  const { mini, full } = sidebarStateOpen

 

  return (
    <main className='flex overflow-hidden'>
      {/* Sidebar starts here */}
      <Sidebar />
      {/* Main  section here */}
      <main className={`flex flex-col w-full grow transition-none ${mini ? 'md:w-[calc(100vw-var(--sidebar-mini-width))]' : 'md:w-[calc(100vw-var(--sidebar-width))]'}`}>
        {/* Main  section header */}
        <Header />
        <section id='outlet' className='h-[calc(100vh-var(--header-height))] bg-gray-50/60 pb-4 overflow-y-scroll overflow-x-hidden '>
          <Breadcrumbserviceprovider>
            {children}
          </Breadcrumbserviceprovider>
        </section>
      </main>
    </main>
  )
}
