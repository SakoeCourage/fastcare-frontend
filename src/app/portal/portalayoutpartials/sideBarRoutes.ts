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
                            link: '/payments/viewpayments'
                        },
                        {
                            title: "Make Payment",
                            link: '/payments/makepayment'
                        },
                        {
                            title: "Payment Confirmation",
                            link: '/payments/paymentconfirmation'
                        },
                    ],
                },
                {
                    title: "Customer Care Center",
                    icon: "streamline:information-desk-customer-solid",
                    links: [
                        {
                            title: "Call Subscibers",
                            link: '/customercare/callsubscribers'
                        }
                    ]
                },
                {
                    title: "Auto-Debit OPS",
                    icon: "mdi:credit-card-check",
                    links: [
                        {
                            title: "Check Mandate Details",
                            link: '/autodebitoperation/checkmandate'
                        },
                        {
                            title: "Unmandated Subscribers",
                            link: '/autodebitoperation/unmandatedsubscribers'
                        }
                    ]
                },
                {
                    title: "Staff & User Onboarding",
                    icon: "ooui:user-group-rtl",
                    links: [
                        {
                            title: "Staff Onboarding",
                            link: '/staffsandusers/staffonboarding'
                        },
                        {
                            title: "User Onboarding",
                            link: '/staffsandusers/useronboarding'
                        },
                        {
                            title: "Reset Password",
                            link: '/staffsandusers/resetpassword'
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
                    link: "/individual-group-subscription"
                },
                {
                    title: "Family Subscriptions",
                    icon: "material-symbols:family-restroom",
                    links: [
                        {
                            title: 'Family Subscription',
                            link: '/familysubscriptions/familysubscription',
                        },
                        {
                            title: 'Family Plan Members',
                            link: '/familysubscriptions/familyplanmembers',
                        },
                        {
                            title: 'View Family Subs',
                            link: '/familysubscriptions/viewfamilysubscription',
                        },
                    ]
                },
                {
                    title: "Corporate Subscriptions",
                    icon: "ic:round-corporate-fare",
                    links: [
                        {
                            title: 'Corporate Subscription',
                            link: '/corporatesubscription/corporatesubscription',
                        },
                        {
                            title: 'Corporate Plan Members',
                            link: '/corporatesubscription/corporateplanmembers',
                        },
                        {
                            title: 'View Corporate Subs',
                            link: '/corporatesubscription/viewcorporatesubscription',
                        },
                    ]
                },
                {
                    title: "Data Migration",
                    icon: "ep:upload-filled",
                    links: [
                        {
                            title: 'Import Data',
                            link: '/datamigration/importdata',
                        },
                        {
                            title: 'Complete Migrate Subs',
                            link: '/datamigration/completemigratedsubs',
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
                    link: "/subscribers"
                },
                {
                    title: "Facility Performance",
                    icon: "icon-park-solid:book",
                    link: "/facilityperformance"
                },
                {
                    title: "Staff Collection Perf.",
                    icon: "icon-park-solid:book",
                    link: "/staffperformance"
                },
                {
                    title: "Agents Commision List",
                    icon: "icon-park-solid:book",
                    link: "/agentscommission"
                },
            ]
        },
        {
            sectionName: "SETUPS",
            routes: [
                {
                    title: 'Facility Setup',
                    icon: "mdi:gear",
                    link: "/facility"
                },
                {
                    title: 'Package Setup',
                    icon: "mdi:gear",
                    link: "/package"
                },
                {
                    title: 'Call Comment Category',
                    icon: "mdi:gear",
                    link: "/callcommentcategory"
                },
                {
                    title: 'Groups and Associations',
                    icon: "mdi:gear",
                    link: "/groupsandassociations"
                },
            ]
        }

    ]
    ;