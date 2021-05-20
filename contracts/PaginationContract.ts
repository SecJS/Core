export interface PaginationContract {
  page?: number
  limit?: number
  resourceUrl?: string
}

export interface PaginationMetaContract {
  itemCount: number
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
}

export interface PaginationLinksContract {
  first: string
  previous: string
  next: string
  last: string
}
