import { bankDTO } from ".";

export interface CorporatePackageDTO {
    id: number;
    corporateId: number;
    discount: number;
    paymentMode: string;
    accountNumber: string;
    chequeNumber: string;
    CAGDStaffID: string;
    amountToDebit: number;
    bank: number | bankDTO,
    frequency: string;
    momoNetwork: string;
    momoNumber: string;
    createdBy: string;
    updateBy: string | null;
    createdAt: string;
    updatedAt: string;
}
