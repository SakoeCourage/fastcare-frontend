export type singleSbItem = {
    title: string;
    icon: string;
    link: string;
    links?: undefined
}

export type sbitemWithLinks = {
    title: string;
    icon: string;
    links: {
        title: string;
        link: string;
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