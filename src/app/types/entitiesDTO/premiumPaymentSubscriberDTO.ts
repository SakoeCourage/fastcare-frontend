import { PaymentMods } from "./familyPackageDTO"

export interface PremiumPaymentSubscriberDTO {
    id: number,
    name: string,
    subscriberId: number,
    subscriberType: string,
    membershipID: string,
    familyPackageId: number | null,
    corporatePackageId: number | null,
    individualPaymentId: number,
    familyPaymentId: number | null,
    corporatePaymentId: number | null,
    discount: number,
    paymentMode: PaymentMods,
    amountToDebit: number,
    originalAmount: number,
    frequency: string,
    momoNetwork: string,
    momoNumber: string,
    accountNumber: string,
    chequeNumber: string,
    CAGDStaffID: string,
    paymentReferenceCode: string,
    status: string,
    bank: string | null,
    narration?: string
}
