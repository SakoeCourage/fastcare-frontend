import { facilityDTO, roleDTO, staffDTO } from ".";

export interface userDTO {
    id: number;
    username: string;
    passwordResetRequired: boolean;
    staffDbId: number,
    email: string,
    roleId: number,
    active: boolean,
    role?: roleDTO,
    staff?: staffDTO,
    facilityId: number,
    facility?: facilityDTO
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

