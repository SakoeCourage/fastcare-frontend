

type IPaginatedData<T> = {
    current_page: number,
    last_page: number,
    data: T[],
    next_page_url: string | null,
    prev_page_url: string | null,
    per_page: number,
    total: number,
    last_page_url: string | null,
    first_page_url: string | null,
    path: string,
}
