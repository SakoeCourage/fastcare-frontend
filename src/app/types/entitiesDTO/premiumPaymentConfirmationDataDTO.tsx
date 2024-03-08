import { bankDTO } from "./bankDTO"
import { PaymentMods } from "./familyPackageDTO"

export interface premiumPaymentConfirmationDataDTO {
    id: number,
    dateOfPayment: string,
    confirmed: boolean,
    confirmedBy: string | null,
    confirmedDate: string | null,
    paymentStatus: string,
    paymentMode: PaymentMods,
    amountWithOutDiscount: number,
    phoneNumber: string,
    amount: number,
    subscriberType: string,
    subscriberDbId: number,
    subscriberPaymentDbId: number,
    paymentReferenceCode: string,
    subscriberName: string,
    momTransactionId: string | null,
    debitOrderTransactionId: string | null,
    mandateId: string | null,
    createdBy: string | null,
    narration: string,
    chequeNumber: string | null,
    momoNumber: string,
    accountNumber: string | null,
    CAGDStaffID: string | null,
    momoNetwork: string | null,
    agentId: number,
    bank: null | bankDTO
}