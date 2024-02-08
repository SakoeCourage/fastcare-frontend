import { Permission } from "../types/entitiesDTO"
import { isSingleSbItemGuard, isSbWithLinksGuard } from "../types/portal/sidebar-typedef"
import { sidebarRoutes } from "../portal/portalayoutpartials/sideBarRoutes"

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
    return currentAbilities;
}