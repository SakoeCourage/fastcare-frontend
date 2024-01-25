"use client"
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface IBreackcrumbPaths {
    path: string;
    breadcrumbName: string;
}

interface BreadcrumbContextData {
    breadcrumbs: Array<IBreackcrumbPaths>;
    currentPage: string;
    setShowBreadcrumbs: React.Dispatch<React.SetStateAction<boolean>>;
}

const BreadcrumbContext = createContext({});

export const Breadcrumbserviceprovider = ({ children }: { children: React.ReactNode }) => {
    const currentPage = usePathname()
    const [breadcrumbs, setBreadcrumbs] = useState<Array<IBreackcrumbPaths>>([]);
    const [showBreadcrumbs, setShowBreadcrumbs] = useState<boolean>(true)

    useEffect(() => {
        setShowBreadcrumbs(true)
        if (currentPage) {
            const pathSegments = currentPage.split('/').filter((segment) => segment !== '');
            let breadcrumbPath = '';
            const breadcrumbsArray = pathSegments.map((segment, index) => {
                breadcrumbPath += `/${segment}`;
                const breadcrumbName = segment.charAt(0).toUpperCase() + segment.slice(1);
                return { path: breadcrumbPath, breadcrumbName };
            });

            setBreadcrumbs([{ path: "/", breadcrumbName: "Home" }, ...breadcrumbsArray]);
        }
    }, [currentPage]);


    const value = { breadcrumbs, currentPage, setShowBreadcrumbs }

    return <BreadcrumbContext.Provider value={value}>
        {showBreadcrumbs && <nav className="flex container mx-auto px-5 pt-4 pb-1" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse">
                {
                    !!breadcrumbs.length && breadcrumbs.map((breadcrumb, i) => {
                        return <li key={i}>
                            <Link href={breadcrumb.path} className="inline-flex hover:text-blue-500 hover:underline items-center text-sm font-normal text-gray-700 ">
                                {breadcrumb.breadcrumbName == "Home" ? <svg className="w-3 h-3 me-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg> :
                                    <svg className='rtl:rotate-180 w-3 h-3 text-gray-700' fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12.5 3.5l-4 14" /></svg>
                                }
                                <span className=' ml-1'>{breadcrumb.breadcrumbName.replaceAll("-", " ")}</span>
                            </Link>

                        </li>
                    })
                }

            </ol>
        </nav>}
        <> {children}</>
    </BreadcrumbContext.Provider>;
}

export function useBreadcrumb(): BreadcrumbContextData {
    if (BreadcrumbContext.Provider == null) throw ("Unable to unitilize Breadcrumb Service");
    return useContext(BreadcrumbContext) as BreadcrumbContextData
}


