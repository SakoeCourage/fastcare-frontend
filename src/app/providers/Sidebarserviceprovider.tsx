"use client"
import React, { useState, createContext, useContext, useEffect, useRef, useLayoutEffect } from 'react'
const sideBarContext = createContext({});

const miniSidebarLocalStorageKey: string = "sidebar-mini"

type sideBarOpenstateOptions = {
    mini: boolean,
    full: boolean
}
interface sidebarContextParams {
    sidebarStateOpen: sideBarOpenstateOptions,
    setSidebarStateOpen: React.Dispatch<React.SetStateAction<sideBarOpenstateOptions>>
    toggleSideBar: () => void,
    toggleMiniSidebar: () => void,
    sidebarItemLocation: { top: number; left: string }
    setSidebarItemLocation: React.Dispatch<React.SetStateAction<{ top: number; left: string }>>
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isPopupVisible: boolean
    visibilityTimeout: React.MutableRefObject<NodeJS.Timeout | null>
    handleLeave: () => void,
    currentPopupElement: React.JSX.Element | null,
    setCurrentPopupElement: React.Dispatch<React.SetStateAction<React.JSX.Element | null>>
}
interface ISidebarparams {
    children: React.ReactNode
}

function Sidebarserviceprovider({ children }: ISidebarparams) {
    const [sidebarStateOpen, setSidebarStateOpen] = useState<sideBarOpenstateOptions>(
        {
            mini: false,
            full: false
        })

    const visibilityTimeout = useRef<NodeJS.Timeout | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [sidebarItemLocation, setSidebarItemLocation] = useState({
        top: 0,
        left: ""
    })
    const [currentPopupElement, setCurrentPopupElement] = useState<React.JSX.Element | null>(null)

    const handleLeave = () => {
        if (visibilityTimeout.current) {
            clearTimeout(visibilityTimeout.current)
        }
        visibilityTimeout.current = setTimeout(() => {
            setPopupVisible(false)
        }, 200)
    };

    const toggleSideBar = (): void => setSidebarStateOpen({
        full: false,
        mini: sidebarStateOpen.mini
    })

    const handleOnWindowResize = () => {
        if (window.innerWidth <= 768) {
            setSidebarStateOpen({
                full: false,
                mini: false
            })
        } else {
            setSidebarStateOpen({
                full: false,
                mini: localStorage.getItem(miniSidebarLocalStorageKey) ? true : false,
            })
        }

    }

    const toggleMiniSidebar = () => {
        const isLocalStorageSet = localStorage.getItem(miniSidebarLocalStorageKey)
        if (!isLocalStorageSet) {
            localStorage.setItem(miniSidebarLocalStorageKey, "true")
            setSidebarStateOpen((cv) => cv = { full: cv.full, mini: true })
        } else {
            localStorage.removeItem(miniSidebarLocalStorageKey)
            setSidebarStateOpen((cv) => cv = { full: cv.full, mini: false })
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleOnWindowResize, true);
        return () => window.removeEventListener('resize', handleOnWindowResize, true)
    }, [])

    useLayoutEffect(() => {
        setSidebarStateOpen({
            mini: localStorage.getItem(miniSidebarLocalStorageKey) ? true : false,
            full: false
        })
    }, [])

    const values: sidebarContextParams = {
        sidebarStateOpen,
        setSidebarStateOpen,
        toggleSideBar,
        toggleMiniSidebar,
        isPopupVisible,
        setPopupVisible,
        currentPopupElement,
        setCurrentPopupElement,
        handleLeave,
        visibilityTimeout,
        setSidebarItemLocation,
        sidebarItemLocation
    }

    return (
        <sideBarContext.Provider value={values}>
            {children}
        </sideBarContext.Provider>
    )
}
export default Sidebarserviceprovider

export function useSidebar(): sidebarContextParams {
    if (sideBarContext.Provider == null) throw ("Unable to start Sidebar Service");
    return useContext(sideBarContext) as sidebarContextParams
}