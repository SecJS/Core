export interface PaginationContract {
  page: number
  offset: number
  skip: number
  limit: number
  total?: number
}
