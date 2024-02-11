import { facilityDTO, packageDTO } from "."
export interface familyBeneficiaryDTO {
    id: number,
    name: string,
    dateOfBirth: string,
    contact: string,
    familyId: number,
    createdBy: string,
    updatedBy: string | null,
    package: packageDTO | number,
    facility: facilityDTO | number
}