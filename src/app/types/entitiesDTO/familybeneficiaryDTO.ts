import { facilityDTO, packageDTO } from "."
export interface familyBeneficiaryDTO {
    id: number,
    name: string,
    dateOfBirth: string,
    contact: string,
    familyId: string,
    createdBy: string,
    updatedBy: string | null,
    package: packageDTO,
    facility: facilityDTO
}