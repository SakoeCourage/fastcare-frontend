export interface familyPackageDTO {
    id: number,
    discount: number,
    paymentMode: "Cash" | "Stading Order" | "CAGD" | "MOMO" | "Cheque",
    amountToDebit: number,
    frequency: string,
    momoNetwork: string,
    momoNumber: string,
    createdBy: string,
    bank: number,
    accountNumber?: string,
    chequeNumber?: string,
    CAGDStaffID?: string,
    updateBy: string | null,
    createdAt: string | null,
    updatedAt: string | null
}