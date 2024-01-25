
export type permissions = "View_Dashboard" | "Manage_Users" | "View_Users" | "Manage_Staff" | "View_Staff" | "Manage_Subscriptions" | "View_Subscriptions" | "Manage_Payment" | "View_Payment" | "Manage_Debit_OPS" | "View_Debit_OPS" | "View_Reports" | "View_Settings" | "Manage_Settings" | "Manage_Call_Center"

export  interface roleDTO {
    id: number;
    name: string;
    permissions: Partial<permissions[]>;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
}
