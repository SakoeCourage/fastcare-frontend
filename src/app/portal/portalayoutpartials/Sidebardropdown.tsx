"use client"
import Link from "next/link";
import { useState, useEffect, useRef, useLayoutEffect, forwardRef, ForwardedRef, useMemo, use } from 'react'
import React from 'react'
import { usePathname } from "next/navigation";
import { Icon } from '@iconify/react'
import classNames from "classnames";
import Sidebarpopup from "./Sidebarpopup";
import { useSidebar } from "app/app/providers/Sidebarserviceprovider";
import { AccessByPermission } from "app/app/accescontrol/accesscontrol";
import { sbitemWithLinks } from "app/app/types/portal/sidebar-typedef";

interface params extends sbitemWithLinks {
  toggleSidebar: () => void
}

export default function Sidebardropdown(props: params) {
  const { sidebarStateOpen, setSidebarItemLocation, setCurrentPopupElement, setPopupVisible, handleLeave, visibilityTimeout } = useSidebar()
  const { mini, full } = sidebarStateOpen
  const pathname = usePathname()
  const [isColapsed, setisColapsed] = useState(true)
  const [isIncurrentpathname, setisIncurrentpathname] = useState(false)
  let listitems = useRef<HTMLUListElement | null>(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const sidebarItemRef = useRef<HTMLDivElement | null>(null)

  const handleHover = () => {
    clearTimeout(visibilityTimeout.current!)
    if (sidebarItemRef.current) {
      const { top } = sidebarItemRef.current.getBoundingClientRect()
      const documentTop = window.scrollY || document.documentElement.scrollTop;
      const root = document.documentElement;
      const sbWidth = getComputedStyle(root).getPropertyValue('--sidebar-mini-width');
      const cuurentCp = <Sidebarpopup {...props} />
      if ((documentTop + top + listitems.current!.scrollHeight! ?? 0) >= window.innerHeight) {
        setSidebarItemLocation({
          top: window.innerHeight - 2 - listitems.current!.scrollHeight! ?? 0,
          left: sbWidth
        })

      } else {
        //Deducting 4 to compensate for box padding
        setSidebarItemLocation({
          top: (top + documentTop) - 4,
          left: sbWidth
        })
      }
      setCurrentPopupElement(cuurentCp);
      setPopupVisible(true);
    }

  };

  const getInitialRouteMatch: boolean = useMemo(function () {
    const match = pathname.match(/\/([^\/]+)/);
    if (match) {
      const extractedValue = match[1];
      return props.links.some(link => link.link.startsWith(`/portal/${extractedValue}`));
    } else {
      return false;
    }
  }, [pathname])

  useEffect(() => {
    setScrollHeight(listitems!.current!.scrollHeight)
    let checkisIncurrentpathname = Object.values(props.links)
      .map((value) => value.link)
      .some(value => pathname.startsWith(value))
    setisIncurrentpathname(checkisIncurrentpathname)
    setisColapsed(!checkisIncurrentpathname)
  }, [pathname])


  useLayoutEffect(() => {
    if (mini) {
      listitems!.current!.style.height = '0';
    } else {
      if (isColapsed) {
        listitems!.current!.style.height = '0';
      } else {
        listitems!.current!.style.height = `${scrollHeight}px`;
      }
    }
  }, [isColapsed, mini]);



  return (
    <div
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => handleLeave()}
      className=" overflow-visible relative"  >
      <nav className={
        classNames({
          'cursor-pointer  transition-all duration-200 w-full ': true,
          '!rounded-b-none': !isColapsed && isIncurrentpathname && !mini,
          'route-active ': isIncurrentpathname || getInitialRouteMatch,
          'route-inactive ': !isIncurrentpathname,
        })
      } onClick={() => { if (mini == false) setisColapsed(!isColapsed) }}
      >
        <nav
          ref={sidebarItemRef}
          className={`route-icon  p-[0.4rem] overflow-hidden  whitespace-nowrap rounded-full max-h-[2rem] max-w-[2rem] h-full w-full aspect-square flex items-center justify-center transition-all add-customer-bezier duration-300 ${mini && "mx-auto"}`}>
          <Icon fontSize={10} className="route-icon whitespace-nowrap h-full w-full" icon={props.icon} />
        </nav>
        <span className={`route-title ${mini ? 'hidden' : "transition-fadeIn"}`}>{props.title}</span>
        <svg className={` transfrom text-[#c7d2fe] transition-transform  !justify-self-end ml-auto ${mini ? 'hidden' : "transition-fadeIn"}  ${!isColapsed && ' rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" /></svg>
      </nav>
      <ul ref={listitems} className={`${isIncurrentpathname && "rounded-b-md"} overflow-hidden h-0  transition-all add-customer-bezier duration-300 bg-gray-500/30  list-none px-1 py-[0.03rem]  `}>
        {props.links.map((link, i) => <AccessByPermission key={i} abilities={link.permissions}>
          <li
            className=" list-none">
            <Link
              onClick={props.toggleSidebar}
              href={link.link}
              className={
                classNames({
                  'flex item-center gap-1   py-1 pl-2 w-full text-sm   ': true,
                  ' text-blue-400 rounded-md w-full font-semibold': pathname.startsWith(link.link),
                  ' text-[#c7d2fe]/80 font-normal': !pathname.startsWith(link.link)
                })}>
              <svg className={`my-auto transition-all  add-customer-bezier duration-300 ${mini && 'mx-auto'}`} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2" /></svg>
              <nav className={`route-title my-auto pl-1  ${mini ? 'hidden' : "transition-fadeIn"}`}> {link.title}</nav>
            </Link>
          </li>
        </AccessByPermission>
        )}
      </ul>
      <nav className={`${mini ? 'block' : 'hidden'} text-[#bae6fd] truncate text-center px-0 w-full text-[0.65rem] font-semibold`}>{props.miniTitle}</nav>
    </div>
  );
}