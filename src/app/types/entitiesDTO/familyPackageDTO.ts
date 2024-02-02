
export type PaymentMods = "Cash" | "Stading Order" | "CAGD" | "MOMO" | "Cheque"

export interface familyPackageDTO {
    id: number,
    familyId: number,
    discount: number,
    paymentMode: PaymentMods | string,
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