export interface PremiumPaymentsListType {
    date: string;
    MID: string;
    amount: string;
    status: "Active" | "Inactive";
    type: "Individual" | "Group" | "Family"
    LPD: string,
    DSLP:string,
    amountDue: string,
    moMoNumber: string,
    subscriber: string,

}
