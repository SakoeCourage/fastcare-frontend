import { AgentDTO, corporateBeneficiaryDTO, CorporatePackageDTO, facilityDTO, packageDTO } from ".";

export interface corporateSubscriberDTO {
    id?: number;
    name: string;
    idType: string;
    idNumber: string;
    corporateMembershipID: string;
    address: string;
    contact: string;
    email: string
    principalPerson: string;
    principalPersonPhone: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    agent?: AgentDTO;
    corporatePackage?: CorporatePackageDTO;
    beneficiaries: corporateBeneficiaryDTO[];
}