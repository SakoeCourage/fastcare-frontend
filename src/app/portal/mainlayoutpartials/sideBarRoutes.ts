import type { routesListWitSections } from "app/app/types/portal/sidebar-typedef";

export let sidebarRoutes: routesListWitSections =
    [
        {
            sectionName: "Basics",
            routes: [
                {
                    title: 'Dashboard',
                    icon: "mingcute:grid-fill",
                    link: '/dashboard',
                },
                {
                    title: "Payments",
                    icon: "fa6-solid:money-check",
                    links: [
                        {
                            title: "View Payments",
                            link: '/viewpayments'
                        },
                        {
                            title: "Make Payment",
                            link: '/makepayment'
                        },
                        {
                            title: "Payment Confirmation",
                            link: '/paymentconfirmation'
                        },
                    ],
                },
                {
                    title: "Customer Care Center",
                    icon: "streamline:information-desk-customer-solid",
                    links: [
                        {
                            title: "Call Subscibers",
                            link: '/callsubscribers'
                        }
                    ]
                },
                {
                    title: "Auto-Debit OPS",
                    icon: "mdi:credit-card-check",
                    links: [
                        {
                            title: "Check Mandate Details",
                            link: '/checkmandate'
                        },
                        {
                            title: "Unmandated Subscribers",
                            link: '/unmandate'
                        }
                    ]
                },
                {
                    title: "Staff & Users ",
                    icon: "ooui:user-group-rtl",
                    links: [
                        {
                            title: "Staff",
                            link: '/staff'
                        },
                        {
                            title: "User Account",
                            link: '/useraccount'
                        },
                        {
                            title: "Reset Password",
                            link: '/resetpassword'
                        },
                    ],
                }

            ]
        },
        {
            sectionName: "SUBSCRIPTION",
            routes: [
                {
                    title: "Individual Subscription",
                    icon: "bi:person-fill-check",
                    link: "/not found"
                },
                {
                    title: "Individual And Group",
                    icon: "fa:users",
                    link: "/not found"
                },
                {
                    title: "Family Subscriptions ",
                    icon: "material-symbols:family-restroom",
                    links: [
                        {
                            title: 'Family Subscription',
                            link: '/settings/intermediaries/all',
                        },
                        {
                            title: 'Family Plan Members',
                            link: '/settings/intermediaries/brokers',
                        },
                        {
                            title: 'View Family Subs',
                            link: '/settings/intermediaries/brokers',
                        },
                    ]
                },
                {
                    title: "Corporate Subscriptions ",
                    icon: "ic:round-corporate-fare",
                    links: [
                        {
                            title: 'Corporate Subscription',
                            link: '/settings/intermediaries/all',
                        },
                        {
                            title: 'Corporate Plan Members',
                            link: '/settings/intermediaries/brokers',
                        },
                        {
                            title: 'View Corporate Subs',
                            link: '/settings/intermediaries/brokers',
                        },
                    ]
                },
                {
                    title: "Data Migraion ",
                    icon: "ep:upload-filled",
                    links: [
                        {
                            title: 'Import Data',
                            link: '/settings/intermediaries/all',
                        },
                        {
                            title: 'Complete Migrate Subs',
                            link: '/settings/intermediaries/brokers',
                        }
                    ]
                },
            ]

        },

        {
            sectionName: "Reporting",
            routes: [
                {
                    title: "Subscribers View",
                    icon: "icon-park-solid:book",
                    link: "/not"
                },
                {
                    title: "Facility Performance",
                    icon: "icon-park-solid:book",
                    link: "/not"
                },
                {
                    title: "Staff Collection Perf.",
                    icon: "icon-park-solid:book",
                    link: "/not"
                },
                {
                    title: "Agents Commision List",
                    icon: "icon-park-solid:book",
                    link: "/not"
                },
            ]
        },
        {
            sectionName: "SETUPS",
            routes: [
                {
                    title: 'Facility Setup',
                    icon: "mdi:gear",
                    link:"/none"
                },
                {
                    title: 'Package Setup',
                    icon: "mdi:gear",
                    link:"/none"
                },
                {
                    title: 'Call Commentry Category',
                    icon: "mdi:gear",
                    link:"/none"
                },
                {
                    title: 'Groups and Associations',
                    icon: "mdi:gear",
                    link:"/none"
                },
            ]
        }

    ]
    ;