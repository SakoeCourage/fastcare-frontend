import type { routesListWitSections } from "app/app/types/portal/sidebar-typedef";

export let sidebarRoutes: routesListWitSections =
    [
        {
            sectionName: "Basics",
            routes: [
                {
                    title: 'Dashboard',
                    icon: "mingcute:grid-fill",
                    link: '/portal/dashboard',
                },
                {
                    title: "Payments",
                    icon: "fa6-solid:money-check",
                    links: [
                        {
                            title: "View Payments",
                            link: '/portal/payments/viewpayments'
                        },
                        {
                            title: "Make Payment",
                            link: '/portal/payments/makepayment'
                        },
                        {
                            title: "Payment Confirmation",
                            link: '/portal/payments/paymentconfirmation'
                        },
                    ],
                },
                {
                    title: "Customer Care Center",
                    icon: "streamline:information-desk-customer-solid",
                    links: [
                        {
                            title: "Call Subscibers",
                            link: '/portal/customercare/callsubscribers'
                        }
                    ]
                },
                {
                    title: "Auto-Debit OPS",
                    icon: "mdi:credit-card-check",
                    links: [
                        {
                            title: "Check Mandate Details",
                            link: '/portal/autodebitoperation/checkmandate'
                        },
                        {
                            title: "Unmandated Subscribers",
                            link: '/portal/autodebitoperation/unmandatedsubscribers'
                        }
                    ]
                },
                {
                    title: "Staff & User Onboarding",
                    icon: "ooui:user-group-rtl",
                    links: [
                        {
                            title: "Staff Onboarding",
                            link: '/portal/staffsandusers/staffonboarding'
                        },
                        {
                            title: "User Onboarding",
                            link: '/portal/staffsandusers/useronboarding'
                        },
                        {
                            title: "Reset Password",
                            link: '/portal/myaccount'
                        },
                        {
                            title: "User Roles & Permissions",
                            link: '/portal/staffsandusers/user-roles-and-permission'
                        },
                    ],
                }

            ]
        },
        {
            sectionName: "SUBSCRIPTION",
            routes: [
                // {
                //     title: "Individual Subscription",
                //     icon: "bi:person-fill-check",
                //     link: "/not found"
                // },
                {
                    title: "Individual And Group",
                    icon: "fa:users",
                    link: "/portal/individual-group-subscription"
                },
                {
                    title: "Family Subscription",
                    icon: "material-symbols:family-restroom",
                    links: [
                        {
                            title: 'Family Subscibers',
                            link: '/portal/familysubscription/familysubscribers',
                        },
                        {
                            title: 'Family Plan Members',
                            link: '/portal/familysubscription/familyplanmembers',
                        },
                        {
                            title: 'View Family Subs',
                            link: '/portal/familysubscription/viewfamilysubscription',
                        },
                    ]
                },
                {
                    title: "Corporate Subscription",
                    icon: "ic:round-corporate-fare",
                    links: [
                        {
                            title: 'Corporate Subscribers',
                            link: '/portal/corporatesubscription/corporatesubscribers',
                        },
                        {
                            title: 'View Corporate Subs',
                            link: '/portal/corporatesubscription/viewcorporatesubscription',
                        },
                    ]
                },
                {
                    title: "Data Migration",
                    icon: "ep:upload-filled",
                    links: [
                        {
                            title: 'Import Data',
                            link: '/portal/datamigration/importdata',
                        },
                        {
                            title: 'Complete Migrate Subs',
                            link: '/portal/datamigration/completemigratedsubs',
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
                    link: "/portal/subscribers"
                },
                {
                    title: "Facility Performance",
                    icon: "icon-park-solid:book",
                    link: "/portal/facilitiesperformance"
                },
                {
                    title: "Staff Collection Perf.",
                    icon: "icon-park-solid:book",
                    link: "/portal/staffperformance"
                },
                {
                    title: "Agents Commision List",
                    icon: "icon-park-solid:book",
                    link: "/portal/agentscommission"
                },
            ]
        },
        {
            sectionName: "SETUPS",
            routes: [
                {
                    title: 'Facility Setup',
                    icon: "mdi:gear",
                    link: "/portal/facility"
                },
                {
                    title: 'Package Setup',
                    icon: "mdi:gear",
                    link: "/portal/package"
                },
                {
                    title: 'Bank Setup',
                    icon: "mdi:gear",
                    link: "/portal/bank"
                },
                {
                    title: 'Call Comment Category',
                    icon: "mdi:gear",
                    link: "/portal/callcommentcategory"
                },
                {
                    title: 'Groups and Associations',
                    icon: "mdi:gear",
                    link: "/portal/groupsandassociations"
                },
            ]
        }

    ]
    ;