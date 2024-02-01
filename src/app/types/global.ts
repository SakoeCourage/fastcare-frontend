type IPaginatedData<T> = {
    data: T[],
    newPageInfo: {
        currentPage: string | null
        firstPageUrl: string | null
        lastPageUrl: string | null,
        nextPageUrl: string | null
        prevPageUrl: string | null
        total: number
    },
    pageInfo: {
        currentPage: string | null
        hasNextPage: boolean
        hasPreviousPage: boolean
        totalCount: number
        totalPages: number
    }
}

interface IFormWithDataProps<T> {
    formData?: T | null,
    onNewDataSucess: () => void,
    onCancel: () => void
}

type dbTimeStamp = {
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
}

type IActionResponseError = {
    error: string,
    message: string | string[],
    statusCode: number
}



