"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import { sidebarRoutes } from './sideBarRoutes'
import { sbitemWithLinks } from 'app/app/types/portal/sidebar-typedef'

interface Iprops {
  icon: string,
  title: string,
  link: string
}
function Routelistcard({ icon, title, link }: Iprops) {
  return <Link href={link && link} className=' overflow-hidden shadow-md rounded-md flex flex-col gap-8 bg-[#F8FFF8] p-3 py-4 border border-t-[#4E54FE] border-l-[6px] border-l-[#4E54FE]'>
    <IconifyIcon className=' text-blue-500' icon={icon} />
    <nav>
      <h6 className=' font-medium my-2 text-base text-gray-600'>{title}</h6>
      <nav className=' text-[#707070] text-xs rounded-full border p-2 w-max flex items-center gap-2'>
        <nav>Go to {title}</nav>
        <svg className=' text-gray-500/75 ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path strokeWidth="1px" fill="currentColor" d="M4 19.999a.999.999 0 0 1-1-1v-1a9.98 9.98 0 0 1 8-9.796V6.499c0-.534.208-1.036.585-1.414c.756-.757 2.075-.756 2.829-.001l6.288 6.203a.996.996 0 0 1 0 1.424l-6.293 6.207c-.746.746-2.067.751-2.823-.005A1.986 1.986 0 0 1 11 17.499v-1.437c-2.495.201-4.523.985-6.164 3.484a1 1 0 0 1-.836.453m8-5.989l1-.01v3.499l5.576-5.5L13 6.503V10s-.384-.004-.891.052a7.982 7.982 0 0 0-6.892 6.08C7.338 14.404 9.768 14.066 12 14.01" /></svg>
      </nav>
    </nav>
  </Link>
}


function Routelistcardrender({ title }: { title: String }) {

  function isSbitemWithLinks(obj: any): obj is sbitemWithLinks {
    return obj && typeof obj === 'object' && 'links' in obj;
  }

  function getRouteLinks(): sbitemWithLinks | undefined {
    for (const section of sidebarRoutes) {
      for (const route of section.routes) {
        if (route.title === title && isSbitemWithLinks(route)) {
          return route;
        }
      }
    }
    return undefined;
  }

  return (
    <div className='container mx-auto p-5 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {getRouteLinks()!.links.map((link, i) => <Routelistcard
        key={i}
        icon={getRouteLinks()!.icon}
        title={link.title}
        link={link.link}
      />)}
    </div>
  )
}

export default Routelistcardrender