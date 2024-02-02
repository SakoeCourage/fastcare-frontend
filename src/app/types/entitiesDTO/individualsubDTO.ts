import { groupDTO, facilityDTO, packageDTO } from ".";

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
    paymentMode: "MOMO" | "Cash" | "Cheque";
    frequency: "Daily" | "Weekly" | "Monthly";
    discount: number;
    momoNetwork: "MTN" | "VODAFONE" | "AIRTELTIGO";
    momoNumber: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    group?: groupDTO;
    package?: packageDTO;
    facility?: facilityDTO;
}
