import { AgentDTO } from ".";
import { familyBeneficiaryDTO } from "./familybeneficiaryDTO";
import { familyPackageDTO } from "./familyPackageDTO";

export interface familySubsciberDTO {
    id: number;
    name: string;
    familyMembershipID: string;
    address: string;
    contact: string;
    email: string;
    principalPerson: string;
    principalPersonPhone: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string | null;
    agent: AgentDTO
    familyPackage?: familyPackageDTO;
    beneficiaries?: familyBeneficiaryDTO[];
}
