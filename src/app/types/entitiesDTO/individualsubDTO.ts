import { groupDTO, facilityDTO, packageDTO } from ".";
import { PaymentMods } from ".";
export interface IndividualSubDTO {
    id?: number;
    idType: string;
    passportPicture: Blob | File |string;
    idNumber: string;
    membershipID: string;
    firstName: string;
    otherNames: string;
    lastName: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    occupation: string;
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    address: string;
    gpsAddress: string;
    phoneOne: string;
    phoneTwo?: string;
    emergencyPerson: string;
    emergencyPersonPhone: string;
    hasNHIS: boolean;
    NHISNumber: string;
    momoNetwork: "MTN" | "VODAFONE" ;
    momoNumber: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    discount: number,
    paymentMode: PaymentMods | string,
    amountToDebit: number,
    frequency: string,
    bank: number,
    accountNumber?: string,
    chequeNumber?: string,
    CAGDStaffID?: string,
    group?: groupDTO;
    package?: packageDTO;
    facility?: facilityDTO;
}
