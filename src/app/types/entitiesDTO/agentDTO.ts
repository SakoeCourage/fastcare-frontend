export interface AgentDTO {
    id: number;
    staffCode: string;
    title: string;
    firstName: string;
    lastName: string;
    otherNames: string;
    email: string;
    gender: 'Male' | 'Female';
    phoneNumber: string;
    nationality: string;
    position: string;
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    idType: string;
    idNumber: string;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
}
