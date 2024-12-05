export interface PaginatedInput {
    page: number,
    pageSize: number
}

export interface PaginatedResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}
