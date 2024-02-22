export interface paymentDataDTO {
    id: number;
    dateOfPayment: string;
    confirmed: boolean;
    confirmedBy: string;
    confirmedDate: null | string;
    paymentStatus: string;
    paymentMode: string;
    amountWithOutDiscount: null | number;
    phoneNumber: null | string;
    amount: null | number;
    subscriberType: string;
    subscriberDbId: number;
    subscriberPaymentDbId: number;
    paymentReferenceCode: string;
    subscriberName: string;
    momTransactionId: null | string;
    debitOrderTransactionId: null | string;
    mandateId: null | string;
}
