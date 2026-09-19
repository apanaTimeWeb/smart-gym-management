// RESPONSIBILITY: Type contract extracted from Pagination.tsx; no business behavior.


export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    // Optional detailed info props
    totalItems?: number;
    itemsPerPage?: number;
    // Optional color overrides (uses CSS vars by default)
    colors?: {
        text?: string;
        textActive?: string;
        bgActive?: string;
        border?: string;
        hoverBg?: string;
    };
}
