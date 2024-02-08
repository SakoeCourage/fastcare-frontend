"use client"
import React, { useEffect, useState, useRef } from "react";
import Sidebardropdown from "./portalayoutpartials/Sidebardropdown";
import { sidebarRoutes as sideBarSections } from "./portalayoutpartials/sideBarRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icon } from '@iconify/react'
import SimpleBar from "simplebar-react";
import { useSidebar } from "../providers/Sidebarserviceprovider";
import { motion, AnimatePresence } from "framer-motion"
import { routesTypesDef, isSingleSbItemGuard, isSbWithLinksGuard, singleSbItem } from "../types/portal/sidebar-typedef";
import { AccessByPermission, getAllRequiredAbilitiesPerRoute, getAllSidebarSectionAbilities } from "../accescontrol/accesscontrol";

interface params extends singleSbItem { toggleSidebar: () => void }
function Sidebarlink(props: params) {
    const { sidebarStateOpen } = useSidebar()
    const { mini, full } = sidebarStateOpen
    const pathname = usePathname()

    return <Link
        onClick={props.toggleSidebar}
        href={props.link}
        className={pathname.startsWith(props.link) ? 'route-active' : 'route-inactive'} >
        <nav className={`route-icon overflow-hidden  p-[0.4rem] rounded-full max-h-[2rem] max-w-[2rem] h-full w-full aspect-square flex items-center justify-center ${mini && "mx-auto"}`}>
            <Icon fontSize={40} className=" h-full w-full" icon={props.icon} />
        </nav>
        <span className={`route-title ${mini ? 'hidden' : "transition-fadeIn"} `}>{props.title}</span>
    </Link>
}


export default function Sidebar() {
    const { toggleSideBar, sidebarStateOpen, isPopupVisible, currentPopupElement, handleLeave, setPopupVisible, visibilityTimeout, sidebarItemLocation } = useSidebar()

    return (
        <div className={`h-screen  overflow-visible   fixed  inset-0 z-50 md:z-auto md:relative md:block  !bg-white  transition-[left] add-sidebar-bezier  ${sidebarStateOpen.mini ? 'w-[var(--sidebar-mini-width)]' : 'w-[var(--sidebar-width)]'}  ${sidebarStateOpen.full ? 'sidebaropened' : 'sidebarclosed'}`}>
            <AnimatePresence>
                {sidebarStateOpen.mini
                    && isPopupVisible
                    && <motion.div initial={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        onMouseOver={() => { clearTimeout(visibilityTimeout.current!); setPopupVisible(true) }}
                        onMouseOut={() => handleLeave()}
                        className=" transition-all add-customer-bezier" style={{ position: 'fixed', zIndex: "50", left: sidebarItemLocation.left, top: sidebarItemLocation.top }}>
                        {currentPopupElement}
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {sidebarStateOpen.mini
                    && isPopupVisible
                    && <motion.div initial={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }} className=" fixed  inset-0 left-[var(--sidebar-mini-width)]  block transition-all add-customer-bezier duration-300  z-40 bg-gray-600/60">
                    </motion.div>
                }
            </AnimatePresence>

            <div className=" h-full w-full bg-[#132743]   ">
                <nav className="   h-[var(--header-height)] z-50 flex items-center justify-between  w-full   text-white py-1 ">
                    <nav className="px-5 flex items-center z-50 h-3/4 object-contain">
                        <Image className=" object-contain h-full z-50" src="/images/fastcarelogo.png" alt="slico-icon" width={150} height={100} quality={100} />
                    </nav>
                </nav>
                <SimpleBar forceVisible="y" autoHide={true} className="w-full overflow-x-hidden z-50 basis-auto flex flex-col gap-5  list-none py-1 h-[calc(100vh-var(--header-height))]">
                    {sideBarSections.map((section, i) => <AccessByPermission key={i} abilities={getAllSidebarSectionAbilities(section.routes)}>
                        <nav key={i} className="w-full flex flex-col gap-3 text-sm tracking-tight capitalize whitespace-nowrap"  >
                            <nav className={` flex items-center transition-all  px-4 pt-6 py-2 truncate w-full uppercase tracking-wide text-gray-300/60 text-xs font-medium ${sidebarStateOpen.mini && ' justify-center w-full !text-[0.6rem]'}`}>{section.sectionName}</nav>
                            <ul className=" w-full basis-auto px-3  flex flex-col gap-1 h-full min-h-max list-none">
                                {section.routes.map((route, i) => <AccessByPermission key={i} abilities={getAllRequiredAbilitiesPerRoute(route)}>
                                    <li className="w-full text-sm tracking-tight capitalize whitespace-nowrap"  >
                                        {isSingleSbItemGuard(route) ?
                                            <Sidebarlink
                                                toggleSidebar={toggleSideBar}
                                                {...route}
                                            /> :
                                            <Sidebardropdown
                                                toggleSidebar={toggleSideBar}
                                                {...route}
                                            />
                                        }
                                    </li>
                                </AccessByPermission>
                                )

                                }
                            </ul>
                        </nav>
                    </AccessByPermission >
                    )}
                </SimpleBar>
            </div>
        </div>
    );
}