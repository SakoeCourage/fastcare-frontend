import React from 'react'
import { useSession } from 'next-auth/react';
import { Permission } from '../types/entitiesDTO';
import { routesTypesDef, isSbWithLinksGuard, isSingleSbItemGuard } from '../types/portal/sidebar-typedef';
import { sidebarRoutes } from '../portal/portalayoutpartials/sideBarRoutes';

interface routeHasPermision {
    route: string,
    permisssions: Permission[]
}

export const getPermissionPerRoute = (): routeHasPermision[] => {
    let currentAbilities: routeHasPermision[] = [];
    sidebarRoutes.forEach(sbroute => {
        for (const route of sbroute.routes) {
            if (isSingleSbItemGuard(route)) {
                currentAbilities = [...currentAbilities, { route: route.link, permisssions: route.permissions }]
            }

            if (isSbWithLinksGuard(route)) {
                for (const r of route.links) {
                    currentAbilities = [...currentAbilities, { route: r.link, permisssions: r.permissions }]
                }
            }
        }

    })
    // console.log(currentAbilities)
    return currentAbilities;
}




interface IAccessControlProps {
    abilities: Permission[] | [],
    children: React.ReactNode
}


export const getAllRequiredAbilitiesPerRoute = (route: routesTypesDef): Permission[] | [] => {
    let currentAbilities = [];
    if (isSingleSbItemGuard(route)) {
        currentAbilities = [...currentAbilities, ...route.permissions]
    }
    if (isSbWithLinksGuard(route)) {
        for (const { permissions } of route.links) {
            currentAbilities = [...currentAbilities, ...permissions]
        }
    }
    return currentAbilities;
}

export const getAllSidebarSectionAbilities = (routes: routesTypesDef[]): Permission[] | [] => {
    let currentAbilities = [];
    routes.forEach(route => {
        currentAbilities = getAllRequiredAbilitiesPerRoute(route)
    })
    return currentAbilities;
}


export function AccessByPermission({ abilities, children }: IAccessControlProps) {
    const { data, status } = useSession();
    if (status !== "loading" && status == "authenticated") {
        const { name, permissions } = data?.user?.role;
        if (name.trim() === 'Super Admin') {
            return <> {children}</>;
        }

        if (name.trim() !== 'Super Admin') {
            for (const ability of abilities) {
                if (permissions.some((c_permission, i) => c_permission === ability)) {
                    return <> {children}</>;
                }
            }

        }
    }


}

