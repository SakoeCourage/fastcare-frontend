import { facilityDTO, packageDTO } from "."
export interface corporateBeneficiaryDTO {
    id: number,
    corporateId: number,
    name: string,
    dateOfBirth: string,
    contact: string,
    createdBy: string,
    updatedBy: string | null,
    package?: packageDTO | number,
    facility?: facilityDTO | number
}