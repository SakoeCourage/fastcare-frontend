import { Permission } from "../entitiesDTO";


export const isSingleSbItemGuard = (ssbi: routesTypesDef): ssbi is singleSbItem => {
    return ssbi.links === undefined
}
export const isSbWithLinksGuard = (ssbi: routesTypesDef): ssbi is sbitemWithLinks => {
    return ssbi.link === undefined
}

export type singleSbItem = {
    title: string;
    icon: string;
    link: string;
    links?: undefined
    permissions: Permission[] | []
}

export type sbitemWithLinks = {
    title: string;
    icon: string;
    links: {
        title: string;
        link: string;
        permissions: Permission[] | []
    }[];
    link?: undefined
}

/**
 * Variants of sidebar routes
 */
export type routesTypesDef = singleSbItem | sbitemWithLinks
/**
 * Typical Sidebar section
 */
export type routesListWitSections = {
    sectionName: string,
    routes: routesTypesDef[]
}[]