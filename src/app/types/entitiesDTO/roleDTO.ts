export interface roleDTO {
    name: string,
    permissions: string[],
    createdAt: string,
    updatedAt: string,
    createdBy: string | null,
    updatedBy: string | null
}