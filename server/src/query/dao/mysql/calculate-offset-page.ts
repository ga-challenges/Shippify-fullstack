import { PaginatedInput } from '../../protocols/query-pagination';

export function calculateOffsetPage(input: PaginatedInput) {
    return (input.page - 1)* input.pageSize;
}
