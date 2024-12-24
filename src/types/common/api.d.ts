interface ApiRes<T> {
    succeeded: boolean;
    errorMessage: string;
    data: T | null;
}

interface PaginatedData<T> {
    items: T[] | null;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

interface DeletePayload {
    ids: string[];
    applicationUserId: string | undefined;
}
